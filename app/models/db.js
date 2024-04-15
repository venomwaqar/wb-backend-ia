const mysql = require("mysql2/promise");
const config = require("../config/config.js");

var connection = mysql.createPool({
  host: config.HOST,
  user: config.USER,
  password: config.PASSWORD,
  database: config.DB
});

module.exports = connection;