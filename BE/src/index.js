const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const xlsx = require("xlsx");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  return res.send("hello world");
});

app.listen(port, () => {
  console.log("Server is running in port", port);
});

routes(app);

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("connection success");
  })
  .catch((err) => {
    console.log("Connection error", err);
  });
