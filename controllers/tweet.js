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
    let querySort = { LongTermChange: -1 };
    let tweets = await Tweet.find().limit(100).sort(querySort);
    res.status(201).json(tweets);
  } catch (error) {
    res.status(409).json({ message: "Something wrong, whoops..." });
  }
};

export const allWeekChange = async (req, res) => {
  try {
    let timeSort = { Time: -1 };
    let querySort = { ShortTermChange: -1 };
    let unfiltered = await Tweet.find().sort(timeSort).limit(500);
    let tweets = await unfiltered.sort(querySort);
    res.status(201).json(tweets);
  } catch (error) {
    res.status(409).json({ message: "Something wrong, whoops..." });
  }
};
