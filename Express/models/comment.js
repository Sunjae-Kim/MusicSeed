const Joi = require("joi");
const mongoose = require("mongoose");

const comment_schema = new mongoose.Schema({
  commenter_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  comment_type: { type: String, enum: ['Album', 'Music', 'User'] },
  comment_to: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: "comment_type" },
  content: { type: String, required: true },
  time: { type: Date, default: Date.now() }
});

const Comment = mongoose.model('Comment', comment_schema);

function validate_comment(comment) {
  const schema = {
    commenter_id: Joi.string().required(),
    comment_type: Joi.string().required(),
    comment_to: Joi.string().required(),
    content: Joi.string().required(),
    time: Joi.date()
  };
  return Joi.validate(comment, schema);
}

exports.Comment = Comment;
exports.validate = validate_comment;
exports.comment_schema = comment_schema;
