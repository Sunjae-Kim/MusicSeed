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
User.statics.create = function(newUSer) {
  const user = new this(newUSer);

  // return the Promise
  return user.save();
};

// find one user by using email
User.statics.findOneByUsername = function(email) {
  return this.findOne({
    email
  }).exec();
};

// verify the password of the User documment
User.methods.verify = function(pw) {
  return this.pw === pw;
};

User.methods.assignAdmin = function() {
  this.admin = true;
  return this.save();
};

exports.User = mongoose.model("User", User);
exports.validate = validate_user;