const express = require("express");
const router = express.Router();
const Category = require("../../models/categoryModel"); 

// CREATE category
router.post("/", async (req, res) => {
  try {
    const category = new Category({
      Name_Category: req.body.Name_Category,
      id: req.body.id,
      description_Category: req.body.description_Category,
    });

    await category.save();
    res.status(200).json({
      msg: "Category created successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// UPDATE description_Category
router.put("/update/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found!" });
    }

    category.description_Category = req.body.description_Category;
    await category.save();

    res.status(200).json({
      msg: "Category updated successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE category
router.delete("/delete/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ msg: "Category not found!" });
    }

    await category.remove();
    res.status(200).json({
      msg: "Category deleted successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// LIST & SEARCH BY THE Name_ OF THE Category
router.get("/", async (req, res) => {
  try {
    let search = {};
    if (req.query.search) {
      search = { Name_Category: { $regex: req.query.search, $options: "i" } };
    }

    const category_model = await Category.find(search);
    res.status(200).json(category_model);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
