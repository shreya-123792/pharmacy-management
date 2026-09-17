const express = require("express");
const Batch = require("../models/Batch");

const router = express.Router();

// Test route
router.get("/test", (req, res) => {
  res.json({ message: "Batch route is working" });
});

// Get all batches with search, pagination and sorting
router.get("/", async (req, res) => {
  try {
    const {
      search = "",
      page = 1,
      limit = 10,
      sort = "expiryDate",
      order = "asc"
    } = req.query;

    const filter = search
      ? {
          medicineName: {
            $regex: search,
            $options: "i"
          }
        }
      : {};

    const sortOrder = order === "desc" ? -1 : 1;

    const skip = (Number(page) - 1) * Number(limit);

    const batches = await Batch.find(filter)
      .sort({ [sort]: sortOrder })
      .skip(skip)
      .limit(Number(limit));

    const total = await Batch.countDocuments(filter);

    res.json({
      batches,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        totalPages: Math.ceil(total / Number(limit))
      }
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

// Add a new medicine batch
router.post("/", async (req, res) => {
  try {
    const {
      medicineName,
      batchNumber,
      expiryDate,
      quantity,
      price
    } = req.body;

    if (
      !medicineName ||
      !batchNumber ||
      !expiryDate ||
      quantity === undefined ||
      price === undefined
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const batch = await Batch.create({
      medicineName,
      batchNumber,
      expiryDate,
      quantity,
      price
    });

    res.status(201).json({
      message: "Batch added successfully",
      batch
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message
    });
  }
});

module.exports = router;