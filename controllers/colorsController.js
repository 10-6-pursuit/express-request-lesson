const express = require("express");
const colors = express.Router();
const colorsArray = require("../models/color.js");

// Index
colors.get("/", (req, res) => {
  try {
    console.log("in Index Route");
    console.log(colorsArray);
    res.json(colorsArray);
  } catch (error) {
    res.send({ error });
  }
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

const checkForColorKey = (req, res, next) => {
  if (req.body.hasOwnProperty("name")) {
    return next();
  } else {
    res.send("You must supply an object with a key of `name`");
  }
};

const justSayHi = (req, res, next) => {
  console.log("Hi");
  return next();
};

// CREATE
colors.post("/", checkForColorKey, justSayHi, (req, res) => {
  // /colors
  console.log("This is req.body", req.body);
  const newColor = { ...req.body, id: colorsArray.length + 1 };
  colorsArray.push(newColor);
  res.json(colorsArray[colorsArray.length - 1]);
});

// DELETE
colors.delete("/:id", (req, res) => {
  const { id } = req.params;
  const deletedColorIndex = colorsArray.findIndex(
    (color) => color.id === Number(id)
  );
  if (deletedColorIndex !== -1) {
    const deletedColor = colorsArray.splice(deletedColorIndex, 1);
    // res.status(200).json(deletedColor[0]);
    res.redirect("/colors");
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

// UPDATE
colors.put("/:id", (req, res) => {
  const { id } = req.params;
  const colorToUpdateIndex = colorsArray.findIndex(
    (color) => color.id === Number(id)
  );
  if (colorToUpdateIndex !== -1) {
    colorsArray[colorToUpdateIndex] = {
      ...colorsArray[colorToUpdateIndex],
      ...req.body,
    };
    res.status(200).json(colorsArray[colorToUpdateIndex]);
  } else {
    res.status(404).json({ error: "Not Found" });
  }
});

module.exports = colors;
/*
METHOD  Restful Route 
 GET    INDEX (Read)
 GET    SHOW  (Read)
 POST   CREATE
 PUT    UPDATE
 DELETE DESTROY
*/

//
// #	Action	URL	HTTP Verb	CRUD	Description
// 1	Create	/disruptions	POST	Create	Create a new
// 2	Index	/disruptions	GET	Read	Get a list (or index) of all
// 3	Show	/disruptions/:id	GET	Read	Get an individual view (show one)
// 4	Update	/disruptions/:id	PUT	Update	Update a
// 5	Destroy	/disruptions/:id	DELETE	Delete	Delete a

// Disruptions
// date, type (closure, delay, none), duration, reason (snow, flooding, wind), message
