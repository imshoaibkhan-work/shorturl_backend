const validUrl = require("valid-url");
const shortid = require("shortid");
const URL = require("../models/Url");

const BASE_URL = "http://localhost:8000";

const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;

  if (!validUrl.isUri(originalUrl)) {
    return res.status(400).json({ error: "Invalid URL" });
  }

  try {
    let url = await URL.findOne({ originalUrl });

    if (url) {
      res.json(url);
    } else {
      const shortUrl = `${BASE_URL}/${shortid.generate()}`;
      url = new URL({ originalUrl, shortUrl });
      await url.save();
      res.json(url);
    }
  } catch (error) {
    console.log("Error shortening URL: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getShortenUrl = async (req, res) => {
  try {
    const shortUrl = `${BASE_URL}/${req.params.shortURL}`;
    const url = await URL.findOne({ shortUrl });

    if (!url) {
      return res.status(404).json({ error: "Not Found" });
    }

    res.redirect(url.originalUrl);
  } catch (error) {
    console.error("Error redirecting URL:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  shortenUrl,
  getShortenUrl,
};
