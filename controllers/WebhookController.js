const webhookDetail = require("../model/WebhookModel");
const axios = require("axios");

let globalServicename;
let globalQuantity;
let globalLink;
let globalEmail;
const productDetail = async (req, res) => {
  try {
    const data = req.body;
    const Servicename = data.Servicename;
    const quantity = data.quantity;
    const link = data.link;
    const email = data.email;
    globalServicename = Servicename;
    globalQuantity = quantity;
    globalLink = link;
    globalEmail = email;
  } catch (error) {
    console.log("error");
  }
};

const webhook = async (req, res) => {
  try {
    const data = req.body;
    console.log("data>>>>>>>>>>", data);
    const Customer_id = data.data.customer.id;
    const email = data.data.customer.email;
    const status = data.data.response_summary;
    const amount = data.data.amount;

    if (
      data.data.response_summary == "Approved" &&
      globalEmail == data.data.customer.email
    ) {
      await CreateOrder();
    }
    const webhookData = new webhookDetail({
      Customer_id,
      email,
      status,
      amount,
    });
    await webhookData.save();
    res.status(200).json({ response: data });
  } catch (error) {
    console.log("error>>>>>>>", error);
  }
};

const CreateOrder = async () => {
  try {
    const apiUrl = "https://smm-1.com/api/v2";
    const key = "cec0ad1ac6f5edb6056cfb0b815f37df";
    const action = "add";

    for (let i = 0; i < globalServicename.length; i++) {
      const serviceName = globalServicename[i];
      console.log("servicename", serviceName);
      const serviceQuantity = globalQuantity[i];
      const serviceLink = globalLink[i];

      const orderData = {
        key,
        action,
        service: serviceName.split("|")[0],
        link: serviceLink,
        quantity: serviceQuantity,
      };

      const response = await axios.post(apiUrl, orderData);
      console.log("API response:>>>", response.data);
    }
  } catch (error) {
    console.log("error>>>", error);
  }
};

module.exports = { webhook, productDetail };
