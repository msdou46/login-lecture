const mysql = require("mysql");

const db = mysql.createConnection({
    host: "express-database.cop97vlzzz2l.ap-northeast-2.rds.amazonaws.com",
    user: "root",
    password: "lololo46",
    database: "login_lecture"
});

db.connect();


module.exports = db;