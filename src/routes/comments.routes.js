const express = require('express');
const router = express.Router();
const commentsControllers = require('../controllers/api_controllers/comments.controller');

router.get('/user/:username', commentsControllers.getCommentsByUser);
router.get('/post/:postId', commentsControllers.getCommentsByPost);
router.post('/', commentsControllers.createComment);
router.put('/:id', commentsControllers.updateComment);
router.delete('/:id', commentsControllers.deleteComment);


module.exports = router;
