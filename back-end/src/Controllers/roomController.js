const AppError = require("../Middleware/error");
const { sequelize, Join, Room, User, Field, Create } = require("../models");
const cloudinary = require("../utility/cloudinary");
const { Op, where } = require("sequelize");
const fs = require("fs");

// -----------Get Matchday-----------------
exports.getMatchday = async (req, res, next) => {
  try {
    const fideUserJoin = await Join.findAll({
      where: { user_id: req.user.id },

      attributes: [
        "room_id",
        "join_status",
        [sequelize.fn("COUNT", sequelize.col("Join.user_id")), "sumUser"],
      ],
      group: ["room_id", "join_status"],
      include: [
        {
          model: Room,
          include: [
            { model: Field },
            {
              model: Create,
            },
          ],
        },
      ],
    });

    if (fideUserJoin[0]) {
      res.json({ matchDay: fideUserJoin });
    } else {
      res.json({ msg: "not found" });
    }
  } catch (err) {
    res.json({ msg: err });
  }
};

// ----------Host Join-----------------
exports.createHostJoin = async (req, res, next) => {
  try {
    const createJoin = {};
    const hostData = {};

    createJoin.join_status = "host";
    createJoin.user_id = req.user.id;
    createJoin.room_id = req.getRoom.id;
    const joined = await Join.create(createJoin);

    hostData.joined = joined;
    hostData.room = req.getRoom;

    res.json({ msg: hostData });
  } catch (err) {
    res.json({ msg: err });
  }
};

// ----------Player join--------------
exports.joined = async (req, res, next) => {
  try {
    const { roomId } = req.body;
    const joinRoom = {};

    joinRoom.join_status = "Joined";
    joinRoom.user_id = req.user.id;
    joinRoom.room_id = roomId;

    const joined = await Join.create(joinRoom);

    res.json({ msg: joined });
  } catch (err) {
    res.json({ msg: err });
  }
};

// ----------find room---------
exports.searchRoom = async (req, res, next) => {
  try {
    const { fieldName, date, time } = req.body;
    if (fieldName && date && time) {
      const search = await Join.findAll({
        attributes: [
          "room_id",

          [sequelize.fn("COUNT", sequelize.col("Join.room_id")), "sumUser"],
        ],
        group: ["room_id"],
        include: [
          {
            model: Room,
            include: [
              { model: Field, where: { field_name: fieldName } },
              {
                model: Create,
                where: { [Op.and]: [{ date: date }, { time: time }] },
              },
            ],
          },
        ],
      });
      const searchResult = search.filter((item) => item.Room !== null);
      res.json({ msg: "found", room: searchResult });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    next();
  }
};
// --------------Fetch allroom , not found room -----------------
exports.allRoom = async (req, res, next) => {
  try {
    const checkUser = await Join.findAll({
      where: {
        user_id: req.user.id,
      },
      attributes: ["room_id"],
    });
    const check = await Join.findAll({
      attributes: [
        "room_id",

        [sequelize.fn("COUNT", sequelize.col("Join.room_id")), "sumUser"],
      ],
      group: ["room_id"],
      include: [
        {
          model: Room,
          include: [
            { model: Field },
            {
              model: Create,
            },
          ],
        },
      ],
    });

    const userJoinRoom = checkUser.map((item) => item.room_id);
    const finduserNotJoin = check.filter(
      (element) => !userJoinRoom.includes(element.room_id)
    );

    res.json({ msg: "Not found", room: finduserNotJoin });
  } catch (err) {
    next(err);
  }
};

exports.joinRoom = async (req, res, next) => {
  try {
    const { roomId } = req.body;
    const join = await Join.findAll({
      where: { room_id: roomId },
      attributes: [
        "join_status",
        "user_id",

        [sequelize.fn("COUNT", sequelize.col("Join.user_id")), "sumUser"],
      ],
      group: ["join_status", "user_id"],

      include: [
        { model: User },
        {
          model: Room,
          include: [
            { model: Field, attributes: ["fieldName"] },
            { model: Create, attributes: ["date"] },
          ],
        },
      ],
    });
    res.json({ userInRoom: join });
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = req.params["id"];
    const roomId = req.params["room"];
    const userDelete = await Join.destroy({
      where: {
        user_id: user,
        room_id: roomId,
      },
    });
    res.json({ msg: userDelete });
  } catch (err) {
    next(err);
  }
};

exports.deleteRoom = async (req, res, next) => {
  try {
    const roomId = req.params["room"];
    const userDelete = await Join.destroy({
      where: {
        room_id: roomId,
      },
      include: [{ model: Room }],
    });
    const deleyeRoom = await Room.destroy({
      where: {
        id: roomId,
      },
    });
    res.json({ msg: "success" });
  } catch (err) {
    next(err);
  }
};
