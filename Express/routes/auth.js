const passport = require('passport');

const express = require("express");
const router = express.Router();

router.get('/login', (req, res) => {

});

router.get('/logout', (req, res) => {

});

router.get('/google', passport.authenticate('google', { scope: ['email','profile'] }));

router.get('/google/callback',
        passport.authenticate('google'),
        function(req, res) {
            res.redirect('/');
    });

module.exports = router;