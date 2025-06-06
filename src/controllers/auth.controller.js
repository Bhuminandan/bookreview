const AuthService = require('../services/auth.service');

class AuthController {
  async signup(req, res) {
    try {
      const result = await AuthService.signup(req.body);
      return res.status(201).json(result);
    } catch (error) {
      console.error('Signup Error:', error);
      return res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
  }

  async login(req, res) {
    try {
      const result = await AuthService.login(req.body);
      return res.status(200).json(result);
    } catch (error) {
      console.error('Login Error:', error);
      return res.status(error.status || 500).json({ message: error.message || 'Internal server error' });
    }
  }
}

module.exports = new AuthController();
