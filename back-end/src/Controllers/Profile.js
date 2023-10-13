const { sequelize, User } = require("../models");
const AppError = require("../Middleware/error");

exports.editProfile = async (req, res, next) => {
  const { age } = req.body;
  try{
    User.create(req.user.age = age);
    
  }catch(err){
    next()
  }
};
