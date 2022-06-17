const localStrategy = require("passport-local").Strategy,
  dbManager = require("../utils/database"),
  bcrypt = require("bcrypt"),
  passport = require("passport");

const customFields = {
  usernameField: "username",
  passwordField: "password",
};

function initializePassport(passport) {
  const verifyUser = (username, password, done) => {
    const user = dbManager.getUserByUsername(username, async (res) => {
      const fetch = res[0];
      if (res.length === 0) return done(null, false);
      const match = await bcrypt.compare(password, fetch.PASSWORD);
      let user = {
        ID: res[0].ID,
        username: res[0].USERNAME,
        passHash: res[0].PASSWORD,
        salt: res[0].PASSWORD_SALT,
      };
      if (valid) return done(null, user);
      else return done(null, false);
    });
  };
  passport.use("local", new localStrategy(customFields, verifyUser));
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((userID, done) => {
    dbManager.getUserByID(userID, (res) => {
      done(null, res[0]);
    });
  });
}

module.exports = { initializePassport };
