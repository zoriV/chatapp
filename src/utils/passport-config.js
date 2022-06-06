const localStrategy = require("passport-local").Strategy;
const dbManager = require("./database");
const bcrypt = require("bcrypt");
const passport = require("passport");

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

function initializePassport(passport) {
  const verify = (username, password, done) => {};
}

module.exports = { initializePassport };
