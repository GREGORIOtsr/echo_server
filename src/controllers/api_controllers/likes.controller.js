const Likes = require("../../models/likes.model");

const getLikesByUser = async (req, res) => {
  try {
    const likes = await Likes.findAll({
      where: { username: req.body.user_id },
    });
    likes = likes.map((l) => l.dataValues);
    res.status(200).json({ likes });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const getLikesByPost = async (req, res) => {
  try {
    const likes = await Likes.findAll({ where: { post_id: req.body.post_id } });
    likes = likes.map((l) => l.dataValues);
    res.status(200).json({ likes });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const createLike = async (req, res) => {
  try {
    const like = await Likes.create({
      user_id: req.body.user_id,
      post_id: req.body.post_id,
    });
    res.status(201).json({ message: "Like created.", data: like });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const deleteLike = async (req, res) => {
  try {
    await Likes.destroy({
      where: { user_id: req.body.user_id, post_id: req.body.post_id },
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
