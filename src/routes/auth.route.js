const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/auth.controller');

// Validation imports
const { signupValidation, loginValidation } = require('../validators/auth.validator');
const validate = require('../middlewares/validate.middleware');

// Public routes
router.post('/signup', signupValidation, validate, AuthController.signup);
router.post('/login', loginValidation, validate, AuthController.login);

module.exports = router;
