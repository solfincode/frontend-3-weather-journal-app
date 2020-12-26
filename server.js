// Setup empty JS object to act as endpoint for all routes
projectData = {};
require("dotenv").config();
//import express
const express = require("express");
const port = 5000;
const fetch = require("node-fetch");

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

//env variables
const BASE_URL = process.env.BASE_URL;
const API_KEY = process.env.API_KEY;

//routes
// Initialize all route with a callback function
// Callback function to complete GET '/all'
app.get("/all", async (req, res) => {
  try {
    let zip = projectData.zip;
    let fetchData = await fetch(
      `${BASE_URL}${zip},us&appid=${API_KEY}`
    ).then((res) => res.json());
    res.send(fetchData);
  } catch (err) {
    console.log(err);
  }
});

// Post Route
app.post("/postData", (req, res) => {
  projectData = {
    date: req.body.date,
    content: req.body.content,
    zip: req.body.zip,
  };
});
//server is listening
app.listen(port, console.log(`server is listening at ${port}`));
