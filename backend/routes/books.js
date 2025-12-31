const express = require("express");
const Book = require("../models/Book");
const router = express.Router();

// Add book
router.post("/add", async (req, res) => {
  try {
    const { name, price } = req.body;
    const book = new Book({ name, price });
    await book.save();
    res.status(201).json({ message: "Book added successfully", book });
  } catch (err) {
    res.status(500).json({ message: "Failed to add book" });
  }
});

// Get all books
router.get("/", async (req, res) => {
  const books = await Book.find();
  res.json(books);
});

module.exports = router;
