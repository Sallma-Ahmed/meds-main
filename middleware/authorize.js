const UserModel = require("../models/UserModel");

const authorized = async (req, res, next) => {
  try {
    const { token } = req.headers;
    const user = await UserModel.findOne({ token });

    if (user) {
      res.locals.user = user;
      next();
    } else {
      res.status(403).json({
        msg: "You are not authorized to access this route!",
      });
    }
  } catch (error) {
    console.error("Error in authorization middleware:", error);
    res.status(500).json({ msg: "Internal server error" });
  }
};

module.exports = authorized;
