//Dependencies
require('dotenv').config()
const express = require("express");
const cors = require("cors");


// Port
const PORT = process.env.PORT;

// Initiate
const app = express();


// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
    res.json({ message: `App is running on ${PORT}` });
});
require("./src/Routers")(app);

//Sync Sequelize
const db = require("./src/Models");
db.sequelize.sync({ force: true }).then(() => {
    console.log("Database dropped and re-sync successfully.");
});



app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}.`);
});