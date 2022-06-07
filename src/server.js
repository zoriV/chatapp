require("dotenv").config({ path: "./.env" });
const express = require("express"),
  bodyParser = require("body-parser"),
  router = require("./config/router"),
  session = require("express-session"),
  passport = require("passport"),
  passportConfig = require("./config/passport-config"),
  flash = require("express-flash"),
  MySQLStore = require("express-mysql-session"),
  app = express(),
  port = process.env.SERVER_PORT || 8080;
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: new MySQLStore({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: "db_67976",
      schema: {
        tableName: "chat_sessions",
        columnNames: {
          session_id: "SESSION_ID",
          expires: "EXPIRES",
          data: "DATA",
        },
      },
    }),
    cookie: { secure: true, maxAge: 1000 * 60 * 60 },
  })
);
app.use(flash());
passportConfig.initializePassport(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use("/style", express.static("./public/css"));
app.use("/js", express.static("./public/js"));
app.use("/img", express.static("./public/img"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(router);

app.listen(port, (err) => {
  if (err) throw err;
  console.log(`[APP] running on port ${port}`);
});
