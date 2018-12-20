/* Modules */
const bodyParser = require('body-parser');
const expressFileupload = require('express-fileupload');
const passport = require('passport');
const cookieSession = require('cookie-session');
var flash = require('connect-flash');
const helmet = require('helmet');
// const debug = require('debug')('app:development');
const morgan = require('morgan');
const mongoose = require("mongoose");
const express = require("express");
const app = express();

/* config */
const config = require('./config');
const port = process.env.PORT || 4000;

require('./services/passport');

/* Middleware */
app.use(helmet());
// if(app.get('env') === 'development'){
//   debug('MORGAN을 실행합니다.');
  app.use(morgan('dev'));
// }
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.set('jwt-secret', config.secret)

app.use(expressFileupload());
app.use(
    cookieSession({ // req.session == user.id
        name: 'USER Session',
        maxAge: (30 * 24 * 60 * 60 * 1000),
        keys: ['key1']
    })
);
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', require('./routes/api'));

/* Server */
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/* DB Connect */
mongoose
    .connect(
        config.mongodbUri,
        { useNewUrlParser: true }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error(error));
