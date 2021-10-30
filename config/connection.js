const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "704taylor",
  database: "company_db"
});

db.connect(function(err) {
  if (err) throw err;
});

module.exports = db;