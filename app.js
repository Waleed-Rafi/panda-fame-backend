const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./db/mongoose.js");
const ServiceRoute = require("./router/ServiceRoute.js");
const WebhookRoute = require("./router/WebhookRoute.js");
const axios = require("axios");
const { Checkout } = require("checkout-sdk-node");
const sharedSecret = process.env.COINBASE_WEBHOOK_SHARED_SECRET;
const Webhook = require("coinbase-commerce-node").Webhook;

app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString();
    },
  })
);

//middleware to enable cors
app.use(cors());

app.use("/api", ServiceRoute);
app.use("/", WebhookRoute);

const path = require("path");
const subDirectory = path.join("/var/pandafame/build");
app.use(express.static(subDirectory));

app.get("/", (req, res) => {
  res.sendFile(path.join(subDirectory, "index.html"));
});

app.get("/twitter", (req, res) => {
  res.sendFile(path.join(subDirectory, "index.html"));
});

app.get("/facebook", (req, res) => {
  res.sendFile(path.join(subDirectory, "index.html"));
});

app.get("/youtube", (req, res) => {
  res.sendFile(path.join(subDirectory, "index.html"));
});
app.get("/instagram", (req, res) => {
  res.sendFile(path.join(subDirectory, "index.html"));
});
app.get("/services", (req, res) => {
  res.sendFile(path.join(subDirectory, "index.html"));
});
app.get("/about", (req, res) => {
  res.sendFile(path.join(subDirectory, "index.html"));
});
app.get("/company_history", (req, res) => {
  res.sendFile(path.join(subDirectory, "index.html"));
});
app.get("/careers", (req, res) => {
  res.sendFile(path.join(subDirectory, "index.html"));
});

app.get("/blog", (req, res) => {
  res.sendFile(path.join(subDirectory, "index.html"));
});
app.get("/frequently-asked-questions", (req, res) => {
  res.sendFile(path.join(subDirectory, "index.html"));
});

app.get("/support", (req, res) => {
  res.sendFile(path.join(subDirectory, "index.html"));
});
app.get("/term-of-service", (req, res) => {
  res.sendFile(path.join(subDirectory, "index.html"));
});
app.get("/refund-and-delivery", (req, res) => {
  res.sendFile(path.join(subDirectory, "index.html"));
});
app.get("/privacy-policy", (req, res) => {
  res.sendFile(path.join(subDirectory, "index.html"));
});

app.get("/cart", (req, res) => {
  res.sendFile(path.join(subDirectory, "index.html"));
});

app.post("/webhook/payment", async (request, response) => {
  try {
    const event = Webhook.verifyEventBody(
      request.rawBody,
      request.headers["x-cc-webhook-signature"],
      sharedSecret
    );
    console.log("event>>>>>>>>", event);
    console.log("event.typet>>>>>>>>", event.type);

    if (event.type === "charge:confirmed") {
      let amount = event.data.pricing.local.amount;
      console.log("confirmedAmount>>>>>", amount);
    } else if (event.type === "charge:created") {
      console.log("chargecreted");
      let amount = event.data.pricing;
      console.log("createdAmount>>>>>", amount);
    } else if (event.type === "charge:failed") {
      console.log("chargefailed>>>>");
      let amount = event.data.pricing;
      console.log("failedAmount>>>>>", amount);
    }
  } catch (error) {
    console.log("Error occured", error.message);
    return response.status(400).send("Webhook Error:" + error.message);
  }
});

const port = process.env.PORT || 8000; // Replace with the desired port number

connectDB()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });

app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);
});
