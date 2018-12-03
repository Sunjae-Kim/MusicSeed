const passport = require('passport');

const { User, validate } = require("../models/user");
const { Album } = require("../models/album");
const { Music } = require("../models/music");

const express = require("express");
const router = express.Router();

/* CRUD Operation */
/* Read */
router.get('/current', async (req, res) => {
    //show login page
    console.log(req.user);
    res.send(req.user);
});

router.get("/", async (req, res) => {
  // Find
  const users = await User.find()
    .populate("album")
    .populate("music")
    .populate("comment")
    .sort("name");

  // Response
  res.send(users);
});

router.get("/:id", async (req, res) => {
  // Find
  const user = await User.findById(req.params.id)
    .populate("album")
    .populate("music")
    .populate("comment");
  if (!user)
    return res
      .status(404)
      .send(`The user with given ID(${req.params.id}) was not found.`);

  // Response
  res.send(user);
});

/* Create */
router.post("/", async (req, res) => {
  // Validation test
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  // Make and Save
  let user = new User(req.body);
  user = await user.save();

  // Response
  res.send(user);
});

/* Update */
router.patch("/:id", async (req, res) => {
  // Validation test
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.message);

  // Find Music and Update
  const user = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  // Response
  res.send(user);
});

/* Delete */
router.delete("/:id", async (req, res) => {
  // Find and Delete
  let user = await User.findByIdAndDelete(req.params.id);

  // Delete comments on the user
  user.comment.forEach( async comment_id => {
    await Comment.findByIdAndDelete(comment_id);
  });

  // Find Album and delete logic
  user.albums.forEach( async album_id => {
    let album = await Album.findByIdAndDelete(album_id);

    // Find and delete comments on the album
    album.comment.forEach( async comment_id => {
      await Comment.findByIdAndDelete(comment_id);
    });

    // Find and delete musics in the album
    album.musics.forEach( async music_id => {
      const music = await Music.findByIdAndDelete(music_id);
      music.comment.forEach( async comment_id => {
        await Comment.findByIdAndDelete(comment_id);
      })
    });
  });

  // Response
  res.send(user);
});




router.post('/login', async (req, res) => {

});

router.get('/logout', async (req, res) => {

});

module.exports = router;
