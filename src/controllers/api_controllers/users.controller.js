const { Op } = require("sequelize");
const Users = require("../../models/users.model");
const Posts = require("../../models/posts.model");
const Comments = require("../../models/comments.model");
const Follows = require("../../models/follows.model");
const Likes = require("../../models/likes.model");

const getAllUsers = async (req, res) => {
  try {
    let users = await Users.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    users = users.map((u) => u.dataValues);
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({message: `ERROR: ${error.stack}`});
  }
};

const getUserByUsername = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { username: req.params.username },
      attributes: {
        exclude: ["password"],
      },
    });
    res.status(200).json(user.dataValues);
  } catch (error) {
    res.status(400).json({message: `ERROR: ${error.stack}`});
  }
};

const createUser = async (data) => {
  try {
    const user = await Users.create(req.body.data);
    res.status(201).json({message: 'User created.', data: user.dataValues});
  } catch (error) {
    res.status(400).json({message: `ERROR: ${error.stack}`});
  }
};

const updateUser = async (req, res) => {
  try {
    await Users.update(
      {
        email: req.body.email,
        profile_name: req.body.profile_name,
        profile_picture: req.body.profile_picture,
      },
      {
        where: { username: req.body.username },
      }
    );
    res.status(200).json({message: 'User updated.'});
  } catch (error) {
    res.status(400).json({message: `ERROR: ${error.stack}`});
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { username: req.body.username },
      attributes: {
        exclude: ["password"],
      },
    });
    const id = user.dataValues.user_id;
    const postRef = await Posts.findAll({where: {user_id: id}});
    const user_posts = postRef.map(p => p.dataValues.post_id);
    await Likes.destroy({where: {user_id: id}});
    await Follows.destroy({where: {following_user_id: id}});
    await Follows.destroy({where: {followed_user_id: id}});
    await Comments.destroy({where: {user_id: id}});
    await Comments.destroy({where: {post_id: {[Op.or]: user_posts}}});
    await Posts.destroy({where: {user_id: id}});
    await Users.destroy({where: {username: username}});
    res.status(200).json({message: 'User deleted.'});
  } catch (error) {
    res.status(400).json({message: `ERROR: ${error.stack}`});
  }
};

const controllers = {
  getAllUsers,
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser
};

module.exports = controllers;
