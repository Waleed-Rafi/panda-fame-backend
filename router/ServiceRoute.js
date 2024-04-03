const express = require("express");
const router = express.Router();
const Services = require("../controllers/Services.js");
const orderController = require("../controllers/OrderController");
const PaymentController = require("../controllers/PaymentController");

router.post("/services", Services.services);
router.post("/order", orderController.CreateOrder);
router.post("/create-charge", PaymentController.paymentCharge);
router.post("/calculatePrice", Services.price);
router.post("/create-payment-link", PaymentController.CardPayment);

module.exports = router;
