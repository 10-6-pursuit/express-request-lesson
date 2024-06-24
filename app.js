// Dependencies
const express = require("express");
// const colors = require("./models/color");

// Configuration
const app = express();

// Routes
app.get("/", (req, res) => {
  res.send("Welcome to my Express app");
});

const colorsController = require("./controllers/colorsController.js");
app.use("/colors", colorsController);

// Index
// app.get("/colors", (req, res) => {
//   res.send(colors);
// });

// A route with an error
// app.get("/colors/oops/:id", (req, res) => {
//   const { id } = req.params;
//   res.send(colors[id]);
//   // error cannot send more than one response!
//   res.send("This is the id: " + id);
// });

// This will never be reached
// app.get("/colors/cool", (req, res) => {
//   res.send(`
//      <body
//      style="background: linear-gradient(to bottom, ${colors[0]} 16%, ${colors[1]} 32%, ${colors[2]} 48%, ${colors[3]} 64%, ${colors[4]} 80%, ${colors[5]} 100%)"
//      >
//      <h1>Colors are cool!</h1>
//      </body>
//      `);
// });

// Show
// app.get("/colors/:id", (req, res) => {
//   // /colors/cool
//   const { id } = req.params;
//   const color = colors.find((color) => color.id === Number(id));
//   if (color) {
//     res.send(color);
//   } else {
//     res.send("Cannot find any colors with this id: " + id);
//   }
// });

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
