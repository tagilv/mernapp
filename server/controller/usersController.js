import { v2 as cloudinary } from "cloudinary";
import userModel from "../model/usersModel.js";
import encryptPassword from "../utils/encryptPassword.js";
import issueToken from "../utils/jwt.js";
import isPasswordCorrect from "../utils/verifyPassword.js";

import { check, body, validationResult } from "express-validator";

const signUp = async (req, res) => {
  const { email, password, userName } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  try {
    const existingUser = await userModel.findOne({
      email: email,
    });
    if (existingUser) {
      res.status(300).json({
        message: "email already in use",
      });
    } else {
      const hashedPassword = await encryptPassword(password);
      const newUser = new userModel({
        email: email,
        password: hashedPassword,
        userName: userName,
        avatarPicture: req.body.avatarPicture
          ? req.body.avatarPicture
          : "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
      });

      try {
        const savedUser = await newUser.save();
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
    res.status(500).json({ message: "Something went wrong during signup" });
  }
};

const logIn = async (req, res) => {
  // Password below is the password the user put in
  const { email, password } = req.body;

  try {
    // Password below is of the existing (registered) user
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      res.status(401).json({ message: "login not successful" });
    } else {
      // Since isPassordCorrect is an async adding await
      const verified = await isPasswordCorrect(password, existingUser.password);

      if (!verified) {
        res.status(401).json({ message: "login not successful" });
      }
      // Instead of putting an else in another if putting if, for readbility
      if (verified) {
        // Password matches so generate the token and store it in a variable
        const token = issueToken(existingUser._id, existingUser.email);
        //Send back user info to use in auth context
        res.status(200).json({
          message: "login successfull",
          user: {
            userName: existingUser.userName,
            id: existingUser.id,
            email: existingUser.email,
            avatarPicture: existingUser.avatarPicture,
          },
          token,
        });
      }
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ Message: "Something went wrong" });
  }
};

const imageUpload = async (req, res) => {
  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "ryggskolan-images",
    });

    res.status(200).json({
      msg: "image uploaded successfully",
      image: uploadResult.secure_url,
    });
  } catch (error) {
    res.status(500).json({ message: "Image upload went wrong" });
    console.log("error uploading image", error);
  }
};

// Alternative
// const imageUpload = async (req, res) => {
//   try {
//     const uploadResult = await cloudinary.uploader.upload(req.file.path, {
//       // Folder in cloudiary where the image will be stored
//       folder: "ryggskolan-images",
//     });
//     console.log("uploadResult>>", uploadResult);

//     try {
//       // const { avatarPicture } = req.body;
//       const { userName, email } = req.user;
//       const existingUser = await userModel.findOneAndUpdate(
//         // "First" email is the field in db(its key), the "second" email from the req.user
//         { email: email },
//         {
//           // "first" field (avatarPicture) is that needs to be updated, second is by what
//           avatarPicture: uploadResult,
//           // Now in front end, upload the picture to cloudinary, which will return a url, put that url in the body of the new request. Finally, make a new request with that token to update the profile route.
//         },
//         { new: true }
//       );
//       res.status(200).json({
//         // Use existingUser to send back the newest version
//         userName: existingUser.userName,
//         email: existingUser.email,
//         avatarPicture: existingUser.avatarPicture,
//       });
//       //update user here to insert picture
//     } catch (error) {
//       console.log("Error updating image");
//     }
//     // res.status(200).json({
//     //   msg: "image uploaded successfully",
//     //   image: uploadResult.secure_url,
//     // });
//   } catch (error) {
//     res.status(500).json({ message: "Image upload went wrong" });
//     console.log("error uploading image", error);
//   }
// };

const getProfile = async (req, res) => {
  const { userName, email, avatarPicture } = req.user;
  console.log("req.user", req.user);
  // Remove user: req.user and replace by below
  res.status(200).json({
    userName: userName,
    email: email,
    avatarPicture: avatarPicture,
  });
};

const updateProfile = async (req, res) => {
  // req.user from backend, req.body from front end
  const { avatarPicture, newEmail } = req.body;
  const { userName, email } = req.user;
  try {
    const existingUser = await userModel.findOneAndUpdate(
      // Email is the field in db(its key), email from req.user
      { email: email },
      {
        avatarPicture: avatarPicture,
      },
      { new: true }
    );
    res.status(200).json({
      // ExistingUser to send back
      userName: existingUser.userName,
      email: existingUser.email,
      avatarPicture: existingUser.avatarPicture,
    });
  } catch (error) {
    console.log("error updating user", error);
  }
};

export { imageUpload, signUp, logIn, getProfile, updateProfile };
