const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.EMAIL_HOST,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    to: options.recipient,
    subject: options.subject,
    text: options.message,
    attachments: options.file
      ? [
          {
            filename: options.file.originalname,
            content: options.file.buffer,
            contentType: options.file.mimetype,
            path: options.file.path,
            encoding: options.file.encoding,
          },
        ]
      : [],
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
