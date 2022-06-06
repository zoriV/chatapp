const localStrategy = require("passport-local").Strategy,
  dbManager = require("./database"),
  bcrypt = require("bcrypt"),
  passport = require("passport"),
  crypto = require("crypto");

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

function initializePassport(passport) {
  const verifyUser = (username, password, done) => {
    const user = dbManager.getUserByUsername(username, (res) => {
      if (res.lenght === 0) return done(null, false);
      let valid = validPassword(password, res[0].PASSWORD);
    });
  };
  passport.use(new localStrategy(customFields, verifyUser));
}

module.exports = { initializePassport };
