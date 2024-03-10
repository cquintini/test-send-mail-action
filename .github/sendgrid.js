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
  to: "recipient@example.com", // Change this to the recipient's email address
  from: "sender@example.com", // Change this to the sender's email address
  subject: success ? "Deployment Success" : "Deployment Failure",
  text: `Deployment ${success ? "succeeded" : "failed"}. Event: ${eventName}, Repository: ${repository}, Ref: ${ref}`,
};

sgMail
  .send(msg)
  .then(() => console.log("Email sent successfully"))
  .catch((error) => console.error("Error sending email:", error));
