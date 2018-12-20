const router = require("express").Router();
const controller = require("./users.controller");

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.post);
router.patch("/:id", controller.patch);
router.delete("/:id", controller.delete);

module.exports = router;