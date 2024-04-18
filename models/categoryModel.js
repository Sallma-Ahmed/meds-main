const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  Name_Category: { type: String, required: true },
  id: { type: String, required: true },
  description_Category: { type: String, required: true },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
