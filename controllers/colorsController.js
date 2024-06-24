const express = require("express");
const colors = express.Router();
const colorsArray = require("../models/color.js");

// Index
colors.get("/", (req, res) => {
  res.json(colorsArray);
});

// Show
colors.get("/:id", (req, res) => {
  const { id } = req.params;
  const color = colorsArray.find((color) => color.id === Number(id));
  if (color) {
    res.send(color);
  } else {
    res.send("Cannot find any colors with this id: " + id);
  }
});

module.exports = colors;
