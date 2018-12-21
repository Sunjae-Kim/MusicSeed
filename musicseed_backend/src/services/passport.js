const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const { User } = require("../models/user");
const bcrypt = require("bcrypt");

// 사용자 정보 객체를 세션에 아이디로 저장
passport.serializeUser((user, done) => {
  console.log(`serialize : ${user._id}`);
  done(null, user._id);
});

// 세션에 저장한 아이디를 통해 사용자 정보 객체 로드
passport.deserializeUser((_id, done) => {
    console.log(`_id : ${_id}`);
    User.findOne({ _id: _id })
      .then(user => {
        done(null, user);
      })
      .catch(error => done(err));
  });

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "pw"
    },
    async (email, pw, done) => {
      try {
        const exUser = await User.find({ email: email });
        if (exUser) {
          const result = await bcrypt.compare(pw, exUser[0].pw);
          if (result) {
            done(null, exUser[0]);
          } else {
            done(null, false, { message: "비밀번호가 일치하지 않습니다." });
          }
        } else {
          done(null, false, { message: "가입되지 않은 회원입니다." });
        }
      } catch (error) {
        console.error(error);
        done(error);
      }
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "695709022283-ka3mduesg48dmb98sm450pgdlnmfp5ft.apps.googleusercontent.com",
      clientSecret: "5k4juryV2vPv-9uCpUmRMZbu",
      callbackURL: "/api/auth/google/callback",
      proxy: true
    },
    async (accessToken, refreshToken, profile, done) => {
      User.findOne({ email: profile.emails[0].value })
        .then(async existingUser => {
          if (existingUser) {
            // User exists
            // console.log("existingUser");
            done(null, existingUser, { accessToken });
          } else {
            // New user
            console.log("saving user");
            new User({
              email: profile.emails[0].value,
              name: profile.displayName,
              nickname: profile.displayName,
              oauth: true
            })
              .save()
              .then(newUser => done(null, newUser))
              .catch(error => {
                console.error(error.message);
                done(error);
              });
          }
        })
        .catch(error => {
          console.error(error.message);
          done(error);
        });
    }
  )
);
