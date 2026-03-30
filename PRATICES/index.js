import express from "express";
const app = express();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is started on ${PORT}`);
});

app.get("/", (req, res) => {});
