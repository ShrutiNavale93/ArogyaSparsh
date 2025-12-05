const express = require("express");
const router = express.Router();
const Operator = require("../models/Operator");

// GET ALL OPERATORS
router.get("/", async (req, res) => {
  try {
    const operators = await Operator.find().sort({ createdAt: -1 });
    res.json(operators);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ADD NEW OPERATOR
router.post("/", async (req, res) => {
  try {
    const newOp = new Operator(req.body);
    const savedOp = await newOp.save();
    res.status(201).json(savedOp);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE OPERATOR
router.delete("/:id", async (req, res) => {
  try {
    await Operator.findByIdAndDelete(req.params.id);
    res.json("Deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;