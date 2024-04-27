const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");
require("dotenv").config();
const SECRET_KEY = 'edeloedeedeloedeyaomokhaled' // Use the secret key from environment variables

const authorized = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Authorization token is missing!" });
    }

    const decodedToken = jwt.verify(token, SECRET_KEY);
    const user = await UserModel.findOne({ _id: decodedToken.userId });

    if (user && user.role === 'admin') {
      next(); // User is authorized as admin
    } else {
      res.status(403).json({ msg: "You are not authorized to access this route!" });
    }
  } catch (err) {
    console.error("Error in authorized middleware:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = authorized;
