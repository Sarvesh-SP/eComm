const Category = require("../models/category");
const _ = require("lodash");
exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, docs) => {
    if (err)
      return res.status(400).send({ error: "Error while saving the category" });
    else {
      return res.status(200).json({ docs });
    }
  });
};

exports.catId = (req, res, next, id) => {
  Category.findById(id, (err, docs) => {
    if (err || !docs)
      return res.status(400).json({
        error: "Category not found",
      });
    req.category = docs;
    next();
  });
};

exports.destroy = (req, res) => {
  const category = req.category;
  category.deleteOne((err, docs) => {
    if (err) return res.status(403).send({ error: "Category does'nt exist" });
    return res.status(200).json({ docs, success: "deleted" });
  });
};

exports.read = (req, res) => {
  return res.json(req.category);
};

exports.update = (req, res) => {
  let category = req.category;

  //Always send objects inside the _.extend() method to update
  category = _.extend(category, req.body);
  category.save((err, docs) => {
    if (err) {
      return res.status(400).json({
        error: "Category not saved",
      });
    }
    res.json(docs);
  });
};

exports.list = (req, res) => {
  Category.find((err, docs) => {
    if (err) {
      return res.status(400).json({
        error: "Can't fetch the categories",
      });
    }
    res.json(docs);
  });
};
