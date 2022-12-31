const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  published: { type: Boolean, required: true, default: false },
  timestamp: { type: Date, required: true, default: () => Date.now() },
});

module.exports = mongoose.model("Post", PostSchema);
