const Follows = require("../../models/follows.model");

const getFollowingByUser = async (req, res) => {
  try {
    const following = await Follows.findAll({
      where: { following_user_id: req.body.user_id },
    });
    following = following.map((f) => f.dataValues);
    res.status(200).json({ following });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const getFollowersByUser = async (req, res) => {
  try {
    const followers = await Follows.findAll({
      where: { followed_user_id: req.body.user_id },
    });
    followers = followers.map((f) => f.dataValues);
    res.status(200).json({ followers });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const createFollow = async (req, res) => {
  try {
    const follow = await Follows.create({
      following_user_id: req.body.following_user_id,
      followed_user_id: req.body.followed_user_id,
    });
    res.status(201).json({ message: "Follow created.", data: follow });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const deleteFollow = async (req, res) => {
  try {
    await Follows.destroy({where: {
      following_user_id: req.body.following_user_id,
      followed_user_id: req.body.followed_user_id,
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
