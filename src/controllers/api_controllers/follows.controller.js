const Follows = require("../../models/follows.model");
const Users = require("../../models/users.model");

const getFollowingByUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { username: req.params.username },
      attributes: {
        exclude: ["password"],
      },
    });
    let following = await Follows.findAll({
      where: { following_user_id: user.dataValues.user_id },
    });
    following = following.map((f) => f.dataValues);
    res.status(200).json(following);
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const getFollowersByUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { username: req.params.username },
      attributes: {
        exclude: ["password"],
      },
    });
    let followers = await Follows.findAll({
      where: { followed_user_id: user.dataValues.user_id },
    });
    followers = followers.map((f) => f.dataValues);
    res.status(200).json(followers);
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const createFollow = async (req, res) => {
  try {
    const following_user = await Users.findOne({
      where: { username: req.query.followingUser },
      attributes: {
        exclude: ["password"],
      },
    });
    const followed_user = await Users.findOne({
      where: { username: req.query.followedUser },
      attributes: {
        exclude: ["password"],
      },
    });
    const follow = await Follows.create({
      following_user_id: following_user.dataValues.user_id,
      followed_user_id: followed_user.dataValues.user_id,
    });
    res.status(201).json({ message: "Follow created.", data: follow });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const deleteFollow = async (req, res) => {
  try {
    const following_user = await Users.findOne({
      where: { username: req.query.followingUser },
      attributes: {
        exclude: ["password"],
      },
    });
    const followed_user = await Users.findOne({
      where: { username: req.query.followedUser },
      attributes: {
        exclude: ["password"],
      },
    });
    await Follows.destroy({where: {
      following_user_id: following_user.dataValues.user_id,
      followed_user_id: followed_user.dataValues.user_id,
    }})
    res.status(200).json({message: 'Follow deleted.'});
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const controllers = {
    getFollowingByUser,
    getFollowersByUser,
    createFollow,
    deleteFollow
};

module.exports = controllers;
