const Likes = require("../../models/likes.model");
const Users = require("../../models/users.model");

const getLikesByUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { username: req.params.username },
      attributes: {
        exclude: ["password"],
      },
    });
    let likes = await Likes.findAll({
      where: { user_id: user.dataValues.user_id },
    });
    likes = likes.map((l) => l.dataValues);
    res.status(200).json(likes);
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const getLikesByPost = async (req, res) => {
  try {
    let likes = await Likes.findAll({ where: { post_id: req.params.postId } });
    likes = likes.map((l) => l.dataValues);
    res.status(200).json(likes);
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const createLike = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { username: req.query.username },
      attributes: {
        exclude: ["password"],
      },
    });
    const like = await Likes.create({
      user_id: user.dataValues.user_id,
      post_id: req.query.postId,
    });
    res.status(201).json({ message: "Like created.", data: like });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const deleteLike = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { username: req.query.username },
      attributes: {
        exclude: ["password"],
      },
    });
    await Likes.destroy({
      where: { user_id: user.dataValues.user_id, post_id: req.query.postId },
    });
    res.status(200).json({message: 'Like deleted.'});
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const controllers = {
    getLikesByUser,
    getLikesByPost,
    createLike,
    deleteLike
};

module.exports = controllers;
