const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv').config();

class AuthService {
  static async signup({ name, email, password }) {
    if (!name || !email || !password) {
      throw { status: 400, message: 'All fields are required' };
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw { status: 409, message: 'Email is already registered' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return { message: 'User registered successfully' };
  }

  static async login({ email, password }) {
    if (!email || !password) {
      throw { status: 400, message: 'Email and password are required' };
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw { status: 401, message: 'Invalid credentials' };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw { status: 401, message: 'Invalid credentials' };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return {
      message: 'Login successful',
      token,
    };
  }
}

module.exports = AuthService;
