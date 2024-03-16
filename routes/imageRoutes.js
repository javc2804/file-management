import express from "express";
import { search, upload } from "../controllers/imageController.js";

const router = express.Router();

router.get("/search", search);
router.post("/upload/:id", upload);

export default router;
