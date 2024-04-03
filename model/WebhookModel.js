const mongoose = require("mongoose");

const webhookSchema = new mongoose.Schema({
  Customer_id: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
});

const webhookDetail = mongoose.model("webhookDetail", webhookSchema);

module.exports = webhookDetail;
