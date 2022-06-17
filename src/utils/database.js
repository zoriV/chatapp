const mysql = require("mysql");
require("dotenv").config({ path: "./.env" });
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  database: "db_67976",
  multipleStatements: true,
});

conn.connect((err) => {
  if (err) throw err;
  console.log("[DB] Successfully connected");
});

/**
 *
 * @param {string} username
 * @param {function(result)} callback
 * @returns callback
 */
function getUserByUsername(username, callback) {
  const SQL = "SELECT * FROM chat_users WHERE username = ?";
  conn.query(SQL, [username], (err, res) => {
    if (err) throw err;
    return callback(res);
  });
  return callback(null);
}
/**
 *
 * @param {number} id user ID
 * @param {function(result)} callback
 * @returns callback
 */
function getUserByID(id, callback) {
  const SQL = "SELECT * FROM chat_users WHERE id = ?";
  conn.query(SQL, [id], (err, res) => {
    if (err) throw err;
    return callback(res[0]);
  });
  return callback(null);
}

/**
 * pushes user into database
 * @param {string} username username
 * @param {string} password hashed password
 * @param {string} mail user e-mail
 * @param {string} salt salt for generated password
 * @param {function(result)} callback callback for a funciton
 * @returns {error,res}
 * result error codes: 1 - incorrect data, 2 - user exist
 */
function createUser(username, password, salt, mail, callback) {
  if (username.length == 1 || password.length == 1 || mail.length == 1)
    return callback({ error: 1, res: null });
  if (checkUserExist(username)) return callback({ error: 2, res: null });
  const SQL =
    "INSERT INTO chat_users(username,password,password_salt,mail) VALUES (?,?,?,?)";
  conn.query(SQL, [username, password, salt, mail], (err, res, fields) => {
    if (err) throw err;
    return callback({ error: 0, res: res.affectedRows === 1 ? true : false });
  });
}

// console.log(checkUserExist("pablo"));

function checkUserExist(username) {
  let SQL =
    "SELECT COUNT(*) AS 'useramount' FROM chat_users WHERE username = ?";
  conn.query(SQL, [username], async (err, res, fields) => {
    if (err) throw err;
    let userAmount = res[0].useramount;
    return userAmount === 1 ? true : false;
  });
}

module.exports = {
  getUserByID,
  getUserByUsername,
  createUser,
  checkUserExist,
};
