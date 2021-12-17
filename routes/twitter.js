import express from "express";
import { getTweets } from "../controllers/stock.js";

const router = express.Router();

router.get("/:stock", getTweets);

export default router;
