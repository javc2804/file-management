import { searchImages } from "../services/unsplash.js";
import { getImageById } from "../services/unsplash.js";
import { uploadToS3 } from "../services/s3.js";
import axios from "axios";

export async function search(req, res) {
  const { query } = req.query;

  try {
    const images = await searchImages(query);
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar imágenes" });
  }
}

export async function upload(req, res) {
  const { id } = req.params;

  try {
    const image = await getImageById(id);
    const response = await axios.get(image.urls.raw, {
      responseType: "arraybuffer",
    });
    const filename = image.slug ? `${image.slug}.jpg` : `${id}.jpg`;

    await uploadToS3(
      response.data,
      filename,
      `${id}.jpg`,
      response.headers["content-type"]
    );

    res.json({ msg: "Imagen subida exitosamente" });
  } catch (error) {
    res.status(500).json({ error: `Error al subir la imagen: ${error.msg}` });
  }
}
