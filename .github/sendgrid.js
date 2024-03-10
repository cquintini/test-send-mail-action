#! /usr/bin/env node

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const eventName = process.env.EVENT_NAME;
const repository = process.env.REPOSITORY;
const ref = process.env.REF;
const success = process.env.SUCCESS === "true";

// Use eventName, repository, and ref variables as needed in your email content or logic
console.log("Event Name:", eventName);
console.log("Repository:", repository);
console.log("Git Ref:", ref);
console.log("Success:", success ? "Yes" : "No");

const msg = {
  to: "cesarquintini@gmail.com",
  from: "noreply@cocomarch.com",
  subject: success ? "Deployment Success" : "Deployment Failure",
  text: `Deployment ${success ? "succeeded" : "failed"}. Event: ${eventName}, Repository: ${repository}, Ref: ${ref}`,
  html: `<p>Deployment ${
    success ? "succeeded" : "failed"
  }. Event: ${eventName}, Repository: ${repository}, Ref: ${ref}</p>`,
};

sgMail
  .send(msg)
  .then(() => console.log("Mail sent successfully"))
  .catch((error) => console.error(error.toString()));
