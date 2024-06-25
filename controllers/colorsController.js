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

// CREATE
colors.post("/", (req, res) => {
  // /colors
  console.log("This is req.body", req.body);
  const newColor = { ...req.body, id: colorsArray.length + 1 };
  colorsArray.push(newColor);
  res.json(colorsArray[colorsArray.length - 1]);
});

module.exports = colors;
