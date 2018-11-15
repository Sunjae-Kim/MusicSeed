const { Music, validate } = require("../models/music");
const { User } = require("../models/user");
const express = require("express");
const router = express.Router();

/* CRUD Operation */
/* Read */
router.get("/", async (req, res) => {
    // Find
    const musics = await Music.find()
        .populate("album")
        .populate("user")
        .populate("comment")
        .sort("title");

    // Response
    res.send(musics);
});

router.get("/:id", async (req, res) => {
    // Find
    const music = await Music.findById(req.params.id)
        .populate("album");
    // .populate("user")
    // .populate("comment");
    if (!music)
        return res
            .status(404)
            .send(`The music with given ID(${req.params.id}) was not found.`);

    // Response
    res.send(music);
});

/* Create */
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

    // Make Music
    let music = new Music(req.body);
    music = await music.save();

    // Response
    res.send(music);
});

/* Update */
router.patch("/:id", async (req, res) => {
    // Validation test
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    // Find User
    const user = await User.findById(req.body.album.user_id);
    if (!user)
        return res
            .status(404)
            .send(`The user with given ID(${req.body.album.user_id}) was not found.`);

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
    // Find and Delete
    const music = await Music.findByIdAndDelete(req.params.id);

    // Response
    res.send(music);
});

module.exports = router;
