const express = require('express');
const router = express.Router();
const followsControllers = require('../controllers/api_controllers/follows.controller');

router.get('/following/:username', followsControllers.getFollowingByUser);
router.get('/followers/:username', followsControllers.getFollowersByUser);
router.post('/', followsControllers.createFollow);
router.delete('/', followsControllers.deleteFollow);

module.exports = router;
