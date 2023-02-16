const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Add mongdb user services
const userServices = require("./models/user-services.js");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});