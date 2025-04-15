import express from "express";
import cors from "cors";
import mongoose from "mongoose";

// FIRST API "https://api.escuelajs.co/api/v1";
//SECOND API https://api.escuelajs.co/api/v1/products
const app = express();
const port = 5000;

//simple api
app.get("/Login", (req, res) => {
  const data = {
    tital: "Hello",
    description: "World",
  };

  res.send(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
