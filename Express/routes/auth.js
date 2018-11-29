const passport = require('passport');

const express = require("express");
const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['email','profile'] }));

router.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/google' }),
    function(req, res) {
        console.log("callback function start");
        console.log(req.query);
        res.redirect('/');
    });

module.exports = router;