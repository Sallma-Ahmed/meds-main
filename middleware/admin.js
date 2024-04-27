const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
require("dotenv").config();
const SECRET_KEY = 'edeloedeedeloedeyaomokhaled'; // Same secret key used for signing the token

const admin = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) {
      return res.status(403).json({ msg: "No token provided!" });
    }

    const token = authorization.split(' ')[1]; // Extract token from Authorization header
    const decoded = jwt.verify(token, SECRET_KEY);

    // Check if the user is admin
    const user = await UserModel.findById(decoded.userId);
    if (user && user.type === true) { // Assuming type true means admin
      next();
    } else {
      res.status(403).json({ msg: "You are not authorized to access this route!" });
    }
  } catch (err) {
    console.error("Error in admin middleware:", err);
    res.status(403).json({ msg: "Invalid token!" });
  }
};

module.exports = admin;
