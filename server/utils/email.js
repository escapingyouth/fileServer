const nodemailer = require('nodemailer');

const pug = require('pug');
const htmlToText = require('html-to-text');

module.exports = class Email {
  constructor(user, url, options = {}) {
    this.to = user.email;
    this.name = user.name;
    this.url = url;
    this.from = `File Server <${process.env.EMAIL_FROM}>`;
    this.options = options;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production ') {
      return nodemailer.createTransport({
        host: 'smtp.resend.com',
        secure: true,
        auth: {
          user: 'resend',
          pass: process.env.RESEND_API_KEY,
        },
      });
    }
    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: +process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = pug.renderFile(
      `${__dirname}/../views/emails/${template}.pug`,
      {
        name: this.name,
        url: this.url,
        subject,
        message: this.options.message,
      },
    );

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.convert(html),
      attachments: this.options.file
        ? [
            {
              filename: this.options.file.originalname,
              content: this.options.file.buffer,
              contentType: this.options.file.mimetype,
              path: this.options.file.path,
              encoding: this.options.file.encoding,
            },
          ]
        : [],
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to File Server!');
  }

  async sendPasswordReset() {
    await this.send(
      'passwordReset',
      'Your password reset token(valid for only 10 minutes)',
    );
  }

  async sendFile(subject) {
    await this.send('emailFile', subject);
  }
};
