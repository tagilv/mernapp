import { v2 as cloudinary } from "cloudinary";
import userModel from "../model/usersModel.js";
import encryptPassword from "../utils/encryptPassword.js";
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

export { imageUpload, signUp };
