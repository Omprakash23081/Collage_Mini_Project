import express from "express";
import cors from "cors";
import mongoose from "mongoose";
const connection = require("./Connection");

const app = express();
const port = 5000;

// FIRST API "https://api.escuelajs.co/api/v1";
// SECOND API https://api.escuelajs.co/api/v1/products

// Simple API
app.get("/Login", (req, res) => {
  const data = {
    title: "Hello",
    description: "World",
  };

  res.send(data);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
