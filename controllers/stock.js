import Twitter from "twitter";

const client = new Twitter({
  consumer_key: "AtpeYIUnVTjJxoT2Ois7oa48g",
  consumer_secret: "QoNom0RuGe9GJbfP9OaUhWLeIZAJYPmPSb6SsOcnt2mOXvSUFd",
  access_token_key: "1197142098077798404-uMPDZDmMx20FH8t5AhwG75ON4NNYn9",
  access_token_secret: "UCIwRRpfRuBTUglR9HXxppiE9vnAbSSRUfMsGW6nllvwH",
});

export const getTweets = async (req, res) => {
  const { stock } = req.params;

  console.log("getting stock from controller method");
  client.get("search/tweets", { q: stock }, function (error, tweets, response) {
    console.log(error);
    console.log(tweets);
  });
};
