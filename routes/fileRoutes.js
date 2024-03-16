import express from "express";

const router = express.Router();

import {
  uploadFile,
  getFiles,
  getFile,
  downloadFile,
  getFileURL,
  putNameFile,
} from "../services/s3.js";

router.get("/", async (req, res) => {
  const result = await getFiles();
  res.json(result.Contents);
});

router.get("/:fileName", async (req, res) => {
  const result = await getFileURL(req.params.fileName);
  res.json({
    url: result,
  });
});

router.get("/downloadfile/:fileName", async (req, res) => {
  await downloadFile(req.params.fileName);
  res.json({ message: "archivo descargado" });
});

router.post("/", async (req, res) => {
  const result = await uploadFile(req.files.file);
  res.json({ result });
});

router.put("/:id", async (req, res) => {
  const result = await putNameFile(req.params.id);
  res.json({
    url: result,
  });
});

export default router;
