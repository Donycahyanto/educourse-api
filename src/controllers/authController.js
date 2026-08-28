const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/userModel');
const { sendVerificationEmail } = require('../services/emailService');

const register = async (req, res) => {
  const { fullname, username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(400).json({ message: 'Email sudah terdaftar' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = uuidv4();

    await User.create({
      fullname,
      username,
      email,
      password: hashedPassword,
      verification_token: verificationToken,
    });

    try {
      await sendVerificationEmail(email, verificationToken);
    } catch (e) {
      console.error('Error sending email:', e);
    }

    res
      .status(201)
      .json({
        message: 'Registrasi berhasil, silakan cek email untuk verifikasi',
      });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(400).json({ message: 'Email atau password salah' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: 'Email atau password salah' });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'supersecretkey123',
      { expiresIn: '1d' }
    );
    res.json({ message: 'Login berhasil', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const verifyEmail = async (req, res) => {
  const token = req.query.token || req.body.token;
  try {
    const user = await User.findOne({ where: { verification_token: token } });
    if (!user)
      return res.status(400).json({ message: 'Invalid Verification Token' });

    user.is_verified = true;
    user.verification_token = null;
    await user.save();

    res.json({ message: 'Email Verified Successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { register, login, verifyEmail };
