const User = require('../models/User');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
  const { username, name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, name, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: "Account created successfully" });
  } catch (err) {
    console.error('Signup Error:', err);
    res.status(500).json({ message: "An error occurred. Please try again later." });
  }
};

module.exports = { signup };
