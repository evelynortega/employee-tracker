const mysql = require("mysql2")
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "employee_db"
})

connection.connect(function(err){
    if(err) console.error(err)
})

module.exports = connection