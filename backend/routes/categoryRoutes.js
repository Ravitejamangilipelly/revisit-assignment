const express = require("express");
const Category = require("../models/Category");
const authenticateToken = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", authenticateToken, async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
});

router.post("/", authenticateToken, async (req, res) => {
  const { name, itemCount, imageUrl } = req.body;
  const newCategory = new Category({ name, itemCount, imageUrl });
  await newCategory.save();
  res.status(201).json(newCategory);
});

router.put("/:id", authenticateToken, async (req, res) => {
  const { name, itemCount, imageUrl } = req.body;
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name, itemCount, imageUrl },
    { new: true }
  );
  res.json(category);
});

module.exports = router;
