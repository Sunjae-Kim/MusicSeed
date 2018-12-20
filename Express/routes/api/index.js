const router = require('express').Router();
const auth = require('./auth');
const users = require('./users');
const albums = require('./albums');
const comments = require('./comments');


router.use('/auth', auth);
router.use('/users', users);
router.use('/albums', albums);
router.user('./comments', comments);

module.exports = router;