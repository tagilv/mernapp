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
      console.log("existingUser>>", existingUser);
      res.status(300).json({
        message: "email already in use",
      });
    } else {
      const hashedPassword = await encryptPassword(password);
      console.log("hashedPassword>>", hashedPassword);
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
    res.status(500).json({ message: "Something went wrong during signup" });
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
      res.status(401).json({ message: "login not successful" });
    } else {
      // Since isPassordCorrect is an asynchronous function, need to add await
      const verified = await isPasswordCorrect(password, existingUser.password);
      console.log("verified", verified);

      if (!verified) {
        res.status(401).json({ message: "login not successful" });
      }
      // Instead of putting an else in another if put if and expalain, for readbility
      if (verified) {
        console.log("verified", verified);
        // Password matches so generate the token and store it in a variable
        const token = issueToken(existingUser._id, existingUser.email);
        console.log("token", token);
        //Send back user info so we can use it in the auth context
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
  console.log("req.file", req.file);

  try {
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      // Folder in cloudiary where the image will be stored
      folder: "ryggskolan-images",
    });
    console.log("uploadResult>>", uploadResult);

    // setUser
    // update user
    // (send back full user)

    res.status(200).json({
      msg: "image uploaded successfully",
      image: uploadResult.secure_url,
    });
  } catch (error) {
    res.status(500).json({ message: "Image upload went wrong" });
    console.log("error uploading image", error);
  }
};

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
  // console.log("get profile req object", req);
  const { userName, email, avatarPicture } = req.user;
  console.log("req.user", req.user);
  // Then we can remove user: req.user and replace by the below
  res.status(200).json({
    userName: userName,
    email: email,
    avatarPicture: avatarPicture,
  });
};

const updateProfile = async (req, res) => {
  // req.user comes from backend, req.body would come from the front end
  const { avatarPicture, newEmail } = req.body;
  const { userName, email } = req.user;
  console.log(req.body);
  console.log(req.user);
  try {
    const existingUser = await userModel.findOneAndUpdate(
      // "First" email is the field in db(its key), the "second" email from the req.user
      { email: email },
      {
        // "first" field (avatarPicture) is that needs to be updated, second is by what
        avatarPicture: avatarPicture,
        // email: newEmail
        // Now in front end, upload the picture to cloudinary, which will return a url, put that url in the body of the new request. Finally, make a new request with that token to update the profile route.
      },
      { new: true }
    );
    console.log("new existingUser", existingUser);
    res.status(200).json({
      // Use existingUser to send back the newest version
      userName: existingUser.userName,
      email: existingUser.email,
      avatarPicture: existingUser.avatarPicture,
    });
  } catch (error) {
    console.log("error updating user", error);
  }
};

export { imageUpload, signUp, logIn, getProfile, updateProfile };
