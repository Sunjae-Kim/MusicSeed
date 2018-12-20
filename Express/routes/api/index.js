const router = require('express').Router();
const auth = require('./auth');
const users = require('./users');
const albums = require('./albums');


router.use('/auth', auth);
router.use('/users', users);
router.use('/albums', albums);

module.exports = router;