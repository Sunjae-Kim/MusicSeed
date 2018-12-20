const router = require("express").Router();
const controller = require("./files.controller");

router.get("/upload", controller.post);

module.exports = router;