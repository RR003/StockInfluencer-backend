import https from "https";
import axios from "axios";
import dotenv from "dotenv";
import moment from "moment";

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

const api_name = {
  Bitcoin: "X:BTCUSD",
  Dogecoin: "X:DOGEUSD",
  Ethereum: "X:ETHUSD",
  Chainlink: "X:LINKUSD",
  Solana: "X:SOLUSD",
  Shibainu: "X:SHIBUSD",
  Cardano: "X:ADAUSD",
  Tezos: "X:XTZUSD",
  Polkadot: "X:DOTUSD",
  AxieInfinity: "X:AXSUSD",
  BinanceCoin: "X:BNBUSD",
  Terra: "X:LUNAUSD",
};

const api_key = process.env.POLYGON_API_KEY;

const API = axios.create({
  baseURL: "https://stockinfluencer-backend.herokuapp.com/",
});

export const getMasterInfo = async (req, res) => {
  let { stockName } = req.params;
  let stockValue = api_name[stockName];
  let { data } = await API.get(`twitter/chartdatacrypto/${stockValue}`);

  // getting crypto chart_data
  let chart_data = [];
  if (data.results !== "max results") {
    if (data.resultsCount !== 0) {
      for (let j = 0; j < data.results.length; j++) {
        let subArray = [];
        subArray.push(data.results[j].t);
        subArray.push(data.results[j].c);
        chart_data.push(subArray);
      }
    }
  }

  let unixTimeL = chart_data[chart_data.length - 1][0];
  let latestDate = new Date(unixTimeL);

  // getting popular tweets
  let popular_tweets = [];
  let populat_tweets_refined = await API.get(
    `twitter/getPopularTweets/${stockName}/20`
  );
  populat_tweets_refined = populat_tweets_refined.data;
  for (let j = 0; j < populat_tweets_refined.statuses.length; j++) {
    let temp = [];
    temp.push(populat_tweets_refined.statuses[j].text);
    let created_at = populat_tweets_refined.statuses[j].created_at;
    // console.log(created_at);
    let date = moment(created_at, "dd MMM DD HH:mm:ss ZZ YYYY", "en")._d;
    // console.log(date);
    let new_date = new Date(date);
    temp.push(new_date);

    temp.push(
      "https://twitter.com/" +
        populat_tweets_refined.statuses[j].user.screen_name +
        "/status/" +
        populat_tweets_refined.statuses[j].id_str
    );
    temp.push(populat_tweets_refined.statuses[j].created_at);
    temp.push(populat_tweets_refined.statuses[j].user.screen_name);
    popular_tweets.push(temp);
  }

  let analyzedTweet = [];
  let noAnalyzedTweet = [];

  for (let i = 0; i < popular_tweets.length; i++) {
    let popular_tweet = popular_tweets[i];
    let time = popular_tweet[3];
    popular_tweets[i][3] = moment(time, "dd MMM DD HH:mm:ss ZZ YYYY", "en")._d;

    let response3 = await getHourChangeCryptoImmediate(
      popular_tweet[3],
      chart_data
    );
    let response4 = await get3HourChangeCryptoImmediate(
      popular_tweet[3],
      chart_data
    );
    popular_tweet.push(response3);
    popular_tweet.push(response4);

    popular_tweet.push(stockName);
    popular_tweet.push(Math.abs(response3));

    if (response3 === "n/a") noAnalyzedTweet.push(popular_tweet);
    else analyzedTweet.push(popular_tweet);
    popular_tweets[i] = popular_tweet;
  }
  res.status(200).json(analyzedTweet);
};

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

const getHourChangeCryptoImmediate = async (date, data) => {
  let unixTime = date.getTime();
  var price1 = 0;
  var price2 = "n/a";

  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      if (unixTime <= data[i][0]) {
        if (i - 1 >= 0 && i + 3 < data.length) {
          price1 = data[i - 1][1];
          price2 = data[i + 3][1];
          console.log(price1 + " " + price2);
        }
        break;
      }
    }
  }

  if (price2 === "n/a") return "n/a";
  else {
    let priceDifference = ((price2 - price1) / price1) * 100;
    return priceDifference.toFixed(2);
  }
};

const get3HourChangeCryptoImmediate = async (date, data) => {
  let unixTime = date.getTime();
  var price1 = 0;
  var price2 = "n/a";

  if (data.length !== 0) {
    for (let i = 0; i < data.length; i++) {
      if (unixTime <= data[i][0]) {
        if (i - 1 >= 0 && i + 11 < data.length) {
          price1 = data[i - 1][1];
          price2 = data[i + 11][1];
        }
        break;
      }
    }
  }

  if (price2 === "n/a") return "";
  else {
    let priceDifference = ((price2 - price1) / price1) * 100;
    return priceDifference.toFixed(2);
  }
};
