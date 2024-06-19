// Dependencies
const express = require("express");
const colors = require("./models/color");

// Configuration
const app = express();

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to my Express app");
});

// Index
app.get("/colors", (req, res) => {
  res.send(colors);
});

// Export
module.exports = app;
