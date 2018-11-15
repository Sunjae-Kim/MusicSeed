const Joi = require("joi");
const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
  email: { type: String, required: true },
  pw: { type: String, required: true },
  name: { type: String, required: true },
  nickname: { type: String },
  seed: { type: Number, default: 0 },
  description: String,
  albums: [{type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
  playlist: [{type: mongoose.Schema.Types.ObjectId, ref: "Music" }],
  comment: [{type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

const User = mongoose.model("User", user_schema);

function validate_user(user) {
  const schema = {
    email: Joi.string().required(),
    pw: Joi.string().required(),
    name: Joi.string().required(),
    nickname: Joi.string(),
    seed: Joi.number().default(0),
    description: Joi.string(),
    albums: Joi.array(),
    playlist: Joi.array(),
    comment: Joi.array()
  };
  return Joi.validate(user, schema);
}

exports.User = User;
exports.validate = validate_user;
exports.user_schema = user_schema;