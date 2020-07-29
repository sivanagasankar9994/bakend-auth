const nodemailer = require("nodemailer");

const sendEmail = (options) => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    // host: gmail,
    // port: process.env.EMAIL_PORT,
    // auth: {
    //   user: process.env.EMAIL_USERNAME,
    //   pass: process.env.EMAIL_PASSWORD,
    // },
    service: "gmail",
    auth: {
      user: "sivanagasankar9994@gmail.com", // generated ethereal user
      pass: "mubeenas", // generated ethereal password
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: "sivanagasankar9994@gmail.com",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  // 3) Actually send the email
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error, "Unable to send email.");
    } else {
      // res.status(201).json({
      //   message: "User registered Success mail sent",
      //   user: options.email,
      // });
      console.log("Message sent success");
    }
  });
};

module.exports = sendEmail;
