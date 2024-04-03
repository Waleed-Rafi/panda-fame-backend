const mongoose = require("mongoose");

const orderDetailSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  runs: {
    type: Number,
  },
  interval: {
    type: Number,
  },
});

const orderDetail = mongoose.model("orderDetail", orderDetailSchema);

module.exports = orderDetail;
