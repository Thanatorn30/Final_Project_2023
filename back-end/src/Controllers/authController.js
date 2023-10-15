const { sequelize, User } = require("../models");
const AppError = require("../Middleware/error");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "ballondor";
const cloudinary = require("../utility/cloudinary");
const fs = require("fs");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const validatEmail = validator.isEmail(email);
    const saltRounds = 10;
    const adminpassword = "Admin@123";

    if (!name) {
      throw new AppError("Name is require", 400);
    }

    if (!email || email === "admin@gmail") {
      throw new AppError("Email is require", 400);
    }
    if (!validatEmail) {
      throw new AppError("Is not Email", 400);
    }

    if (!password) {
      throw new AppError("Password is require", 400);
    }

    const user = await User.findAll({ where: { email: email } });
    if (!user[0]) {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        const data = { name, email, password: hash };
        User.create(data);
        res.status(200).json({ message: "Post success" });
      });
    } else {
      res.status(200).json({ message: "This email is register" });
    }
  } catch (error) {
    console.log(error);
    next();
  }
};

// ------------------LOGIN---------------------------

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email) {
      res.send("Please insert Email");
      throw new AppError("Please insert Email", 404);
    }
    if (!password) {
      res.send("Please insert Password");
      throw new AppError("Please insert Password", 404);
    }

    const user = await User.findAll({ where: { email: email } });

    if (!user[0]) {
      res.send("Email is invalid");
      throw new AppError("Email is invalid", 404);
    }
    const correct = await bcrypt.compare(password, user[0].password);
    if (!correct) {
      res.send("Password is invalid");
      throw new AppError("Password is invalid", 404);
    }

    const token = jwt.sign({ email: user[0].email }, secretKey, {
      expiresIn: "1d",
    });
    res.status(200).json({ token: token, user: user[0] });
  } catch (err) {
    console.log(err);
    next();
  }
};

// ------------------AUTHEN---------------------------
exports.authen = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      throw new AppError("fail", 404);
    }
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findOne({
      where: { email: decoded.email },
      attributes: { exclude: "password" },
    });
    req.user = user;
    next();
  } catch (err) {
    res.json({ status: err.message });
    next();
  }
};

// -----------------User info----------------------------
exports.me = (req, res) => {
  res.json({ user: req.user });
};
