import express from "express";
import {
  createComment,
  deleteComment,
  editComment,
} from "../controller/commentsController.js";
const router = express.Router();
import jwtAuth from "../middlewares/jwtAuth.js";

// router.get("/all", showAllComments);

router.post("/create", jwtAuth, createComment);

router.delete("/delete", jwtAuth, deleteComment);

router.put("/edit", jwtAuth, editComment);

export default router;
