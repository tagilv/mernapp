import express from "express";
const router = express.Router();

router.get("/all", showAllComments);

export default router;
