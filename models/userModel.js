const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id_user: { type: String, required: true },
  phone_user: { type: String, required: true },
  name_user: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: Boolean, required: true },
  status: { type: Boolean, required: true },
  token: { type: String, required: true },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
},
});

const userModel = mongoose.model("userModel", userSchema);

module.exports = userModel;
