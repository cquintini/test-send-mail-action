#! /usr/bin/env node

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
  to: "cesarquintini@gmail.com",
  from: "noreply@cocomarch.com",
  subject: "Deployment" + process.env.SUCCESS ? "Successful" : "Failed",
  text:
    process.env.REPOSITORY + " " + process.env.REF + " " + process.env.EVENT + process.env.SUCCESS
      ? " Successful"
      : " Failed",
  html:
    "<p>" + process.env.REPOSITORY + " " + process.env.REF + " " + process.env.EVENT + process.env.SUCCESS
      ? " Successful"
      : " Failed" + "</p>",
};

sgMail
  .send(msg)
  .then(() => console.log("Mail sent successfully"))
  .catch((error) => console.error(error.toString()));
