import Twitter from "twitter";
import axios from "axios";

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

// fetches tweets from specific query
export const getTweets = async (req, res) => {
  const { stock } = req.params;

  console.log("getting stock from controller method");
  client.get("search/tweets", { q: stock }, function (error, tweets, response) {
    res.status(200).json(tweets);
  });
};

// fetches tweets from specific username
export const getUsername = async (req, res) => {
  const { username } = req.params;
  try {
    client.get(
      "http://api.twitter.com/1.1/statuses/user_timeline.json",
      {
        screen_name: username,
        count: 10,
        exclude_replies: true,
      },

      function (error, tweets, response) {
        res.status(200).json(tweets);
      }
    );
  } catch (e) {
    console.log(e);
  }
};
