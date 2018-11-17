const { Music } = require("../models/music");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

/* CRUD Operation */
/* Read */
router.get("/:user_id", async (req, res) => {
  // Find
  const playlists = await User.findById(req.params.user_id)
    .select("playlist")
    .populate("playlist");

  // Response
  res.send(playlists);
});

/*
  Create
  기존의 앨범에 새로운 노래를 추가할 때
*/
router.post("/:user_id/:music_id", async (req, res) => {
  // Find Music
  let music = await Music.findById(req.params.music_id);
  if (!music)
    return res
      .status(404)
      .send(`The music with given ID(${req.params.music_id}) was not found.`);

  // Find User
  let user = await User.findById(req.params.user_id);
  if (!user)
    return res
      .status(404)
      .send(`The user with given ID(${req.params.user_id}) was not found.`);

  // Update Playlist
  user.playlist.push(music._id);
  user = await user.save();

  // Response
  res.send(user);
});

/* Update */
router.patch("/:user_id/:index_1/:index_2", async (req, res) => {

  // Find User
  let user = await User.findById(req.params.user_id);
  if (!user)
    return res
      .status(404)
      .send(`The user with given ID(${req.params.user_id}) was not found.`);

  // Switch Order
  const tmp_song = user.playlist[req.params.index_1];
  user.playlist.splice(req.params.index_1, 1, user.playlist[req.params.index_2]);
  user.playlist.splice(req.params.index_2, 1, tmp_song);

  // Save the playlist
  user = await user.save();

  // Response
  res.send(user.playlist);
});

/* Delete */
router.delete("/:user_id/:index", async (req, res) => {
  // Find User
  let user = await User.findById(req.params.user_id);
  if (!user)
    return res
      .status(404)
      .send(`The user with given ID(${req.params.user_id}) was not found.`);

  // Delete logic
  user.playlist.splice(req.params.index, 1);

  // Save the playlist
  user = await user.save();

  // Response
  res.send(user.playlist);
});

module.exports = router;
