const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const app = express();
const routes = require("./public/scripts/routes.js");
const port = 3000;

require("dotenv").config();

const sessionConfig = {
  secret: process.env.cookieSecret,
  name: "movieinfo",
  resave: false,
  saveUninitialized: false,
  cookie: {
    sameSite: "Lax"
  }
}

app.set("trusty proxy", 1);
sessionConfig.cookie.secure = true;

app.use(session(sessionConfig));
app.use(express.static(process.cwd() + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set("view engine", "pug");

routes(app);

app.listen(port, (err) => {
  if (err) {
    console.error("Error in server setup")
  }
  console.log(`Server is active on port ${port}`)
})
