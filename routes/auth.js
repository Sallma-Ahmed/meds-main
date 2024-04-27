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
    // Return user details without password
    const userWithoutPassword = { ...user._doc };
    delete userWithoutPassword.password;
    res.status(200).json(userWithoutPassword);
  } else {
    res.status(401).json({ errors: [{ msg: "Incorrect password!" }] });
  }
  //session true -> user auth 
  req.session.authenticated = true;
  req.session.user=user;
  req.session.id_user;
  console.log(req.session);

} catch (err) {
  res.status(500).json({ error: "Internal Server Error" });
}
}
);
//logout
router.post("/logout", async (req, res) => {
  try {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json({ message: "Logout successful" });
    });
  } catch (err) {
    console.error("Error in logout route:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
