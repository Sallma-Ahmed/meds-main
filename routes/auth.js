const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Add this import
const userModel = require("../models/userModel");
require("dotenv").config(); // Load environment variables
const SECRET_KEY = 'edeloedeedeloedeyaomokhaled'; // Replace with your actual secret key

router.post("/login", async (req, res) => {
  try {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Find user by email
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ errors: [{ msg: "Email or password not found!" }] });
    }

    // Compare hashed passwords
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password);
    if (isPasswordMatch) {
      // Create JWT token
      const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });

      // Return user details without password along with the token
      const userWithoutPassword = { ...user._doc };
      delete userWithoutPassword.password;
      res.status(200).json({ user: userWithoutPassword, token });
    } else {
      res.status(401).json({ errors: [{ msg: "Incorrect password!" }] });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
