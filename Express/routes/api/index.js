const router = require('express').Router();
const auth = require('./auth');
const users = require('./users');
const albums = require('./albums');
const comments = require('./comments');
const musics = require('./musics');


router.use('/auth', auth);
router.use('/users', users);
router.use('/albums', albums);
router.use('./comments', comments);
router.use('./musics', musics);

module.exports = router;