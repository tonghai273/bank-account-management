var express = require('express');
var userRoute = express.Router();
var userController = require('../controllers/user.controller');

// Signup
userRoute.post('/signup', userController.signUp);

// Signin
userRoute.post('/signin', userController.signIn);

module.exports = userRoute;