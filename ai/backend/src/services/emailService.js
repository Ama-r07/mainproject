const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendPhishingEmail = async (to, userId, campaignId) => {
  const link = `${process.env.BASE_URL}/track/click?uid=${userId}&cid=${campaignId}`;

  await transporter.sendMail({
    from: `"Security Team" <${process.env.SMTP_USER}>`,
    to,
    subject: "Important: Account Verification Required",
    html: `
      <p>Your account requires verification.</p>
      <p><a href="${link}">Click here to verify</a></p>
    `,
  });
};

module.exports = { sendPhishingEmail };