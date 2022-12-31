const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  message: { type: String, required: true },
  name: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, required: true, ref: "Post" },
});

module.exports = mongoose.model("Comment", CommentSchema);
