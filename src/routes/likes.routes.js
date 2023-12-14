const express = require('express');
const router = express.Router();
const likesControllers = require('../controllers/api_controllers/likes.controller');

router.get('/:username', likesControllers.getLikesByUser);
router.get('/:postId', likesControllers.getLikesByPost);
router.post('/', likesControllers.createLike);
router.delete('/postId', likesControllers.deleteLike);

module.exports = router;
