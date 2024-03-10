#! /usr/bin/env node

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const eventName = process.env.EVENT_NAME;
const repository = process.env.REPOSITORY;
const ref = process.env.REF;
const success = process.env.SUCCESS === "true";

const successMessage = success ? "Deployment succeeded" : "Deployment failed";
const statusColor = success ? "green" : "red";

const htmlContent = `
  <div style="font-family: Arial, sans-serif;">
    <h2 style="color: ${statusColor};">${successMessage}</h2>
    <p><strong>Event:</strong> ${eventName}</p>
    <p><strong>Repository:</strong> ${repository}</p>
    <p><strong>Ref:</strong> ${ref}</p>
  </div>
`;

const msg = {
  to: "noreply@cocomarch.com", // Replace with recipient's email
  from: "cesarquintini@gmail.com", // Replace with sender's email
  subject: success ? "Deployment Success" : "Deployment Failure",
  text: `${successMessage}. Event: ${eventName}, Repository: ${repository}, Ref: ${ref}`,
  html: htmlContent,
};

sgMail
  .send(msg)
  .then(() => console.log("Mail sent successfully"))
  .catch((error) => console.error(error.toString()));
