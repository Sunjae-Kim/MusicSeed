const router = require("express").Router();
const controller = require("./files.controller");

router.get("/upload", controller.getById);

module.exports = router;