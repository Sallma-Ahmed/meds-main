const router = require("express").Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const userModel = require("../models/userModel");

// LOGIN
router.post(
  "/login",
  body("email").isEmail().withMessage("Please enter a valid email!"),
  body("password").isLength({ min: 1, max: 12 }).withMessage("Password should be between 1-12 characters"),
  async (req, res) => {
    try {
      // 1- VALIDATION REQUEST [manual, express validation]
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // 2- CHECK IF EMAIL EXISTS
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).json({ errors: [{ msg: "Email or password not found!" }] });
      }

      // 3- COMPARE HASHED PASSWORD
      const checkPassword = await bcrypt.compare(req.body.password, user.password);
      if (checkPassword) {
        // Remove sensitive information before sending the user object
        const userWithoutPassword = { ...user._doc };
        delete userWithoutPassword.password;
        res.status(200).json(userWithoutPassword);
      } else {
        res.status(404).json({ errors: [{ msg: "Email or password not found!" }] });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
