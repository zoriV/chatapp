const crypto = require("crypto"),
  // dbManager = require("../utils/database"),
  iterations = 10000,
  length = 60,
  type = "sha512";

/**
 * check if passwords matches
 * @param {string} password
 * @param {string} hash
 * @param {string} salt
 * @returns boolean
 */
function matchPasswords(password, hash, salt) {
  let verify = crypto
    .pbkdf2Sync(password, salt, 10000, 60, type)
    .toString("hex");
  return hash === verify;
}

/**
 * generate user password
 * @param {string} password
 * @returns {password,salt}
 */
function genPassword(password) {
  let salt = crypto.randomBytes(32).toString("hex");
  let pass = crypto.pbkdf2Sync(password, salt, iterations, length, type);
  return { password: pass, salt: salt };
}
/**
 * check if user is authenticated
 * @param {} req
 * @param {} res
 * @param {function} next callback
 * @returns next
 */
function isAuth(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/notAuthorized");
}
module.exports = { matchPasswords, genPassword, isAuth };
