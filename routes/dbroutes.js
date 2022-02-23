import express from "express";
import { createTweet } from "../controllers/tweet.js";

const router = express.Router();

router.post("/creatingTweet", createTweet);
export default router;
