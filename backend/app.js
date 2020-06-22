const {
  home
} = require("./routes/pages/home");
const {
  login
} = require("./routes/forms/login");
const {
  register
} = require("./routes/forms/register");
const {
  hbs
} = require("./config/handlebar");
const {
  redisConfig
} = require("./config/redis");
const {
  account
} = require("./routes/pages/account");
const {
  error404
} = require("./routes/errors/404");
const {
  checkName,
  checkUser
} = require("./routes/sql//sqlAccountCheck");
const {
  sqlCommentCreate,
  sqlCommentRead,
  sqlCommentUpdate,
  sqlCommentDelete
} = require("./routes/sql/sqlCommentCrud");


const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
//To allow external browser.
const cors = require("cors");
//Will use a cookie to keep tract of the user's id in order to retrieve infos related to him.

const session = require("express-session");
app.use(express.static("./public_html"));
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(cors());
//app.set("view", path.join(__dirname, " / views ")); //Cette ligne ne sert a rien ca marche pas et c'est bien ca le pb
app.engine(
  ".hbs",
  hbs.engine
);
app.set('view engine', ".hbs");
app.use(session(redisConfig));
app.use(checkName);
app.use(checkUser);
app.use(home);
app.use(register);
app.use(login);
app.use(account);
app.use(sqlCommentCreate);
app.use(sqlCommentRead);
app.use(sqlCommentUpdate);
app.use(sqlCommentDelete);
app.use(error404)


app.listen("3000", () => {
  console.log("server started on port 3000");
});