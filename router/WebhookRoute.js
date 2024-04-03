const express = require("express");
const router = express.Router();
const WebhookController = require("../controllers/WebhookController");

router.post("/card_webhook", WebhookController.webhook);
router.post("/product_detail", WebhookController.productDetail);

module.exports = router;
