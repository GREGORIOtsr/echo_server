const express = require('express');
const router = express.Router();
const likesControllers = require('../controllers/api_controllers/likes.controller');

router.get('/user/:username', likesControllers.getLikesByUser);
router.get('/post/:postId', likesControllers.getLikesByPost);
router.post('/', likesControllers.createLike);
router.delete('/', likesControllers.deleteLike);

module.exports = router;
