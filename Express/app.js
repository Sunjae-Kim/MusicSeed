/* Modules */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const dumpdata = require('./public/dumpdata');
const helmet = require('helmet');
const debug = require('debug')('app:development');
const morgan = require('morgan');
const mongoose = require("mongoose");
const express = require("express");
const app = express();

/* DB Connect */
mongoose
    .connect(
        "mongodb://localhost/MusicSeedTest",
        { useNewUrlParser: true }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error(error));

/* Routes */
const playlists = require('./routes/playlists');
const users = require('./routes/users');
const albums = require('./routes/albums');
const musics = require('./routes/musics');
const comments = require('./routes/comments');
const receipts = require('./routes/receipts');
const auth = require('./routes/auth');
const files = require('./routes/files');

require('./services/passport');



/* Middleware */
app.use(helmet());
if(app.get('env') === 'development'){
  debug('MORGAN을 실행합니다.');
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(passport.initialize());

app.use('/api/playlists', playlists);
app.use('/api/users', users);
app.use('/api/albums', albums);
app.use('/api/musics', musics);
app.use('/api/comments', comments);
app.use('/api/receipts', receipts);
app.use('/api/files', files);
app.use('/auth', auth);

/*
  Create
  1 User
  2 Songs
  1 Album
*/
// dumpdata.insert_dump_data();

/* Server */
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});