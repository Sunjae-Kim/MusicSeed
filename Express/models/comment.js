const Joi = require("joi");
const mongoose = require("mongoose");

const comment_schema = new mongoose.Schema({
  commenter_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  onModel: { type: String, enum: ['Album', 'Music', 'User'], required: true },
  comment_to: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "onModel" },
  body: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', comment_schema);

function validate_comment(comment) {
  const schema = {
    commenter_id: Joi.string().required(),
    onModel: Joi.string().required(),
    comment_to: Joi.string().required(),
    body: Joi.string().required(),
    date: Joi.date()
  };
  return Joi.validate(comment, schema);
}

exports.Comment = Comment;
exports.validate = validate_comment;
exports.comment_schema = comment_schema;
