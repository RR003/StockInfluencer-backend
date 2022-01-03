import finnhub from "finnhub";
import dotenv from "dotenv";

dotenv.config();

const api_key = finnhub.ApiClient.instance.authentications["api_key"];
api_key.apiKey = process.env.FINNHUB_API_KEY;
const finnhubClient = new finnhub.DefaultApi();

export const getInfo = async (req, res) => {
  let currentDate = new Date();
  let pastDate = new Date();
  pastDate.setMonth(currentDate.getMonth() - 3);

  console.log(currentDate);
  console.log(pastDate);
  const { stock } = req.params;
  finnhubClient.stockCandles(
    stock,
    "D",
    Math.floor(pastDate.getTime() / 1000),
    Math.floor(currentDate.getTime() / 1000),
    function (error, data, response) {
      res.status(200).json(data);
    }
  );
};

export const getHistoricalData = async (req, res) => {
  let currentDate = new Date();
  let pastDate = new Date();
  pastDate.setMonth(currentDate.getMonth() - 3);

  console.log(currentDate);
  console.log(pastDate);
  let { stock } = req.params;
  stock = stock.toUpperCase();
  console.log(stock);
  finnhubClient.stockCandles(
    stock,
    "D",
    Math.floor(pastDate.getTime() / 1000),
    Math.floor(currentDate.getTime() / 1000),
    function (error, data, response) {
      res.status(200).json(data);
    }
  );
};

export const get24HourChange = async (req, res) => {
  let { stock } = req.params;
  stock = stock.toUpperCase();
  let { date } = req.params;
  console.log(date);
  stock = stock.toUpperCase();
  finnhubClient.stockCandles(
    stock,
    "D",
    date,
    date,
    function (error, data, response) {
      res.status(200).json(data);
    }
  );
};
