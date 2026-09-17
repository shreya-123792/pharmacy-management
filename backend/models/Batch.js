const mongoose = require("mongoose");

const batchSchema = new mongoose.Schema(
  {
    medicineName: {
      type: String,
      required: true,
      trim: true,
    },

    batchNumber: {
      type: String,
      required: true,
      trim: true,
    },

    expiryDate: {
      type: Date,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Batch = mongoose.model("Batch", batchSchema);

module.exports = Batch;