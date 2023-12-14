const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/api_controllers/users.controller');

router.get('/', usersControllers.getAllUsers);
router.get('/:username', usersControllers.getUserByUsername);
router.post('/', usersControllers.createUser);
router.put('/:username', usersControllers.updateUser);
router.delete('/:username', usersControllers.deleteUser);

module.exports = router;
