const mongoose = require("mongoose");

const operatorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true }, // 'Pilot', 'Coordinator'
  subDistrict: { type: String, required: true },
  experience: String,
  contact: {
    phone: String,
    email: String,
    address: String
  },
  status: { type: String, default: 'Active' }
}, { timestamps: true });

module.exports = mongoose.model("Operator", operatorSchema);