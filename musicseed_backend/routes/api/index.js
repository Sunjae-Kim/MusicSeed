const router = require('express').Router();
const auth = require('./auth');
const users = require('./users');
const albums = require('./albums');
const comments = require('./comments');
const musics = require('./musics');
const playlists = require('./playlists');
const files = require('./files');
const receipts = require('./receipts');


router.use('/auth', auth);
router.use('/users', users);
router.use('/albums', albums);
router.use('./comments', comments);
router.use('./musics', musics);
router.use('./playlists', playlists);
router.use('./files', files);
router.use('./receipts', receipts);

module.exports = router;