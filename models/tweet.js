import mongoose from "mongoose";

const TweetSchema = mongoose.Schema({
  Stock: { type: String, required: true },
  Tweet: { type: String, requried: true },
  Time: { type: String, required: true },
  Url: { type: String, required: true },
  User: { type: String, required: true },
  ShortTermChange: { type: Number, required: true },
  LongTermChange: { type: Number },
  Magnitude: { type: Number },
});

const Tweet = mongoose.model("Tweet", TweetSchema);
export default Tweet;
