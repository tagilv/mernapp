import express from "express";
import { getAllExercises } from "../controller/exercisesController.js";
const router = express.Router();

router.get("/all", getAllExercises);

export default router;
