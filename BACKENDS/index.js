// const mysql = require('mysql2');
import mysql from 'mysql2';
import express from 'express';
// const path = require('path');
const app = express();

const rout = 8000;
app.listen(rout, () => {
   console.log(`Server is running on port ${rout}`);
});
