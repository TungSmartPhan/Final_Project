const Category = require("../models/categoryModel");
const categoryCtrl = {
  getCategories: async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  createCategory: async (req, res) => {
    try {
      // if user have role ==1 -> admin
      //only  admin can create, delete and update category
      const { name } = req.body;
      const category = await Category.findOne({ name });
      if (category) {
        return res
          .status(400)
          .json({ message: "This category is already exists" });
      }

      const newCategory = await Category({ name });
      await newCategory.save();

      res.json({ message: "Created new category successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      //choose _id in categories table to delete category with _id you want
      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: "Delete category successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = categoryCtrl;
