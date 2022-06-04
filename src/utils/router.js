"use strict";
const bodyParser = require("body-parser"),
  express = require("express"),
  dbManager = require("./database"),
  session = require("express-session"),
  bcrypt = require("bcrypt"),
  passport = require("passport");
let router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router
  .route("/login")
  .get((req, res, next) => {
    res.render("login");
  })
  .post((req, res, next) => {
    const { username, password } = req.body;
    dbManager.getUserByUsername(username, (data) => {
      var toReturn = {};
      toReturn.userExist = data == null ? false : true;
      res.json(toReturn);
    });
  });

router
  .route("/register")
  .get((req, res, next) => {
    res.render("register");
  })
  .post(async (req, res, next) => {
    try {
      const hashedPass = await bcrypt.hash(req.body.password, 10);
      dbManager;
    } catch (error) {
      res.redirect("/register");
    }
  });

module.exports = router;
