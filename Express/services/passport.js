const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const mongoose = require('mongoose');
const { User } = require('../models/user');

passport.serializeUser((user, done) => {
    done(null, user.email); // set-cookie(serialized(user.id))
});

passport.deserializeUser((email, done) => {
    User.findOne({ email: email })
        .then(user => {
            done(null, user)
        })
        .catch(error => console.error(error.message));
});

passport.use(new GoogleStrategy(
    {
        clientID: "568719346323-hnjqt6utbqave1q6bcnq3374r09pqbov.apps.googleusercontent.com",
        clientSecret: "8TwKvrm5pW_I3fx7beBkqB7S",
        callbackURL: "/auth/google/callback",
        proxy: true
    },
    (accessToken, refreshToken, profile, done) => {
        let user = User.findOne({ email: profile.emails[0].value })
            .then(existingUser => {
                if(existingUser) { // User exists
                    console.log("existingUser");
                    done(null, existingUser);
                } else { // New user
                    console.log("saving user");
                    new User({
                        email: profile.emails[0].value,
                        name: profile.displayName,
                        nickname: profile.displayName,
                        oauth: true,
                    })
                        .save()
                        .then(newUser => done(null, newUser))
                        .catch(error => console.error(error.message));
                }
            })
            .catch(error => console.error(error.message));

        //done(null);
    }
));