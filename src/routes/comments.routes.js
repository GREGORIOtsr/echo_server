const express = require('express');
const router = express.Router();
const commentsControllers = require('../controllers/api_controllers/comments.controller');

router.get('/:username', commentsControllers.getCommentsByUser);
router.get('/:postId', commentsControllers.getCommentsByPost);
router.post('/', commentsControllers.createComment);
router.put('/', commentsControllers.updateComment);
router.delete('/', commentsControllers.deleteComment);


module.exports = router;
