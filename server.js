// Setup empty JS object to act as endpoint for all routes
projectData = {};

//import express
const express = require("express");
const port = 5000;

// Start up an instance of app
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

//middleware
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

//routes
// Initialize all route with a callback function

// Callback function to complete GET '/all'
app.get("/all", (req, res) => {
  res.json(projectData);
});
// Post Route
app.post("/postData", (req, res) => {
  projectData = {
    date: req.body.date,
    temp: req.body.temperature,
    content: req.body.content,
  };
  res.send(projectData);
});
//server is listening
app.listen(port, console.log(`server is listening at ${port}`));
