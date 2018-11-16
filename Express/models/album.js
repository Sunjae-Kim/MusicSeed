const Joi = require("joi");
const mongoose = require("mongoose");
const { Music } = require("./music")

const album_schema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 30, lowercase: true },
  upload_date: { type: Date, default: Date.now() },
  musics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Music' }],
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  description: String,
  comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
});

const Album = mongoose.model("Album", album_schema);

function validate_album(album) {
  const schema = {
    title: Joi.string().required(),
    upload_date: Joi.date(),
    musics: Joi.array(),
    user_id: Joi.string().required(),
    description: Joi.string(),
    comment: Joi.array()
  };
  return Joi.validate(album, schema);
}

exports.Album = Album;
exports.validate = validate_album;
exports.album_schema = album_schema;
