import express from "express";
import {
  createComment,
  deleteComment,
} from "../controller/commentsController.js";
const router = express.Router();
import jwtAuth from "../middlewares/jwtAuth.js";

// router.get("/all", showAllComments);

router.post("/create", jwtAuth, createComment);

router.delete("/delete", jwtAuth, deleteComment);

export default router;
