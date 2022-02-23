import express from "express";
import mongoose from "mongoose";
import twitterRoutes from "./routes/twitter.js";
import dbroutes from "./routes/dbroutes.js";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use("/twitter", twitterRoutes);
app.use("/db", dbroutes);
dotenv.config();

const Connection_url = `mongodb+srv://stockfluence:${process.env.DB_PASSWORD}@cluster0.kmijl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const port = process.env.PORT;

mongoose
  .connect(Connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => console.log(`Server running on port: ${port}`))
  )
  .catch((error) => console.log(error));
