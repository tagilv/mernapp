// import express from "express";
// import { check, validationResult } from "express-validator";
// const router = express.Router();

// const signupValidation = (req, res, next) => {
//   check("email").isEmail().withMessage("must be a valid email");
//   check("password")
//     .isLength({ min: 4 })
//     .withMessage("password must be 4 chars long");
//   try {
//     validationResult(req).throw();
//     next();
//   } catch (err) {
//     res.status(400).json({ errors: err.mapped() });
//   }
// };

// export default signupValidation;

// import express from "express";
// import { check, validationResult } from "express-validator";
// const router = express.Router();

// const signupValidation = (req, res, next) => {
//   check("email").isEmail().withMessage("must be a valid email");
//   check("password")
//     .isLength({ min: 4 })
//     .withMessage("password must be 4 chars long");
//   try {
//     validationResult(req).throw();
//     next();
//   } catch (err) {
//     res.status(400).json({ errors: err.mapped() });
//   }
// };

// export default signupValidation;

// const { check, validationResult } = require("express-validator");

// exports.register = (req, res, next) => {
//   check("email").isEmail().withMessage("must be a valid email");
//   check("password").isLength({ min: 4 }).withMessage("passwd 4 chars long!");
//   try {
//     validationResult(req).throw();
//     next();
//   } catch (err) {
//     res.status(422).json({ errors: err.mapped() });

// };

// export default signupValidation;

// const { body, validationResult, check } = require("express-validator");

// const isEmailAndPasswordAndUsernameValid = (email, password, userName) => {
//   check(username).notEmpty()
// };

// export default isEmailAndPasswordAndUsernameValid;

// import validator from "express-validator";

// const express = require("express");
// // same as import express from express

// const app = express();
// // still

// const isEmailAndPasswordAndUsernameValid = (email, password, userName) => {
//   if (!email || !password || !userName) {
//     throw Error("All fileds must be filled");
//   }
//   if (!validator.isEmail(email)) {
//     throw Error("Email is not valid");
//   }
//   if (!validator.isStrongPassword(password)) {
//     throw Error("Password not strong enough");
//   } else return true;
// };
