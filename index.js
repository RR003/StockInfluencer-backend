import express from "express";
import mongoose from "mongoose";
import twitterRoutes from "./routes/twitter.js";

const app = express();
app.use("/twitter", twitterRoutes);

const hostname = "127.0.0.1";
const port = 5001;

app.listen(port, () => console.log(`Server running on port: ${port}`));
