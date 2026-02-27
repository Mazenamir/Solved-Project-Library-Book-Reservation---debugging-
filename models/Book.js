const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
  addedAt: {
    type: Date,
    default: Date.now , // Changed to Date.now (no parentheses)
  },
});

module.exports = mongoose.model("Book", bookSchema);
