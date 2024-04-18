const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");

// LOGIN
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email!"),
    body("password").isLength({ min: 1, max: 12 }).withMessage("Password should be between 1-12 characters"),
  ],
  async (req, res) => {
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
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

module.exports = router;
