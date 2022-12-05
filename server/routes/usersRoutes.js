import express from "express";
import { imageUpload, logIn, signUp } from "../controller/usersController.js";
import upload from "../middlewares/multer.js";

import { check, body, validationResult } from "express-validator";

const router = express.Router();

// users/upload here below
// If upload.single("image") is succesfull the thrid fucntion/callback will run
router.post("/uploadimage", upload.single("image"), imageUpload);

router.post(
  "/signup",
  body("email").isEmail().withMessage("must be a valid email"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("must be at least 6 characters long"),
  signUp
);

router.post("/login", logIn);

export default router;

// router.post(
//   "/signup",
//   body("email").isEmail(),
//   body("password").isLength({ min: 5 }),
//   signUp
// );
