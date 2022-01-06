import https from "https";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const month_map = {
  0: "01",
  1: "02",
  2: "03",
  3: "04",
  4: "05",
  5: "06",
  6: "07",
  7: "08",
  8: "09",
  9: "10",
  10: "11",
  11: "12",
};

const api_key = process.env.POLYGON_API_KEY;

export const getTempHistoricalData = async (req, res) => {
  // date must be in 2021-07-16 => example
  let { stock } = req.params;
  stock = stock.toUpperCase();
  let { date } = req.params;
  console.log(date);
  stock = stock.toUpperCase();
  let { data } = await axios.get(
    `https://api.polygon.io/v2/aggs/ticker/${stock}/range/1/hour/${date}/${date}?adjusted=true&sort=asc&limit=50000&apiKey=${api_key}`
  );
  res.status(200).json(data);
};

export const getChartData = async (req, res) => {
  let { stock } = req.params;
  stock = stock.toUpperCase();
  let currentDate = new Date();
  let pastDate = new Date();
  pastDate.setMonth(currentDate.getMonth() - 2);

  let stringDate1 =
    "" +
    currentDate.getFullYear() +
    "-" +
    month_map[currentDate.getMonth()] +
    "-" +
    correct_date(currentDate.getDate());

  let stringDate2 =
    "" +
    pastDate.getFullYear() +
    "-" +
    month_map[pastDate.getMonth()] +
    "-" +
    correct_date(pastDate.getDate());

  try {
    let { data } = await axios.get(
      `https://api.polygon.io/v2/aggs/ticker/${stock}/range/1/hour/${stringDate2}/${stringDate1}?adjusted=true&sort=asc&limit=50000&apiKey=${api_key}`
    );
    res.status(200).json(data);
  } catch (e) {
    console.log("max requests!!!!");
    const data = {
      results: "max requests",
    };
    res.status(200).json(data);
  }
};

const correct_date = (date) => {
  if (date.toString().length == 2) return date;
  else return "0" + date;
};

export const getChartDataCrypto = async (req, res) => {
  let { stock } = req.params;
  stock = stock.toUpperCase();
  let currentDate = new Date();
  let pastDate = new Date();
  pastDate.setMonth(currentDate.getMonth() - 1);

  let stringDate1 =
    "" +
    currentDate.getFullYear() +
    "-" +
    month_map[currentDate.getMonth()] +
    "-" +
    correct_date(currentDate.getDate());

  let stringDate2 =
    "" +
    pastDate.getFullYear() +
    "-" +
    month_map[pastDate.getMonth()] +
    "-" +
    correct_date(pastDate.getDate());

  try {
    let { data } = await axios.get(
      `https://api.polygon.io/v2/aggs/ticker/${stock}/range/15/minute/${stringDate2}/${stringDate1}?adjusted=true&sort=asc&limit=50000&apiKey=${api_key}`
    );
    res.status(200).json(data);
  } catch (e) {
    console.log("max requests!!!!");
    const data = {
      results: "max requests",
    };
    res.status(200).json(data);
  }
};
