const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors')
const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors())

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Express API." });
});

require("./app/routes/customer.routes.js")(app);
require("./app/routes/auth.routes.js")(app);

// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});