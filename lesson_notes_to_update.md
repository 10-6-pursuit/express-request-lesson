# Introduction to Express Request

## Learning Objectives

By the end of this lesson, you should be able to:

- Begin organizing your application into separate files with different roles for long-term maintainability
- Describe what a resource is and how it relates to internet applications.
- Make requests with query parameters and URL queries to a locally running server via the browser.
- Identify common errors that occur in building Express routes.
- Common error: Two responses
- Common error: Place routes in the correct order
- Access request parameters in an Express route.
- Access query parameters in an Express route.
- Access important data from the request object.

---

## Quick Review

- What is Express?

- How do you start a new npm project?

- How do you add the Express package?

- When you start your Express server, what address must you visit in the browser?

## Start coding

- Navigate to your Desktop or another convenient folder
- `git status` to make sure you are not already in a `git` repository
- `mkdir express-minerals`
- `cd express-minerals`
- `touch server.js`
- `npm init -y` (this will automatically say yes to all the npm default settings - this is fine for tutorials, small test builds, etc.)
- `npm install express@4 dotenv@2`
- `touch .gitignore` (tell git which files to ignore) and add the following to the file:

```
node_modules
.env
```

- Why and when do to start file/folder names with a `.`?

- Why must the version be included when installing packages for a class or tutorial?

### Set Up App

- `touch app.js`

**app.js**

```js
// DEPENDENCIES
const express = require("express");

// CONFIGURATION
const app = express();

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Express Minerals App");
});

// EXPORT
module.exports = app;
```

### Separating Concerns

You will now create another file to set up your basic server:

**server.js**

```js
// DEPENDENCIES
const app = require("./app.js");

// CONFIGURATION
require("dotenv").config();
const PORT = process.env.PORT;

// LISTEN
app.listen(PORT, () => {
  console.log(`🪨 Listening on port ${PORT} 💎 `);
});
```

Get the app running with `nodemon server.js` and go to http://localhost:3333

- Why is the variable named `PORT` and not `port`?

- What is the function of each file?

- `package.json`
- `.env`
- `app.js`
- `server.js`

- Why is it important to make different files?

## Mocking data

- `mkdir models`
- `touch models/rock.js`

- Why is the folder named `models`?

- What are data models?

- Why must you assign it to `module.exports`?

**models/rock.js**

```js
module.exports = [
  "Crocoite",
  "Wulfenite",
  "Amber",
  "Malachite",
  "Azurite",
  "Amethyst",
];
```

Copy and paste this array into `rock.js`

Make an index route of all the rocks. Be sure to import your data first.

**app.js**

```js
// DEPENDENCIES
const express = require("express");
const rocks = require("./models/rock.js");

// CONFIGURATION
const app = express();

// ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Express Minerals App");
});

// Index route
app.get("/rocks", (req, res) => {
  res.send(rocks);
});

// EXPORT
module.exports = app;
```

http://localhost:3333/rocks

### Showing each rock

Create a dynamic route and access a specific rock using the index position.

```js
// ROUTES
app.get("/rocks/:index", (req, res) => {
  const { index } = req.params;
  res.send(rocks[index]);
});
```

http://localhost:3333/rocks/1

- What is a server resource?

## A Common Error

You can only have one response for every request: This is the rule of the http protocol. You'll get an error in the terminal if you try to send multiple responses.

```js
app.get("/rocks/oops/:index", (req, res) => {
  const { index } = req.params;
  res.send(rocks[index]);
  // error cannot send more than one response!
  res.send("This is the index: " + index);
});
```

Is it possible to have multiple statements as part of the route's logic?

```js
app.get("/rocks/:index", (req, res) => {
  const { index } = req.params;
  if (rocks[index]) {
    res.send(rocks[index]);
  } else {
    res.send("Cannot find any rocks at this index: " + index);
  }
});
```

http://localhost:3333/rocks/777

or

http://localhost:3333/rocks/not_a_valid_index_position

## Place routes in the correct order

- What is a static route?
- What is a dynamic route?

First, demonstrate what happens when the dynamic route comes first:

```javascript
app.get("/rocks/:index", (req, res) => {
  // :index can be anything, even awesome
  res.send(rocks[req.params.index]);
});

app.get("/rocks/awesome", (req, res) => {
  //this will never be reached
  res.send(`
 <h1>Rocks are awesome!</h1>
 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Bismuth_crystal_macro.jpg/800px-Bismuth_crystal_macro.jpg" >
 `);
});
```

Now, reorder them so that more specific routes come before less specific routes (those with params in them):

```javascript
app.get("/rocks/awesome", (req, res) => {
  res.send(`
 <h1> Rocks are awesome!</h1>
 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Pyrite_-_Huanzala_mine%2C_Huallanca%2C_Bolognesi%2C_Ancash%2C_Peru.jpg/260px-Pyrite_-_Huanzala_mine%2C_Huallanca%2C_Bolognesi%2C_Ancash%2C_Peru.jpg" >
 `);
});

app.get("/rocks/:index", (req, res) => {
  const { index } = req.params;
  if (rocks[index]) {
    res.send(rocks[index]);
  } else {
    res.send("Cannot find anything at this index: " + index);
  }
});
```

## Multiple Parameters

You can add more parameters to the `req.params` object:

```js
app.get("/question/:firstName/:lastName", (req, res) => {
  console.log(req.params);
  const { firstName, lastName } = req.params;
  res.send(`${firstName} ${lastName} asks if there is life on Mars?`);
});
```

http://localhost:3333/question/David/Bowie

- Try other first names and last names
- Can you have special characters like `.` or a space?

## Query Strings

Another way to get values from the URL is with query strings.

Query strings go at the end of a path and start with a `?`. They are key-value pairs with the syntax of `value=100`.

You can add as many as you like by separating them with an ampersand `&`.

```js
app.get("/calculator/:operator", (req, res) => {
  console.log("This is req.params", req.params);
  console.log("This is req.query", req.query);
  const sum = req.query.num1 + req.query.num2;
  res.send("sum is " + sum);
});
```

http://localhost:3333/calculator/add?num1=5&num2=4

Remember, incoming requests always come in as strings.

```js
app.get("/calculator/:operator", (req, res) => {
  const { num1, num2 } = req.query;
  const sum = Number(num1) + Number(num2);
  res.send("sum is " + sum);
});
```

Add a bit more logic.

```js
app.get("/calculator/:operator", (req, res) => {
  const { num1, num2 } = req.query;
  let sum = 0;
  if (req.params.operator === "add") {
    sum = Number(num1) + Number(num2);
  }
  res.send(sum);
});
```

- Why did you get an error with the response?
- How can you correct the error?

```js
app.get("/calculator/:operator", (req, res) => {
  const { num1, num2 } = req.query;
  let sum = 0;
  if (req.params.operator === "add") {
    sum = Number(num1) + Number(num2);
  }
  res.send("" + sum);
});
```

**Bonus**

Can you figure out how to add the functionality of `subtract`, `multiple`, and `divide`?
