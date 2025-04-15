const mysql = require('mysql2');

const connection = mysql.connection({
    host:'localhost',
    user:'root',
    password:"Noida@18",
    database : 'loginpage',
});

module.exports=connection;