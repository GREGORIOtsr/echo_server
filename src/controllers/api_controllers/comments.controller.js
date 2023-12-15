const Comments = require("../../models/comments.model");
const Users = require("../../models/users.model");

const getCommentsByUser = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { username: req.params.username },
      attributes: {
        exclude: ["password"],
      },
    });
    let comments = await Comments.findAll({
      where: { user_id: user.dataValues.user_id },
    });
    comments = comments.map((c) => c.dataValues);
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    let comments = await Comments.findAll({
      where: { post_id: req.params.postId },
    });
    console.log(comments, '**************************');
    comments = comments.map((c) => c.dataValues);
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const createComment = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { username: req.body.username },
      attributes: {
        exclude: ["password"],
      },
    });
    const comment = await Comments.create({
      user_id: user.dataValues.user_id,
      post_id: req.body.post_id,
      comment: req.body.comment,
    });
    res.status(200).json({ message: "Comment created.", data: comment });
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const updateComment = async (req, res) => {
  try {
    await Comments.update(
      {
        comment: req.body.comment,
      },
      {
        where: { comment_id: req.params.id },
      }
    );
    res.status(200).json({message: 'Comment updated.'});
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const deleteComment = async (req, res) => {
  try {
    await Comments.destroy({where: {comment_id: req.params.id}});
    res.status(200).json({message: 'Comment deleted.'});
  } catch (error) {
    res.status(400).json({ message: `ERROR: ${error.stack}` });
  }
};

const controllers = {
    getCommentsByUser,
    getCommentsByPost,
    createComment,
    updateComment,
    deleteComment
};

module.exports = controllers;
