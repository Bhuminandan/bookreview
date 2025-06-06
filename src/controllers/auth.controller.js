const AuthService = require('../services/auth.service');
const { successResponse, errorResponse } = require('../utils/responseHandler');

class AuthController {
  async signup(req, res) {
    try {
      const result = await AuthService.signup(req.body);
      return successResponse(res, result, 201);
    } catch (error) {
      console.error('Signup Error:', error);
      return errorResponse(res, error.message || 'Internal server error', error.status || 500);
    }
  }

  async login(req, res) {
    try {
      const result = await AuthService.login(req.body);
      return successResponse(res, result, 200);
    } catch (error) {
      console.error('Login Error:', error);
      return errorResponse(res, error.message || 'Internal server error', error.status || 500);
    }
  }
}

module.exports = new AuthController();
