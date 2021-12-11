const mongoose = require("mongoose");

const stockSchema = mongoose.Schema({
  store_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  branch_id: { type: mongoose.Schema.Types.ObjectId },
  projectName: String,
  location: String,
  usage: Number,
  wastage: Number,
  transfer: Number,
  balance: Number,
  material: String,
  receivedQuantity: Number,
  unit: String,
});

const collections = mongoose.model("stocks", stockSchema);
module.exports = collections;
