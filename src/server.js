const express = require("express"),
  bodyParser = require("body-parser"),
  router = require("./utils/router"),
  session = require("express-session"),
  passport = require("passport"),
  passportConfig = require("./utils/passport-config"),
  flash = require("express-flash"),
  app = express(),
  port = 8080;
passportConfig.initializePassport(passport);
app.use(flash());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 60000 },
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use("/style", express.static("./public/css"));
app.use("/js", express.static("./public/js"));
app.use("/img", express.static("./public/img"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use("/", router);

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`[APP] running on port ${port}`);
});
