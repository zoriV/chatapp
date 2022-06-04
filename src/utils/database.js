const mysql = require("mysql");
require("dotenv").config({ path: "./.env" });
const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  password: process.env.DB_PASS,
  user: process.env.DB_USER,
  database: "db_67976",
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

function createUser(username = "", password = "", mail, callback) {
  console.log(checkUserExist(username));
  if (checkUserExist(username)) return callback(null);
  const SQL = "INSERT INTO chat_users(username,password,mail) VALUES (?,?,?)";
  conn.query(SQL, [username, password, mail], (err, res, fields) => {
    if (err) throw err;
    return callback(res.affectedRows);
  });
  // return callback(null);
}
function checkUserExist(username) {
  getUserByUsername(username, (user) => {
    return user == null ? false : true;
  });
  return true;
}

createUser("nbdmsadnm,asdnm,", "daskjhdasdkj", "dsajkdlasjdlkasd", (data) =>
  console.dir(data)
);

module.exports = { getUserByUsername };
