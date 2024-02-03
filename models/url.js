const mongoose = require("mongoose");
const { fileURLToPath } = require('url');
const { dirname } = require('path');

// Now you can use __dirname in your code
console.log(__dirname);

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectURL: {
      type: String,
      required: true,
    },
    visitHistory: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

const URL = mongoose.model("url", urlSchema);

module.exports = URL;
