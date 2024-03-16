import express from "express";
import { search, upload } from "../controllers/imageController.js";
import checkAuth from "../middleware/checkAuth.js";

const router = express.Router();

router.get("/search", checkAuth, search);
router.post("/upload/:id", checkAuth, upload);

export default router;
