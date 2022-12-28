const express = require('express');
const authRoute = express.Router();
const { register, login } = require('../controllers/authController');

// POST register 
authRoute.post('/register', register);

// POST login
authRoute.post('/login', login);

module.exports = authRoute;