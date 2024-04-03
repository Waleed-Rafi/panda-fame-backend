const dotenv = require("dotenv");
const coinbase = require("coinbase-commerce-node");
const Charge = coinbase.resources.Charge;
const Client = coinbase.Client;
const axios = require("axios");
dotenv.config();
Client.init(process.env.COIN_BASE_KEY);
const public_key = process.env.CHECKOUT_PUBLIC_KEY;
const secret_key = process.env.CHECKOUT_SCERET_KEY;
const Channel_Id = process.env.CHECKOUT_CHANNEL_ID;
const token = "tok_677iwsketxwelezunqp6a7f4ea";

const paymentCharge = async (req, res) => {
  try {
    const { amount, currency, email } = req.body;

    const chargeData = {
      name: "Panda Fame",
      description: "Panda Fame Service",
      logo_url:
        "https://res.cloudinary.com/commerce/image/upload/v1663866359/rgmutpwjmwwup5wxo8e2.png",
      metadata: {
        email: email,
      },
      local_price: {
        amount: amount,
        currency: currency,
      },
      pricing_type: "fixed_price",
    };

    const charge = await Charge.create(chargeData);
    console.log("charge>>>>>>>", charge);
    res.status(200).json({ charge: charge });
  } catch (error) {
    res.json({ error: error });
    console.log("error>>>>>>>", error);
  }
};

function convertToCents(value, currency) {
  const conversionFactors = {
    USD: 100, // 1 USD = 100 cents
    EUR: 100, // 1 EUR = 100 cents
    GBP: 100, // 1 GBP = 100 pence
  };

  if (conversionFactors[currency]) {
    return Math.round(value * conversionFactors[currency]);
  } else {
    throw new Error(`Unsupported currency: ${currency}`);
  }
}

const CardPayment = async (req, res) => {
  try {
    const { Servicename, amount, currency, email, country, quantity, price } =
      req.body;

    const amountInCents = convertToCents(amount, currency);
    const products = [];

    for (let i = 0; i < Servicename.length; i++) {
      const productName = Servicename[i].split("|")[1] || Servicename[i];
      const productQuantity = parseInt(quantity[i]);
      const productPrice = convertToCents(parseFloat(price[i]), currency);

      // Add the product to the products array
      products.push({
        name: productName,
        quantity: productQuantity,
        price: productPrice,
      });
    }

    const paymentLinkRequest = {
      amount: amountInCents,
      currency: currency,
      customer: {
        email: email,
      },
      billing: {
        address: {
          country: country,
        },
      },
      products: products,
      "3ds": {
        enabled: false,
        attempt_n3d: false,
        challenge_indicator: "no_preference",
        allow_upgrade: true,
        exemption: "low_value",
      },
      processing_channel_id: Channel_Id,
    };

    // Send the payment link request to Checkout.com
    const response = await axios.post(
      "https://api.sandbox.checkout.com/payment-links",
      paymentLinkRequest,
      {
        headers: {
          Authorization: secret_key,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("response>>>>>>>>>", response.data);
    const paymentLinkURL = response.data._links.redirect;
    res.status(200).json({ paymentLinkURL: paymentLinkURL });
  } catch (error) {
    console.error("Payment link creation failed:", error.name);
    res.status(500).json({ error: "Payment link creation failed" });
  }
};

module.exports = { paymentCharge, CardPayment };
