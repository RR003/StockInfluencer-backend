import express from "express";
import {
  createTweet,
  allTimeChange,
  allWeekChange,
} from "../controllers/tweet.js";

const router = express.Router();

router.post("/creatingTweet", createTweet);

router.get("/getAllTimeChange", allTimeChange);
router.get("/getWeekChange", allWeekChange);
export default router;
