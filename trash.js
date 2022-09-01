
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "anirudh2628*"
})

con.connect(function (err) {
    if (err) throw err;
    console.log("connected")
})