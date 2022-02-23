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
