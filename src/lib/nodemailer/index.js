require("dotenv").config();
const nodemailer = require("nodemailer");

const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN } = process.env;

const courier = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: "faridzihza30@gmail.com",
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
  },
});

const sendMail = async ({ email, token }) => {
  const mail = {
    from: "DEVELOPER TEAM <faridzihza30@gmail.com>",
    to: email,
    subject: "Silahkan Verifikasi Email Anda",
    html: `<h1>Halo, klik <a href="http://localhost:2104/users/verification/${token}">link</a> berikut untuk verifikasi</h1>`,
  };

  try {
    await courier.sendMail(mail);
  } catch (error) {
    throw error;
  }
};

module.exports = { sendMail };