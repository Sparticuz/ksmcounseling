/**
 * This test will test the handler function and send an email
 * handler.js needs line 5 updated to the following in order to test
 * const client = new SESv2Client({
 *   region: "us-east-1",
 *   credentials: {
 *     accessKeyId: "",
 *     secretAccessKey: "",
 *   },
 * });
 */

import { handler } from "../handler.js";

const postData = JSON.stringify({
  name: "Kyle",
  email: "test@example.com",
  phone: "Phone number here",
  message: "Test!",
});

const results = await handler({ body: postData, isBase64Encoded: false });

if (results.statusCode === 204) {
  console.log("Test Succeeded");
} else {
  console.error("Test failed");
}
