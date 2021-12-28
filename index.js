import express from "express";
import mongoose from "mongoose";
import twitterRoutes from "./routes/twitter.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use("/twitter", twitterRoutes);

const port = 5001;

app.listen(port, () => console.log(`Server running on port: ${port}`));
