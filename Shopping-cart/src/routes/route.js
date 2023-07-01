const express = require('express');
const { userCreate, userLogin, updateUser, getUserById } = require('../controller/user');
const { authenticate } = require('../middlewares/auth');

const router = express.Router();

// Register a new user
router.post('/register', userCreate);

// User login
router.post('/login', userLogin);

// Get user profile by userId (Authentication required)
router.get('/user/:userId/profile', authenticate, getUserById);

// Update user profile by userId (Authentication + Authorization required)
router.put('/user/:userId/profile', authenticate, updateUser);

module.exports = router;
