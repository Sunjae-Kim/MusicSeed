const { Music, validate } = require("../models/music");
const { Album } = require("../models/album");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

/* CRUD Operation */
/* Read */
router.get("/", async (req, res) => {
  // Find
  const musics = await Music.find()
    .populate("album_id")
    .sort("title");

  // Response
  res.send(musics);
});

router.get("/:id", async (req, res) => {
  // Find
  const music = await Music.findById(req.params.id)
    .populate("album_id")
    .populate("main_artist_id");
  if (!music)
    return res
      .status(404)
      .send(`The music with given ID(${req.params.id}) was not found.`);

  // Response
  res.send(music);
});

/*
  Create
  기존의 앨범에 새로운 노래를 추가할 때
*/
router.post("/", async (req, res) => {
  // Validation test
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  // Find User
  const user = await User.findById(req.body.main_artist_id);
  if (!user)
    return res
      .status(404)
      .send(`The user with given ID(${req.body.main_artist_id}) was not found.`);

  // Find Album
  let album = await Album.findById(req.body.album_id);
  if (!album)
    return res
      .status(404)
      .send(`The album with given ID(${req.body.album_id}) was not found.`);

  // Make Music
  let music = new Music(req.body);

  // Find Album and update music info
  album.musics.push(music._id);

  // Save Album and Music
  album = await album.save();
  music = await music.save();

  // Response
  res.send({ album, music });
});

/* Update */
router.patch("/:id", async (req, res) => {
  // Validation test
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  // Find User
  const user = await User.findById(req.body.main_artist_id);
  if (!user)
    return res
      .status(404)
      .send(`The user with given ID(${req.body.main_artist_id}) was not found.`);

  // Find Music and Update
  const music = await Music.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  // Response
  res.send(music);
});

/* Delete */
router.delete("/:id", async (req, res) => {
  // Find
  let music = await Music.findById(req.params.id);

  // Delete music_id from the album
  let album = await Album.findById(music.album_id);
  album.musics.splice(album.musics.indexOf(music._id), 1);

  // Delete comments on music
  music.comment.forEach( async comment_id => {
    await Comment.findByIdAndDelete(comment_id);
  });

  // Delete Music
  music = await music.delete();

  // Save album
  album = await album.save();

  // Response
  res.send([ music, album ]);
});

module.exports = router;
