// authcontroller.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const flash = require('connect-flash');

async function signup(req, res) {
    try {
      const { username, password } = req.body;
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, password: hashedPassword });
      await newUser.save();
      res.redirect('/client/getOrder');
      const token = jwt.sign({ userId: newUser._id, username: newUser.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  

async function signin(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const token = jwt.sign({ userId: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.redirect('/client/getOrder');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { signup, signin };
