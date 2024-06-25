// Dependencies
const express = require("express");
// const colors = require("./models/color");

// Configuration
const app = express();

// MIDDLEWARE
app.use(express.json()); // parse incoming middleware

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to my Express app");
});

const colorsController = require("./controllers/colorsController.js");
app.use("/colors", colorsController);


// Multiple Params
app.get("/hello/:user/:food", (req, res) => {
  console.log(req.params);
  const { food, user } = req.params;
  res.send(`My name is ${user} and my favorite food is ${food}`);
});

app.get("/calculator/:operator", (req, res) => {
  console.log(req);
  let { num1, num2 } = req.query;
  [num1, num2] = [Number(num1), Number(num2)];
  let total = 0;
  const { operator } = req.params;

  if (operator === "add") {
    total = num1 + num2;
  }
  if (operator === "subtract") {
    total = num1 - num2;
  }
  if (operator === "multiple") {
    total = num1 * num2;
  }
  if (operator === "divide") {
    total = num1 / num2;
  }
  res.send(req);
  //   res.send("total is " + total);
});

// 404 Page not found
app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

// Export
module.exports = app;
