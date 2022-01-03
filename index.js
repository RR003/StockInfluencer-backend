import express from "express";
import mongoose from "mongoose";
import twitterRoutes from "./routes/twitter.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use("/twitter", twitterRoutes);
dotenv.config();

const result = dotenv.config();

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port: ${port}`));
