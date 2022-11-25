// This is where all the endpoints for the weeks collection will be gathered. Find all weeks etc
import express from "express";
import { getAllWeeks, getWeeksByWeek } from "../controller/weeksController.js";
const router = express.Router();

router.get("/all", getAllWeeks);
router.get("/all/:week", getWeeksByWeek);

export default router;
