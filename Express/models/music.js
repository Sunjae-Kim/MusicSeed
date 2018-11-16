const Joi = require("joi");
const mongoose = require("mongoose");

const music_schema = new mongoose.Schema({
  title: { type: String, required: true, lowercase: true },
  music_path: { type: String, required: true },
  artwork_path: String,
  genre: String,
  award: Number,
  playtime: String,
  title_song: Boolean,
  album_id: { type: mongoose.Schema.Types.ObjectId, ref: "Album"  },
  main_artist_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  artist_info: [{ job: String, name: String, user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
  score: { type: Number, default: 0 },
  score_count: { type: Number, default: 0 },
  comment: { type: [mongoose.Schema.Types.ObjectId], ref: "Comment" }
});

const Music = mongoose.model("Music", music_schema, 'Musics ');

function validate_music(music) {
  const schema = {
    title: Joi.string().required(),
    music_path: Joi.string().required(),
    artwork_path: Joi.string(),
    genre: Joi.string(),
    award: Joi.number(),
    playtime: Joi.string(),
    title_song: Joi.boolean(),
    album_id: Joi.string(),
    main_artist_id: Joi.string().required(),
    artist_info: Joi.array(),
    score: Joi.number().default(0),
    score_count: Joi.number().default(0),
    comment: Joi.array()
  };
  return Joi.validate(music, schema);
}

exports.Music = Music;
exports.validate = validate_music;
exports.music_schema = music_schema;
