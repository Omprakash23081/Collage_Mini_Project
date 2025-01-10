const connection=require("./Connection")
import express from 'express';
const app = express();

const rout = 8000;
app.listen(rout, () => {
   console.log(`Server is running on port ${rout}`);
});
