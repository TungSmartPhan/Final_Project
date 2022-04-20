const Category = require("../models/categoryModel");
const Products = require('../models/productModel')
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
      // trong mỗi dữ liệu bên trong 1 product nào đấy, sẽ có category, thì hàm này sẽ kiểm tra xem, liệu những products này có liên quan đến category này ko => 
      // => mục đích là, khi Admin muốn xóa một category nào đấy, mà bên trong nó vẫn còn dữ liệu thì ko dc phép xóa
      const products = await Products.findOne({category: req.params.id})
      if(products) return res.status(400).json({message: "Please delete all products with a relationship"})
      //choose _id in categories table to delete category with _id you want
      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: "Delete category successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await Category.findById(req.params.id);
      if (!category)
        return res
          .status(404)
          .json({ message: "This category does not exist for updating" });
      else {
        await Category.findByIdAndUpdate({ _id: req.params.id }, { name });
      }
      res.json({ message: "Update category successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = categoryCtrl;
