"use strict";
const bodyParser = require("body-parser"),
  express = require("express"),
  dbManager = require("./database"),
  session = require("express-session"),
  bcrypt = require("bcrypt"),
  passport = require("passport"),
  authController = require("../controllers/authController");
let router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.route("/authError").get((req, res, next) => {
  res.render("notAuthorized");
});

router
  .route("/login")
  .get((req, res, next) => {
    res.render("login");
  })
  .post((req, res, next) => {
    passport.authenticate("local", {
      failureRedirect: "/register",
      successRedirect: "/",
    });
  });

router
  .route("/register")
  .get((req, res, next) => {
    res.render("register");
  })
  .post((req, res, next) => {
    const { password, salt } = authController.genPassword(req.body.password);
    dbManager.createUser(
      req.body.username,
      password,
      salt,
      req.body.mail,
      (result) => {
        if (result) res.redirect("/login");
        else res.redirect("/register");
      }
    );
  });

router.route("/").get((req, res, next) => {
  authController.isAuth(req, res, () => {
    res.redirect("/");
  });
});

router.route("/logout").get((req, res, next) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;
