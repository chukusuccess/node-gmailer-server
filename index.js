const express = require("express");
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const cors = require("cors");

require("dotenv").config();

const PORT = process.env.PORT;
const MY_GMAIL = process.env.MY_GMAIL;
const MY_PASSWORD = process.env.MY_PASSWORD;

const app = express();
const port = PORT || 3000;

app.use(cors());

app.post("/sendEmail", (req, res) => {
  const { name, email, subject, message } = req.query;

  const transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: MY_GMAIL,
        pass: MY_PASSWORD,
      },
    })
  );

  const mailOptions = {
    from: email,
    to: MY_GMAIL,
    subject: `A Message from ${email} (My Portfolio Site)`,
    text: `Email: ${email} Subject: ${subject} Name: ${name} Message: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  res.status(200).send("your message has been sent successfully");
});

app.listen(port, () => {
  console.log(`my mailing server listening at http://localhost:${port}`);
});
