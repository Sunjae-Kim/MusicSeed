const router = require('express').Router();
const auth = require('./auth/index');
const users = require('./users/index');
const albums = require('./albums/index');
const comments = require('./comments/index');
const musics = require('./musics/index');
const playlists = require('./playlists/index');
const files = require('./files/index');
const receipts = require('./receipts/index');
const authMiddleware = require('../../lib/middlewares/auth');

router.use('/auth', auth);
router.use('/users', authMiddleware, users);
router.use('/albums', albums);
router.use('./comments', comments);
router.use('./musics', musics);
router.use('./playlists', playlists);
router.use('./files', files);
router.use('./receipts', receipts);

module.exports = router;