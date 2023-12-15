const express = require('express');
const router = express.Router();
const authControllers = require('../controllers/web_controllers/auth.controller');

router.post('/signup', authControllers.signUpUser);
router.post('/login', authControllers.loginUser);
router.get('/signout', authControllers.signOut);

module.exports = router;
