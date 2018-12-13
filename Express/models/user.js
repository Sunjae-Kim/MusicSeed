const Joi = require("joi");
const mongoose = require("mongoose");

const user_schema = new mongoose.Schema({
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
user_schema.statics.create = function(newUSer) {
  const user = new this(newUSer);

  // return the Promise
  return user.save();
};

// find one user by using email
user_schema.statics.findOneByUsername = function(email) {
  return this.findOne({
    email
  }).exec();
};

// verify the password of the User documment
user_schema.methods.verify = function(pw) {
  return this.pw === pw;
};

user_schema.methods.assignAdmin = function() {
  this.admin = true;
  return this.save();
};

const User = mongoose.model("User", user_schema);

exports.User = User;
exports.validate = validate_user;
exports.user_schema = user_schema;