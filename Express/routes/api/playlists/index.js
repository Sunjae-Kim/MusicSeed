const router = require("express").Router();
const controller = require("./playlists.controller");

router.get("/:user_id", controller.getById);
router.post("/:user_id/:music_id", controller.post);
router.patch("/:user_id/:selected/:target", controller.patch);
router.delete("/:user_id/:index", controller.delete);

module.exports = router;