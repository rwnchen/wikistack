const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const layout = require("./views/layout.js");
const Sequelize = require("sequelize");
const user = require("./routes/user");
const wiki = require("./routes/wiki");
const { db, Page, User } = require("./models");

const app = express();
const PORT = 7879;

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.use(morgan("dev"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/wiki', wiki);

app.get("/", (req, res, next) => {
  res.redirect('/wiki');
});

const init = async () => {
  await db.sync({ force: true });

  app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });
};

init();
