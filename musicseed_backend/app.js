/* =======================
    LOAD THE DEPENDENCIES
==========================*/
const bodyParser = require('body-parser');
const expressFileupload = require('express-fileupload');
const passport = require('passport');
const cookieSession = require('cookie-session');
const flash = require('connect-flash');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require("mongoose");
const express = require("express");
const app = express();

/* =======================
    LOAD THE CONFIG
==========================*/
const config = require('./config');
const port = process.env.PORT || 4000;
require('./src/services/passport');

/* =======================
    EXPRESS CONFIGURATION
==========================*/
app.use(helmet());
app.use(morgan('dev'));
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
app.use(express.static("public"));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', require('./src/routes/api'));
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

/* =======================
    CONNECT TO MONGODB SERVER
==========================*/
mongoose
    .connect(
        config.mongodbUri,
        { useNewUrlParser: true }
    )
    .then(() => console.log("Connected to MongoDB"))
    .catch(error => console.error(error));
