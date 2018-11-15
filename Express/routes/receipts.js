const { Receipt, validate } = require("../models/receipt");
const { User } = require("../models/user");
const { Album } = require("../models/album");
const { Music } = require("../models/music");
const express = require("express");
const router = express.Router();

/* CRUD Operation */
/* Read */
router.get("/", async (req, res) => {
    // Find
    const receipts = await Receipt.find()
        .populate("album")
        .populate("music")
        .populate("user")
        .sort("time");

    // Response
    res.send(receipts);
});

router.get("/:id", async (req, res) => {
    // Find
    const receipt = await Receipt.findById(req.params.id)
        .populate("album")
        .populate("music")
        .populate("user")
    if (!receipt)
        return res
            .status(404)
            .send(`The receipt with given ID(${req.params.id}) was not found.`);

    // Response
    res.send(receipt);
});

/* Create */
router.post("/", async (req, res) => {
    // Validation test
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    // Make and Save
    let receipt = new Receipt(req.body);
    receipt = await receipt.save();

    // Response
    res.send(receipt);
});

/* Update */
router.patch("/:id", async (req, res) => {
    // Validation test
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.message);

    // Find Music and Update
    const receipt = await Receipt.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    // Response
    res.send(receipt);
});

/* Delete */
router.delete("/:id", async (req, res) => {
    // Find and Delete
    const receipt = await Receipt.findByIdAndDelete(req.params.id);

    // Response
    res.send(receipt);
});

module.exports = router;
