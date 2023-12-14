const express = require('express');
const router = express.Router();
const postsControllers = require('../controllers/api_controllers/posts.controller');

router.get('/', postsControllers.getAllPosts);
router.get('/:username', postsControllers.getPostsByUser);
router.post('/', postsControllers.createPost);
router.put('/:id', postsControllers.updatePost);
router.delete('/:username', postsControllers.deleteAllPostsFromUser);
router.delete('/:id', postsControllers.deletePost);

module.exports = router;
