const AppError = require("../Middleware/error");
const {
  sequelize,
  Join,
  Room,
  User,
  Field,
  Create,
  Vote,
} = require("../models");
const cloudinary = require("../utility/cloudinary");
const { Op, where } = require("sequelize");
const fs = require("fs");

exports.createVote = async (req, res, next) => {
  try {
    const { getjoin, sportmanship, moody, punctual } = req.body;
    const userReciveVote = req.params["id"];
    const createVote = {};
    const checkVote = await Vote.findAll({
      where: {
        [Op.and]: [{ user_id: req.user.id }, { user_get_vote: userReciveVote }],
      },
    });

    createVote.getjoin = getjoin;
    createVote.sportmanship = sportmanship;
    createVote.moody = moody;
    createVote.punctual = punctual;
    createVote.userGetVote = userReciveVote;
    createVote.user_id = req.user.id;
    const result = await Vote.create(createVote);
    req.userGetvoteId = userReciveVote;
    next();
  } catch (err) {
    next(err);
  }
};
// -----------------------------get sum vote after voted--------------********
exports.getSumPoint = async (req, res, next) => {
  const sumVote = await Vote.findAll({
    where: { user_get_vote: req.userGetvoteId },
    attributes: [
      [sequelize.fn("COUNT", sequelize.col("user_get_vote")), "sumVote"],
    ],
  });
  res.json({ sumResult: sumVote });
};

// ---------------------------------------------------------------------

exports.sumVote = async (req, res, next) => {
  try {
    const userId = req.params["id"];

    const sumVote = await Vote.findAll({
      where: { user_get_vote: userId },
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("user_get_vote")), "sumVote"],
        [sequelize.fn("sum", sequelize.col("getjoin")), "sumJoin"],
        [sequelize.fn("sum", sequelize.col("sportmanship")), "sumSportmanship"],
        [sequelize.fn("sum", sequelize.col("moody")), "sumMoody"],
        [sequelize.fn("sum", sequelize.col("punctual")), "sumPunctual"],
      ],
    });
    req.sumVote = sumVote;
    next();
  } catch (err) {
    next(err);
  }
};

exports.getSumVote = async (req, res, next) => {
  res.json({ result: req.sumVote });
};

exports.sumVoteUser = async (req, res, next) => {
  try {
    const sumVote = await Vote.findAll({
      where: { user_get_vote: req.user.id },
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("user_get_vote")), "sumVote"],
        [sequelize.fn("sum", sequelize.col("getjoin")), "sumJoin"],
        [sequelize.fn("sum", sequelize.col("sportmanship")), "sumSportmanship"],
        [sequelize.fn("sum", sequelize.col("moody")), "sumMoody"],
        [sequelize.fn("sum", sequelize.col("punctual")), "sumPunctual"],
      ],
    });
    req.sumVote = sumVote;
    next();
  } catch (err) {
    next(err);
  }
};

exports.getSumVoteUser = async (req, res, next) => {
  res.json({ result: req.sumVote });
};

// ----------Update Level in User table--------
exports.updateUserLevel = async (req, res, next) => {
  try {
    const { userId, sumVote } = req.body;
    const updateLevel = await User.update(
      { level: sumVote },
      {
        where: { id: userId },
      }
    );

    res.json({ msg: "update success" });
  } catch (err) {
    next(err);
  }
};
