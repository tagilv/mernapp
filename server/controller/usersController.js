import { v2 as cloudinary } from "cloudinary";
import userModel from "../model/usersModel.js";
import encryptPassword from "../utils/encryptPassword.js";
import isPasswordCorrect from "../utils/verifyPassword.js";
// import isEmailAndPasswordAndUsernameValid from "../utils/validation.js";

const signUp = async (req, res) => {
  console.log("req.body>>", req.body);
  const { email, password, userName } = req.body;

  // If if stament is true then call isEmailAndPasswordAndUsernameValid
  // Send email, password, username as paramters
  // if (isEmailAndPasswordAndUsernameValid(email, password, userName)) {
  try {
    const existingUser = await userModel.findOne({
      // email = request.body.email (destructed)
      email: email,
    });
    if (existingUser) {
      console.log("existingUser>>", existingUser);
      res.status(300).json({
        message: "email already in use",
      });
    } else {
      // hwne we reac here we know we do not have a user with this email. So we will hash the password entered.
      const hashedPassword = await encryptPassword(password);
      console.log("hashedPassword>>", hashedPassword);

      // Te new user is going to be a new userModel (object)
      const newUser = new userModel({
        email: email,
        password: hashedPassword,
        userName: userName,
        avatarPicture: req.body.avatarPicture
          ? req.body.avatarPicture
          : "https://pixabay.com/vectors/blank-profile-picture-mystery-man-973460/",
      });

      try {
        const savedUser = await newUser.save();
        console.log("savedUser>>", savedUser);
        res.status(201).json({
          message: "user registered sucessfully",
          user: savedUser,
        });
      } catch (error) {
        console.log("reg error>>", error);
        res.status(500).json({
          message: "user registration failed",
          error: error.message,
        });
      }
    }
  } catch (error) {
    console.log("signup error>>", error);
    res.status(500).json({ message: "Something went wring during singup" });
  }
  // }
};

const imageUpload = async (req, res) => {
  console.log("req.file", req.file);

  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "ryggskolan-images",
    });
    console.log("uploadResult>>", uploadResult);
    res.status(200).json({
      msg: "image uploaded successfully",
      image: uploadResult.secure_url,
    });
  } catch (error) {
    res.status(500).json({ message: "Image upload went wrong" });
    console.log("error uploading image", error);
  }
};

const logIn = async (req, res) => {
  // destrcuture of req.body.email
  // password below is the password the user put in
  const { email, password } = req.body;

  try {
    // password below is of the existing (registered) user
    const existingUser = await userModel.findOne({ email: email });
    console.log("existingUser", existingUser);
    if (!existingUser) {
      res.status(401).json({ message: "User with this email does not exist" });
    } else {
      // Since isPassordCorrect is an asynchronous function, need to add await
      const verified = await isPasswordCorrect(password, existingUser.password);
      console.log("verified", verified);

      if (!verified) {
        res.status(401).json({ message: "Password incorrect" });
      }
      // Instead of putting an else in another if put if and expalain, for readbility
      if (verified) {
        console.log("verified", verified);
      }
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ Message: "Something went wrong" });
  }
};

export { imageUpload, signUp, logIn };
