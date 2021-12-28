import express from "express";
import { getTweets, getUsername } from "../controllers/stock.js";
import {
  getInfo,
  getHistoricalData,
  get24HourChange,
} from "../controllers/data.js";

const router = express.Router();

// look into twitter v2
router.get("/tweetLookup/:stock", getTweets);
router.get("/userLookup/:username", getUsername);
router.get("/stockLookup/:stock", getInfo);
router.get("/historicaldata/:stock", getHistoricalData);
router.get("/24hrchange/:stock/:date", get24HourChange);

export default router;
