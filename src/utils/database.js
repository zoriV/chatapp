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

function getUserByUsername(username = "", callback) {
  const SQL = "SELECT * FROM chat_users WHERE username = ?";
  conn.query(SQL, [username], (err, res) => {
    if (err) throw err;
    return callback(res[0]);
  });
  return callback(null);
}
function getUserByID(id = "", callback) {
  const SQL = "SELECT * FROM chat_users WHERE id = ?";
  conn.query(SQL, [id], (err, res) => {
    if (err) throw err;
    return callback(res[0]);
  });
  return callback(null);
}

/**
 * pushes user into database
 * @param {String} username username
 * @param {String} password hashed password
 * @param {String} mail user e-mail
 * @param {function(result)} callback callback for a funciton
 * @returns boolean
 */
function createUser(username = "", password = "", mail, callback) {
  console.log(checkUserExist(username));
  if (checkUserExist(username)) return callback(null);
  const SQL = "INSERT INTO chat_users(username,password,mail) VALUES (?,?,?)";
  conn.query(SQL, [username, password, mail], (err, res, fields) => {
    if (err) throw err;
    return callback(res.affectedRows);
  });
}

function checkUserExist(username) {
  getUserByUsername(username, (user) => {
    return user == null ? false : true;
  });
}

module.exports = {
  getUserByID,
  getUserByUsername,
  createUser,
  checkUserExist,
};
