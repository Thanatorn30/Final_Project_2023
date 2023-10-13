const AppError = require("../Middleware/error");
const { sequelize, Room, User, Field, Create, Join } = require("../models");
const cloudinary = require("../utility/cloudinary");
const { Op } = require("sequelize");
const fs = require("fs");
const { fields } = require("../Middleware/upload");

// -----------Create Field-----------
exports.createField = async (req, res, next) => {
  try {
    const { email } = req.user;
    const { fieldName, map, userId } = req.body;
    const create = {};
    const check = await Field.findAll({
      where: {
        [Op.and]: [{ map: map }, { field_name: fieldName }],
      },
    });
    const admin = await User.findAll({
      where: { email: "admin@gmail.com" },
      attributes: { exclude: "password" },
    });

    if (!req.file) {
      throw new AppError("Please insert filed image", 500);
    }
    if (!fieldName) {
      throw new AppError("Please insert filed name", 500);
    }
    if (!map) {
      throw new AppError("Please insert map", 500);
    }
    if (check[0]) {
      res.json({ msg: "Field have already" });
      throw new AppError("Field have already", 500);
    }
    if (email !== admin[0].email) {
      res.json({ msg: "This account can not create field" });
      throw new AppError("This account can not create field", 500);
    }

    if (req.file) {
      const secureUrl = await cloudinary.upload(
        req.file.path,
        req.field[0].imageField
          ? cloudinary.getPublicId(req.field[0].imageField)
          : undefined
      );

      create.imageField = secureUrl;
      fs.unlinkSync(req.file.path);
    }

    create.fieldName = fieldName;
    create.map = map;
    create.user_id = req.user.id;
    await Field.create(create);
    req.field = create;
    res.json({ msg: "Create Success" });
  } catch (err) {
    console.log(err);
  }
};

// ------------Get Filed--------------
exports.getField = async (req, res, next) => {
  try {
    const { email } = req.user;

    const check = await User.findAll({
      where: { email: email },
      attributes: { exclude: "password" },
    });
    if (email !== check[0].email) {
      res.json({ msg: "This account can not find field" });
      throw new AppError("This account can not find field", 500);
    }
    const fields = await Field.findAll();
    req.field = fields;
    next();
    // res.json({ field: fields });
  } catch (err) {
    next();
  }
};

exports.Fields = async (req, res, next) => {
  res.json({ field: req.field });
};

// -----------Update Field------------

exports.updateRoom = async (req, res, next) => {
  const { fieldName, map, id } = req.body;
  const check = await Field.findAll({ where: { id: id } });
  if (!check[0]) {
    throw new AppError("Can not update field", 500);
  }
  const update = {};
  if (fieldName) {
    update.fieldName = fieldName;
  }
  if (map) {
    update.map = map;
  }
  if (req.file) {
    const secureUrl = await cloudinary.upload(
      req.file.path,
      req.field[0].imageField
        ? cloudinary.getPublicId(req.field[0].imageField)
        : undefined
    );
    update.imageField = secureUrl;
    fs.unlinkSync(req.file.path);
  }

  await Field.update(update, { where: { id: check[0].id } });
  res.json({ msg: "Update Success" });
};

// --------Create Room-----------------
exports.createMatch = async (req, res, next) => {
  try {
    const { date, time, hours } = req.body;
    const check = await Create.findAll({
      where: {
        [Op.and]: [{ user_id: req.user.id }, { date: date }],
      },
    });
    if (check[0]) {
      res.json({ msg: "This account has created a room." });
      throw new AppError("This account has created a room.", 500);
    }
    const createData = {};
    createData.user_id = req.user.id;
    createData.date = date;
    createData.time = time;
    createData.hours = hours;
    const create = await Create.create(createData);
    req.create = create;
    next();
  } catch (err) {
    next(err);
  }
};

exports.createRoom = async (req, res, next) => {
  try {
    const { 
      // myTeam,
       maxPlayer, date, fieldId } = req.body;
    const createRoomData = {};
    const hostData = {};

    const fieldIdCheck = await Field.findAll({ where: { id: fieldId } });
    createRoomData.user_create_id = req.create.id;
    if (fieldIdCheck[0]) {
      createRoomData.field_id = fieldId;
    }
    createRoomData.date = date;
    createRoomData.myTeam = '1';
    createRoomData.maxPlayer = maxPlayer;

    const roomCreate = await Room.create(createRoomData);

    req.getRoom = roomCreate;
    next()
    // res.json({ msg: roomCreate });
    // next();
  } catch (err) {
    res.json({ msg: err });
  }
};

// ------------Get room --------------
exports.getRoom = async (req, res, next) => {
  try {
    res.json({ msg: req.getRoom });
  } catch (err) {
    res.json({ msg: err });
  }
};

// ---------------Delete field ------------------

exports.deleteField = async (req, res, next) => {
  try {
    const target = req.params["id"];
    const check = await Field.findAll({
      include: [{ model: Room, where: { field_id: target } }],
    });

    if (check[0]) {
      res.json({ msg: "Can not delete" });
    } else {
      await Field.destroy({ where: { id: target } });
      res.json({ msg: "Delete success" });
    }
    
  } catch (err) {
    console.log(err);
    // throw new AppError("Error", 500);
  }
};
