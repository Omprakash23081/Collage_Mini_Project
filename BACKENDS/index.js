// const mysql = require('mysql2');
import mysql from 'mysql2';
import express from 'express';
// const path = require('path');
const app = express();

const rout = 8000;
app.listen(rout, () => {
   console.log(`Server is running on port ${rout}`);
});


app.get("/" , (req , res) => {
   res.render("home.ejs");
});


app.get("/login" , (req , res) => {
   res.render("login.ejs");
});


app.get("/rejester" , (req , res) => {
   res.render("rejester.ejs");
});



// Create the connection to database
const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'omprakash',
    password : 'Noida@18',
  });

  try{
     connection.query("SHOW TABLES" ,(err , result)=>{
        if (err) throw err
        console.log(result)
     })
  }catch(err){
    console.log(err);
  }