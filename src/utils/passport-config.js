const localStrategy = require("passport-local").Strategy;
const dbManager = require("./database");
const bcrypt = require("bcrypt");
const passport = require("passport");

function initializePassport(passport) {
  const authenticateUser = async (username, password, done) => {
    const user = dbManager.getUserByUsername(username);
    if (user == null) {
      return done(null, false, { message: "No user with that email" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use(
    new localStrategy({ usernameField: "username" }, authenticateUser)
  );
  passport.serializeUser((user, done) => {
    done(null, user.ID);
  });
  passport.deserializeUser((id, done) => {
    return done(null, dbManager.getUserByID(id));
  });
}

module.exports = { initializePassport };
