const { sequelize, User, UserPost, Post } = require("../models");
const express = require("express");
const fs = require("fs");
const cloudinary = require("../utility/cloudinary");

exports.updateUser = async (req, res, next) => {
  const { name, age, position } = req.body;
  try {
    const update = {};

    if (name) {
      update.name = name;
    }
    if (age) {
      update.age = age;
    }
    if (position) {
      update.position = position;
    }

    if (req.file) {
      const secureUrl = await cloudinary.upload(
        req.file.path,
        req.user.profileImage
          ? cloudinary.getPublicId(req.user.profileImage)
          : undefined
      );
      update.profileImage = secureUrl;
      fs.unlinkSync(req.file.path);
    }
    await User.update(update, { where: { id: req.user.id } });
    await req.user.reload();
    res.json({ user: req.user });
  } catch (err) {
    next(err);
  }
};

exports.getUserData = async (req, res, next) => {
  try {
    const roomId = req.params["id"];
    const findUser = await User.findAll({
      where: { id: roomId },
    });
    res.json({ userData: findUser });
  } catch (err) {
    next(err);
  }
};

exports.userComment = async (req, res, next) => {
  try {
    const { date } = req.body;
    const userPost = await UserPost.create({
      user_id: req.user.id,
      date: date,
    });
    req.userPost = userPost;
    next();
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const userGetPost = req.params["id"];
    const { title } = req.body;
    const comment = {};
    if (!title) {
      res.json({ msg: "Plese insert comment" });
    } else {
      comment.title = title;
      comment.user_id = userGetPost;
      comment.user_post_id = req.userPost.id;

      const postComment = await Post.create(comment);

      res.json({ msg: `create success` });
    }
  } catch (err) {
    next(err);
  }
};

exports.fetchComment = async (req, res, next) => {
  try {
    const userGetPost = req.params["id"];
    const result = await Post.findAll({
      where: { user_id: userGetPost },
      include: [
        {
          model: UserPost,
          include: [{ model: User }],
        },
      ],
    });
    res.json({ result: result });
  } catch (err) {
    next(err);
  }
};

exports.fetchPost = async (req, res, next) => {
  try {
    const postId = req.params["id"];
    const result = await Post.findAll({
      where: {
        id: postId,
      },
    });
    res.json({ result: result });
  } catch (err) {
    next(err);
  }
};

exports.editPost = async (req, res, next) => {
  try {
    const { editTitle } = req.body;
    const postId = req.params["id"];
    const findPostEdit = await Post.findAll({
      where: { id: postId },
    });
    if (findPostEdit[0]) {
      await Post.update({ title: editTitle }, { where: { id: postId } });
      req.findPostEdit = findPostEdit;
      next();
      // res.json({ result: "edit success" });
    } else {
      res.json({ result: "edit fail" });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateDate = async (req, res, next) => {
  const { date } = req.body;
  await UserPost.update(
    { date: date },
    { where: { id: req.findPostEdit[0].user_post_id } }
  );
  // const findDateEdit = await UserPost.findAll({where:{id:req.findPostEdit[0].user_post_id}})

  res.json({ result: "Edit Success" });
};

exports.deletePost = async (req, res, next) => {
  try {
    const postId = req.params["id"];

    const result = await Post.findAll({
      where: {
        id: postId,
      },
      attributes: ["id", "user_post_id"],
    });

    req.postDelete = result
    next()
  } catch (err) {
    next(err);
  }
};

exports.deleteUserPost = async (req,res,next) => {
  try{
    const deletePost = await Post.destroy({
      where:{id:req.postDelete[0].id}
    })
    const deleteUserPost = await UserPost.destroy({
      where:{id:req.postDelete[0].user_post_id}
    })
    res.json({result:'delete success'})
  }
  catch(err) {
    next(err)
  }
}
