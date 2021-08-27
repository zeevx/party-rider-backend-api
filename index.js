//Dependencies
require('dotenv').config()
const express = require("express");
const cors = require("cors");


// Port
const PORT = process.env.PORT;

//Initiate
const app = express();


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.json({ message: "App is running on http://localhost:" + PORT + " now"});
});



app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}.`);
});
