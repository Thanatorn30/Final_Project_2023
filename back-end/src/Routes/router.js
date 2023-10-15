const express = require("express");
const router = express.Router();
const auth = require("../Controllers/authController");
const profile = require("../Controllers/Profile");
const userController = require("../Controllers/userController");
const upload = require("../Middleware/upload");
const matchContrl = require("../Controllers/matchControler");
const roomController = require("../Controllers/roomController");
const voteController = require("../Controllers/voteController");
// -------POST -------------
router.post("/register", auth.register);
router.post("/login", auth.login);
router.post("/authen", auth.authen);

// ---------GET User---------------------
router.get("/me", auth.authen, auth.me);

// ----------Update User-----------------
router.patch(
  "/update",
  auth.authen,
  upload.single("profileImage"),
  userController.updateUser
);

// ---------Create field -------------
router.post(
  "/createfield/admin",
  auth.authen,
  matchContrl.getField,
  upload.single("imageField"),
  matchContrl.createField
);

// ------------GET field--------------
router.get("/fields", auth.authen, matchContrl.getField, matchContrl.Fields);

// ------------UPDATE field ---------
router.patch(
  "/field/update",
  auth.authen,
  upload.single("imageField"),
  matchContrl.getField,
  matchContrl.updateRoom
);

// -------- Create Match------
router.post(
  "/create/match",
  auth.authen,
  upload.single("imageField"),
  matchContrl.createMatch,
  matchContrl.createRoom,
  roomController.createHostJoin
);

// ----------Delete Match --------
router.delete(
  "/field/delete/:id",
  auth.authen,
  matchContrl.getField,
  matchContrl.deleteField
);

// ---------Get Match Day -------
router.get("/user/matchday", auth.authen, roomController.getMatchday);

// ----------Get room-----------
router.post(
  "/search/room",
  auth.authen,
  roomController.searchRoom,
  roomController.allRoom
);

// --------user in Join Room------------
router.post("/user/joinroom", auth.authen, roomController.joinRoom);

// ------ join --------------------
router.post("/join", auth.authen, roomController.joined);

// ------Delete user joined---------
router.delete(
  "/delete/join/:id/roomId/:room",
  auth.authen,
  roomController.deleteUser
);

// ------Delete Room---------
router.delete("/delete/roomId/:room", auth.authen, roomController.deleteRoom);

// -------Get User Data------
router.get("/getuser/:id", auth.authen, userController.getUserData);

// Comment

// ----Create Comment-------
router.post(
  "/comment/user/:id",
  auth.authen,
  userController.userComment,
  userController.createPost
);

//-----Get Comment by user id---------
router.get("/comments/:id", auth.authen, userController.fetchComment);

//------GET comment to edit by post id ----------
router.get("/get/title/comment/:id", auth.authen, userController.fetchPost);

//----Edit post-----------
router.patch(
  "/edit/post/:id",
  auth.authen,
  userController.editPost,
  userController.updateDate
);

// ----Delete post-------
router.delete(
  "/delete/post/:id",
  auth.authen,
  userController.deletePost,
  userController.deleteUserPost
);

// -----------Vote---------
// ------Create vote----------
router.post(
  "/user/getvote/:id",
  auth.authen,
  voteController.createVote,
  voteController.getSumPoint
);

// -------Get sum vote any user--------
router.get(
  "/user/votescore/:id",
  auth.authen,
  voteController.sumVote,
  voteController.getSumVote
);

// ------Get sum vote user-----------
router.get(
  "/user/votescore",
  auth.authen,
  voteController.sumVoteUser,
  voteController.getSumVoteUser
);

// -----Update user level-------------
router.patch("/user/level", auth.authen, voteController.updateUserLevel);

module.exports = router;
