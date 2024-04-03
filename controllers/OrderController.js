const orderDetail = require("../model/OrderModel.js");
const axios = require("axios");

const CreateOrder = async (req, res) => {
  try {
    const apiUrl = "https://smm-1.com/api/v2";
    const { key, action, service, link, quantity, runs, interval } = req.body;

    if (!key || !action || !service || !link || !quantity) {
      return res.status(400).json({ error: "Required fields are missing." });
    }

    const Order = new orderDetail({
      key,
      action,
      service,
      link,
      quantity,
      runs,
      interval,
    });
    await Order.save();

    const orderData = {
      key,
      action,
      service,
      link,
      quantity,
      runs,
      interval,
    };

    const response = await axios.post(apiUrl, orderData);
    console.log("API response:>>>", response.data);
    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log("error>>>", error);
    return res.status(500).json({ error: "An error occurred." });
  }
};

module.exports = { CreateOrder };
