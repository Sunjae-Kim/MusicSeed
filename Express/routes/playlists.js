const { Music } = require("../models/music");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

/* CRUD Operation */
/* Read */
router.get("/:user_id", async (req, res) => {
  // Find user
  let user = await User.findById(req.params.user_id);

  // Delete the song from the list if a song in the playlist doesn't exist
  user.playlist.forEach( async (song, index) => {
    const music = await Music.findById(song);
    if(!music) user.playlist.splice(user.playlist.indexOf(song), 1);
    if((index+1) === user.playlist.length) {
      user = await user.save();
      res.send(user.playlist);
    }
  });
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
router.patch("/:user_id/:selected/:target", async (req, res) => {

  // Find User
  let user = await User.findById(req.params.user_id);
  if (!user)
    return res
      .status(404)
      .send(`The user with given ID(${req.params.user_id}) was not found.`);

  // Insert selected song before target
  const music = user.playlist[req.params.selected];
  user.playlist.splice(req.params.selected, 1);
  user.playlist.splice(req.params.target, 0, music);

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
