const Joi = require("joi");
const mongoose = require("mongoose");

const comment_schema = new mongoose.Schema({
  commenter_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  commenter_name: { type: String, required: true },
  /*
    1. User Comment
    2. Album Comment
    3. Music Comment
  */
  comment_type: { type: Number, required: true },
  comment_to: { type: mongoose.Schema.Types.ObjectId, required: true },
  content: { type: String, required: true },
  time: { type: Date, default: Date.now }
});

const Comment = mongoose.model('Comment', comment_schema);

function validate_comment(comment) {
  const schema = {
    commenter_id: Joi.string().required(),
    commenter_name: Joi.string().required(),
    comment_type: Joi.number().required(),
    comment_to: Joi.string().required(),
    content: Joi.string().required(),
    time: Joi.date().default(Date.now)
  };
  return Joi.validate(comment, schema);
}

exports.Comment = Comment;
exports.validate = validate_comment;
exports.comment_schema = comment_schema;
