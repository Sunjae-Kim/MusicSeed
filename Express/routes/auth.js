const passport = require('passport');

const { User } = require('../models/user');

const express = require("express");
const router = express.Router();

router.post('/login', passport.authenticate('local', {failureRedirect: '/register', failureFlash: true}),
    function (req, res) {
        res.send({redirect:'/'});
    });

router.get('/test', (req, res) => {
    res.send('testing');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.get('/google', passport.authenticate('google', { scope: ['email','profile'] }));

router.get('/google/callback',
        passport.authenticate('google'),
        function(req, res) {
            res.redirect('/');
    });

module.exports = router;