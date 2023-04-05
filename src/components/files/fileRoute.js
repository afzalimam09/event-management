import { Router } from "express";
import { handleFilesUpload } from "./fileController.js";
import multer from "multer";

// Configure Multer middleware for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = Router();

router.post("/", upload.single("file"), handleFilesUpload);

export default router;
