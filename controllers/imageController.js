import { searchImages } from "../services/unsplash.js";

export async function search(req, res) {
  const { query } = req.query;

  try {
    const images = await searchImages(query);
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al buscar imágenes" });
  }
}
