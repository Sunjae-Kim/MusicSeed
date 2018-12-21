/* =======================
    LOAD THE DEPENDENCIES
==========================*/
require("dotenv").config();
const session = require("express-session");
const RedisStore = require('connect-redis')(session);
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const expressFileupload = require("express-fileupload");
const passport = require("passport");
const flash = require("connect-flash");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

/* =======================
    LOAD THE CONFIG
==========================*/
const config = require("./config");
const port = process.env.PORT || 4000;
require("./src/services/passport");

/* =======================
    EXPRESS CONFIGURATION
==========================*/
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(session({
    store: new RedisStore(/*redis config: host, port 등*/), // 세션 저장소를 레디스 서버로 설정
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
  }))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set("jwt-secret", config.secret);
app.use(expressFileupload());
app.use(express.static("public"));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use("/api", require("./src/routes/api"));

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
