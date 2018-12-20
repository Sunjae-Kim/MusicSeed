const {hashPassword} = require('../lib/hashPassword');
const Joi = require("joi");
const mongoose = require("mongoose");

const User = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  pw: { type: String, trim: true },
  name: { type: String, required: true, lowercase: true },
  nickname: { type: String, lowercase: true },
  seed: { type: Number, default: 0 },
  description: String,
  albums: [{ type: mongoose.Schema.Types.ObjectId, ref: "Album" }],
  playlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Music" }],
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  oauth: Boolean,
  admin: {type: Boolean, default: false},
});

function validate_user(user) {
  const schema = {
    email: Joi.string().required(),
    pw: Joi.string(),
    name: Joi.string()
      .required()
      .lowercase(),
    nickname: Joi.string().lowercase(),
    seed: Joi.number().default(0),
    description: Joi.string(),
    albums: Joi.array(),
    playlist: Joi.array(),
    comment: Joi.array(),
    oauth: Joi.boolean(),
    admin: Joi.boolean(),
  };
  return Joi.validate(user, schema);
}

// create new User document
User.statics.create = async function(newUSer) {

  newUSer.pw = await hashPassword(newUSer.pw);

  let user = new this(newUSer);
  user = await user.save();

  // return the Promise
  return user;
};

// find one user by using email
User.statics.findOneByEmail = function(email) {
  return this.findOne({
    email
  }).exec();
};

// verify the password of the User documment
User.methods.verify = async function(pw) {
  const encrypted = await hashPassword(pw);
  return this.pw === encrypted;
};

User.methods.assignAdmin = function() {
  this.admin = true;
  return this.save();
};

exports.User = mongoose.model("User", User);
exports.validate = validate_user;