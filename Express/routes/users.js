const { User, validate } = require("../models/user");
const { Album } = require("../models/album");
const { Music } = require("../models/music");
const express = require("express");
const router = express.Router();

/* CRUD Operation */
/* Read */
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
    const user = await User.findByIdAndDelete(req.params.id);

    // Response
    res.send(user);
});

module.exports = router;
