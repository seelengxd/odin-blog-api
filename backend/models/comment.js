const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  message: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model("Comment", CommentSchema);
