import express from "express";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

import {
  uploadFile,
  getFiles,
  downloadFile,
  getFileURL,
  reNameFile,
} from "../services/s3.js";

router.get("/", checkAuth, async (req, res) => {
  const result = await getFiles();
  res.json(result.Contents);
});

router.get("/:fileName", checkAuth, async (req, res) => {
  const result = await getFileURL(req.params.fileName);
  res.json({
    url: result,
  });
});

router.get("/downloadfile/:fileName", checkAuth, async (req, res) => {
  const result = await downloadFile(req.params.fileName);
  if (result.success) {
    res.json({ msg: "archivo descargado" });
  } else {
    res.status(404).json({ error: result.error });
  }
});

router.post("/", checkAuth, async (req, res) => {
  const result = await uploadFile(req.files.file);
  res.json({ result });
});

router.put("/:oldName/:newName", checkAuth, async (req, res) => {
  const { oldName, newName } = req.params;
  await reNameFile(oldName, newName);
  res.json({ msg: `Archivo renombrado de ${oldName} a ${newName}` });
});

export default router;
