const formidable = require("formidable");
const _ = require("lodash");
const Product = require("../models/product");
const fs = require("fs");

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    const { name, description, price, category, quantity } = fields;

    if (!(name && description && price && category && quantity)) {
      return res.status(400).send({
        error: "All fields are required",
      });
    }

    let product = new Product(fields);

    //Use img as the property in form data
    if (files.img) {
      if (files.img.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1MB",
        });
      }
      product.image.data = fs.readFileSync(files.img.path);
      product.image.contentType = files.img.type;
    }

    product.save((err, docs) => {
      if (err) {
        return res.status(400).json({
          error: "Error while creating the data",
        });
      } else {
        res.send({ docs });
      }
    });
  });
};

exports.productId = (req, res, next, id) => {
  Product.findById(id).exec((err, docs) => {
    if (err || !docs) {
      return res.status(400).json({
        error: "Product not found",
      });
    }
    //sends the instance of product
    req.product = docs;
    next();
  });
};

exports.fetch = (req, res) => {
  req.product.image = undefined;
  return res.json(req.product);
};

exports.destroy = (req, res) => {
  const product = req.product;
  //deleting using the instance, provide by productId method
  product.deleteOne((err, del) => {
    if (err) {
      return res.status(400).json({
        error: "Can't delete",
      });
    }
    res.json({
      del,
      success: "message deleted",
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    const { name, description, price, category, quantity } = fields;

    if (!(name && description && price && category && quantity)) {
      return res.status(400).send({
        error: "All fields are required",
      });
    }

    let product = req.product;
    product = _.extend(product, fields);

    //Use img as the property in form data
    if (files.img) {
      if (files.img.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1MB",
        });
      }
      product.image.data = fs.readFileSync(files.img.path);
      product.image.contentType = files.img.type;
    }

    product.save((err, docs) => {
      if (err) {
        return res.status(400).json({
          error: "Error while creating the data",
        });
      } else {
        res.send({ docs });
      }
    });
  });
};

/* By sell - /products?sorty=sold&order=desc&limit=69
  By arrival - /products?sorty=createdAt&order=desc&limit=69

*/

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sort = req.query.sorty ? req.query.sorty : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;

  Product.find()
    .populate("category")
    .select("-image")
    .sort([[sort, order]])
    .limit(limit)
    .exec((err, docs) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.send(docs);
    });
};

/**
 * returns product related to same category
 */

exports.related = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 6;
  Product.find({
    _id: { $ne: req.product },
    category: req.product.category,
  })
    .select("-image")
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, docs) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(docs);
    });
};

exports.listCategory = (req, res) => {
  Product.distinct("category", {}, (err, docs) => {
    if (err) {
      return res.status(400).json({
        error: "Category not found",
      });
    }
    res.json(docs);
  });
};
