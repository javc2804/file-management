import {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  GetObjectCommand,
  CopyObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import {
  AWS_BUCKET_REGION,
  AWS_PUBLIC_KEY,
  AWS_SECRET_KEY,
  AWS_BUCKET_NAME,
} from "../config/s3.js";
import fs from "fs";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import path from "path";

const client = new S3Client({
  region: AWS_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_PUBLIC_KEY,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

export async function uploadFile(file) {
  const stream = fs.createReadStream(file.tempFilePath);
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: file.name,
    Body: stream,
  };
  const command = new PutObjectCommand(uploadParams);
  return await client.send(command);
}

export async function getFiles() {
  const command = new ListObjectsCommand({
    Bucket: AWS_BUCKET_NAME,
  });
  return await client.send(command);
}

export async function getFile(filename) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
  });
  return await client.send(command);
}

export async function downloadFile(filename) {
  try {
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: filename,
    });
    const result = await client.send(command);

    // Crear el directorio si no existe
    const dir = "./images";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const filePath = path.join(dir, filename);
    const writeStream = fs.createWriteStream(filePath);

    // Manejar el error del writeStream
    writeStream.on("error", (err) => {
      throw new Error(`Error al escribir el archivo: ${err}`);
    });

    // Pipe the data as binary
    result.Body.pipe(writeStream);

    return { success: true };
  } catch (error) {
    if (error.name === "NoSuchKey") {
      return {
        success: false,
        error: `El archivo ${filename} no existe en el bucket de S3.`,
      };
    } else {
      return {
        success: false,
        error: `Error al descargar el archivo: ${error}`,
      };
    }
  }
}

export async function getFileURL(filename) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
  });
  return await getSignedUrl(client, command, { expiresIn: 3600 });
}

export async function reNameFile(oldName, newName) {
  try {
    const copyParams = {
      Bucket: AWS_BUCKET_NAME,
      CopySource: `${AWS_BUCKET_NAME}/${oldName}`,
      Key: newName,
    };
    const copyCommand = new CopyObjectCommand(copyParams);
    await client.send(copyCommand);

    const overwriteParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: oldName,
      Body: "",
    };
    const overwriteCommand = new PutObjectCommand(overwriteParams);
    await client.send(overwriteCommand);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}

export async function uploadToS3(buffer, filename, contentType) {
  const uploadParams = {
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
    Body: buffer,
    ContentType: contentType,
    ACL: "public-read",
  };
  const command = new PutObjectCommand(uploadParams);
  return await client.send(command);
}
