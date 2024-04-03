const axios = require("axios");

const services = async (req, res) => {
  try {
    const apiUrl = "https://smm-1.com/api/v2";
    const { key, action } = req.body;

    if (!key || !action) {
      return res
        .status(400)
        .json({ error: "Both key and action are required." });
    }

    const response = await axios.post(apiUrl, { key, action });
    console.log("response: ", response);

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log("ERROR");
    return res.status(500).json({ error: "An error occurred." });
  }
};

const price = async (req, res) => {
  try {
    const apiUrl = "https://smm-1.com/api/v2";
    const { key, action, id, serviceId, quantity } = req.body;

    if (!key || !action) {
      return res
        .status(400)
        .json({ error: "Both key and action are required." });
    }

    const response = await axios.post(apiUrl, { key, action });

    const pricingData = response.data;
    const selectedService = pricingData.find(
      (service) => service.service === serviceId
    );
    if (!selectedService) {
      return res
        .status(404)
        .json({ error: "Service ID not found in pricing data." });
    }

    const baseRate = parseFloat(selectedService.rate);

    const minQuantity = parseInt(selectedService.min, 10);

    if (quantity < minQuantity) {
      return res
        .status(400)
        .json({ error: "Quantity is below the minimum allowed quantity." });
    }

    const calculatedRate = (quantity / minQuantity) * baseRate;

    const roundedRate = calculatedRate.toFixed(2);

    res.json({ id: id, rate: calculatedRate, quantity: quantity });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
};

module.exports = { services, price };
