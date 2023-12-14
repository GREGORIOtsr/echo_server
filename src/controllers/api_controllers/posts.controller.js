const Posts = require("../../models/posts.model");
const Comments = require("../../models/comments.model");
const Likes = require("../../models/likes.model");

const getAllPosts = async (req, res) => {
  try {
    const posts = await Posts.findAll();
    posts = posts.map((p) => p.dataValues);
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const getPostsByUser = async (req, res) => {
  try {
    const posts = await Posts.findAll({
      where: { user_id: req.body.user_id },
    });
    posts = posts.map((p) => p.dataValues);
    res.status(200).json(posts);
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const createPost = async (req, res) => {
  try {
    const data = {
      user_id: req.body.user_id,
      body: req.body.body,
    };
    const post = await Posts.create(data);
    res.status(201).json({ message: "Post created.", data: post });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const updatePost = async (req, res) => {
  try {
    await Posts.update(
      {
        body: req.body.body,
      },
      {
        where: { post_id: req.body.post_id },
      }
    );
    res.status(200).json({ message: "Post updated." });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const deleteAllPostsFromUser = async (req, res) => {
  try {
    await Posts.destroy({ where: { user_id: req.body.user_id } });
    res
      .status(200)
      .json({
        message: `All posts from ${req.body.username} deleted succesfully.`,
      });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const deletePost = async (req, res) => {
  try {
    const id = req.body.post_id;
    await Likes.destroy({where: {post_id: id}});
    await Comments.destroy({where: {post_id: id}});
    await Posts.destroy({ where: { post_id: id } });
    res.status(200).json({ message: "Post deleted." });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const controllers = {
  getAllPosts,
  getPostsByUser,
  createPost,
  updatePost,
  deleteAllPostsFromUser,
  deletePost,
};

module.exports = controllers;
