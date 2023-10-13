const { sequelize, User,Create,Room } = require("./models");

const express = require("express");
const cors = require("cors");
const app = express();

const router = require('./Routes/router')


// 

// sequelize.sync({alter:true})


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/',router)

app.get("/test", function (req, res, next) {
  res.json({ msg: "api ok" });
});

app.listen(3333, function () {
  console.log("Port 3333 is running");
});
