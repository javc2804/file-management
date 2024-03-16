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
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
  });
  const result = await client.send(command);
  console.log(result);
  result.Body.pipe(fs.createWriteStream(`./images/${filename}`));
}

export async function getFileURL(filename) {
  const command = new GetObjectCommand({
    Bucket: AWS_BUCKET_NAME,
    Key: filename,
  });
  return await getSignedUrl(client, command, { expiresIn: 3600 });
}
export async function putNameFile(id) {
  try {
    // Obtén el nombre del archivo utilizando el ID
    const fileName = await getFileNameFromID(id);

    // Comprueba si el objeto existe
    const command = new GetObjectCommand({
      Bucket: AWS_BUCKET_NAME,
      Key: fileName,
    });

    await client.send(command);

    // Si el objeto existe, cópialo a un nuevo nombre
    const newName = "cambiado";

    const copyParams = {
      Bucket: AWS_BUCKET_NAME,
      CopySource: `${AWS_BUCKET_NAME}/${fileName}`,
      Key: newName,
    };
    const copyCommand = new CopyObjectCommand(copyParams);
    await client.send(copyCommand);
    console.log(`File copied to ${newName}`);

    // Si no necesitas el archivo original, puedes eliminarlo
    const deleteParams = {
      Bucket: AWS_BUCKET_NAME,
      Key: fileName,
    };
    const deleteCommand = new DeleteObjectCommand(deleteParams);
    await client.send(deleteCommand);
    console.log(`Original file ${fileName} deleted`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
}
