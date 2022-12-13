import express from "express";
import { createComment } from "../controller/commentsController.js";
const router = express.Router();
import jwtAuth from "../middlewares/jwtAuth.js";

// router.get("/all", showAllComments);

router.post("/create", jwtAuth, createComment);

export default router;
