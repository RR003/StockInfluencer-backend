import Tweet from "../models/tweet.js";

export const createTweet = async (req, res) => {
  const wholeTweet = req.body;

  try {
    const tweets = await Tweet.findOne(wholeTweet);
    if (tweets === null) {
      const newTweet = new Tweet({
        ...wholeTweet,
      });

      await newTweet.save();
      res.status(201).json(newTweet);
    } else {
      res.status(201).json(null);
    }
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const allTimeChange = async (req, res) => {
  try {
    let querySort = { Magnitude: -1 };
    let tweets = await Tweet.find().sort(querySort);
    res.status(201).json(tweets);
  } catch (error) {
    console.log("error - allTimeChange");
    res.status(409).json({ message: "Something wrong, whoops..." });
  }
};

export const allWeekChange = async (req, res) => {
  try {
    let tweets = await Tweet.find().sort({ Time: -1 }).limit(300); // may need to change this paramter
    tweets.sort(function (a, b) {
      return parseFloat(b.Magnitude) - parseFloat(a.Magnitude);
    });
    res.status(201).json(tweets);
  } catch (error) {
    console.log("error - allWeekChange");
    res.status(409).json({ message: "Something wrong, whoops..." });
  }
};
