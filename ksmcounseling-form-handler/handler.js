"use strict";

const { SES, SendRawEmailCommand } = require("@aws-sdk/client-ses");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  SES: {
    aws: { SendRawEmailCommand },
    ses: new SES({
      apiVersion: "2010-12-01",
    }),
  },
});

const sendMail = async (payload) => {
  return transporter.sendMail(payload);
};

const getBody = (body, isBase64Encoded) => {
  if (isBase64Encoded) {
    return JSON.parse(Buffer.from(body, "base64").toString());
  }
  return JSON.parse(body);
};

const mergeMail = (event) => {
  return {
    from: process.env.email,
    subject: "Website Inquiry",
    text: `A message has been submitted: \nFrom: ${event.name} <${event.email}>\nPhone: ${event.phone}\nMessage: ${event.message}`,
    to: process.env.email,
  };
};

const handler = async (event) => {
  const body = getBody(event.body, event.isBase64Encoded);
  const email = mergeMail(body);
  try {
    await sendMail(email);
    return {
      statusCode: 204,
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
    };
  }
};

module.exports.form = handler;
