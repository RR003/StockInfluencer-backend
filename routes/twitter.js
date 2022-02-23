import express from "express";
import {
  getTweets,
  getUsername,
  getPopularTweets,
} from "../controllers/stock.js";

import {
  getInfo,
  getHistoricalData,
  get24HourChange,
} from "../controllers/data.js";
import {
  getTempHistoricalData,
  getChartData,
  getChartDataCrypto,
  getMasterInfo,
} from "../controllers/polygon.js";

const router = express.Router();

// look into twitter v2
router.get("/tweetLookup/:stock", getTweets);
router.get("/userLookup/:username", getUsername);
router.get("/stockLookup/:stock", getInfo);
router.get("/chartdata/:stock", getChartData);
router.get("/chartdatacrypto/:stock", getChartDataCrypto);
router.get("/24hrchange/:stock/:date", get24HourChange);
router.get("/tempchange/:stock/:date", getTempHistoricalData);
router.get("/getPopularTweets/:query/:count", getPopularTweets);
router.get("/masterlistcrypto/:stockName", getMasterInfo);

export default router;
