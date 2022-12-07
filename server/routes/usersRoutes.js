import express from "express";
import {
  getProfile,
  imageUpload,
  logIn,
  signUp,
  updateProfile,
} from "../controller/usersController.js";
import upload from "../middlewares/multer.js";
import { check, body, validationResult } from "express-validator";
import jwtAuth from "../middlewares/jwtAuth.js";
const router = express.Router();

// If upload.single("image") is succesfull the thrird fucntion/callback (the imageUpload in the controller runs)

// UPLOAD IMAGE
router.post("/uploadimage", upload.single("image"), imageUpload);

// SINGUP USER
router.post(
  "/signup",
  body("email").isEmail().withMessage("must be a valid email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("must be at least 6 characters long"),
  signUp
);

// LOGIN EXISTING USER
router.post("/login", logIn);

// ACCESS EXISTING USERS PROFILE

router.get("/profile", jwtAuth, getProfile);

// EDIT EXISTING USER

// Need to put jwtAuth middlewear to get information about the user
router.post("/update", jwtAuth, updateProfile);

export default router;
