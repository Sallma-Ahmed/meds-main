const UserModel = require("../models/UserModel");

const admin = async (req, res, next) => {
  const { token } = req.headers;
  try {
    const user = await UserModel.findOne({ token });
    if (user && user.type === "1") {
      next();
    } else {
      res.status(403).json({
        msg: "You are not authorized to access this route!",
      });
    }
  } catch (err) {
    console.error("Error in admin middleware:", err);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = admin;
