const express = require('express');
const { connectToMongoDB } = require("./connect");
const app = express();
const PORT = 8000;
const urlRoute  = require("./routes/url");
const mongoose = require('mongoose');

// Define URL schema
const urlSchema = new mongoose.Schema({
  shortId: String,
  redirectURL: String,
  visitHistory: [{ timestamp: Date }],
});

// Create URL model
const URL = mongoose.model('URL', urlSchema);

// Now you can use the URL model in your code

// Connect to MongoDB
connectToMongoDB('mongodb://localhost:27017/short-url')
  .then(() => console.log("MongoDB connected"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

app.use(express.json());
app.use("/url", urlRoute);

// Route for short URLs
app.get("/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: { timestamp: Date.now() },
        },
      }
    );
    if (!entry) {
      return res.status(404).send("URL not found");
    }
    res.redirect(entry.redirectURL);
  } catch (error) {
    console.error("Error handling redirect:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err);
  res.status(500).send("Internal Server Error");
});

// Start the server
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
