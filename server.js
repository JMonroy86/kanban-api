const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const passport = require("passport");
require("dotenv").config();

const BearerStrategy = require("passport-http-bearer");


const app = express();

app.use(morgan("dev"));

const bearerStrategy = new BearerStrategy((token, done) => {
  // Send user info using the second argument
  done(null, {}, token);
});

app.use(passport.initialize());
passport.use(bearerStrategy);

app.use(bodyParser.json());

const db = require("./app/models");

db.sequelize.sync()

var allowedDomains = [
  "https://kanbanboard-app.azurewebsites.net/",
  "http://localhost:3000",
];
app.use(
  cors({
    origin: function (origin, callback) {
      // bypass the requests with no origin (like curl requests, mobile apps, etc )
      if (!origin) return callback(null, true);

      if (allowedDomains.indexOf(origin) === -1) {
        var msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Kanban Board API." });
});

require("./app/routes/index")(app);
// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
