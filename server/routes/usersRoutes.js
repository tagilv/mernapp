import express from "express";
import { imageUpload } from "../controller/usersController.js";
import upload from "../middlewares/multer.js";
const router = express.Router();

// users/upload here below
// If upload.single("image") is succesfull the thrid fucntion/callback will run
router.post("/uploadimage", upload.single("image"), imageUpload);

export default router;
