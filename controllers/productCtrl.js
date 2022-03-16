const Products = require("../models/productModel");

//Filter, sorting by and pagination

class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.query
    console.log({before : queryObj});  //before delete page
    const excludedFields = ["page", "sort", "limit"];
    excludedFields.forEach((element) => delete queryObj[element]);

    console.log({after: queryObj}); //after delete page

    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
    
    // gte = greater than or equal 
    // lte = lesser than or equal
    // lt = lesser than 
    // gt = greater than
    //regex means by search by each string , the result will contain that string
    // => And the queryString will have all kind of finding by user typing
    this.query.find(JSON.parse(queryStr))
    return this;
  }
  sorting() {
    if(this.queryString.sort){
      const sortBy = this.queryString.sort.split(',').join('')
      // console.log(sortBy)
      this.query = this.query.sort(sortBy)
    }
    else{
      this.query = this.query.sort('-createdAt')
    }
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1
    const limit = this.queryString.limit * 1 || 3
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit)
    return this;
  }
}

const productCtrl = {
  getProducts: async (req, res) => {
    try {
      //   const products = await Products.find();  <= Normally way to get all data in products  with out query
      const features = new APIfeatures(Products.find(), req.query).filtering().sorting().paginating();
      const products = await features.query;
      // res.json(products);
      res.json({
        status: 'Success', 
        results: products.length,
        products: products
      })
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images) return res.status(400).json({ message: "No Image Upload" });

      const product = await Products.findOne({ product_id });
      if (product) {
        return res
          .status(400)
          .json({ message: "This product is already exists" });
      }

      const newProduct = await Products({
        product_id,
        title: title.toLowerCase(),
        price,
        description,
        content,
        images,
        category,
      });
      await newProduct.save();
      res.json({ message: "Created a product successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        description,
        content,
        images,
        category,
      } = req.body;
      if (!images) return res.status(400).json({ message: "No Image Upload" });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          product_id,
          title: title.toLowerCase(),
          price,
          description,
          content,
          images,
          category,
        }
      );
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndRemove(req.params.id);
      res.json({ message: "Deleted a product successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = productCtrl;
