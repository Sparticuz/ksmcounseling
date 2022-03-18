"use strict";

import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const client = new SESv2Client();

const sendMail = async (payload) => {
  const command = new SendEmailCommand({
    FromEmailAddress: payload.from,
    Destination: {
      ToAddresses: [payload.to],
    },
    Content: {
      Simple: {
        Body: {
          Text: {
            Data: payload.text,
          },
        },
        Subject: {
          Data: payload.subject,
        },
      },
    },
  });
  return await client.send(command);
};

const getBody = (body, isBase64Encoded) => {
  if (isBase64Encoded) {
    return JSON.parse(Buffer.from(body, "base64").toString());
  }
  return JSON.parse(body);
};

const mergeMail = (event) => {
  return {
    from: process.env.EMAIL,
    subject: "Website Inquiry",
    text: `A message has been submitted: \nFrom: ${event.name} <${event.email}>\nPhone: ${event.phone}\nMessage: ${event.message}`,
    to: process.env.EMAIL,
  };
};

export const handler = async (event) => {
  const body = getBody(event.body, event.isBase64Encoded);
  const email = mergeMail(body);
  try {
    console.log(email);
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
