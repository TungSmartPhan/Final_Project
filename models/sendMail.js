const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";
require("dotenv").config();

const {
  G_MAILING_SERVICE_CLIENT_ID,
  G_MAILING_SERVICE_CLIENT_SECRET,
  G_MAILING_SERVICE_REFRESH_TOKEN,
  ADMIN_SENDER_GMAIL,
} = process.env;

const oauth2client = new OAuth2(
  G_MAILING_SERVICE_CLIENT_ID,
  G_MAILING_SERVICE_CLIENT_SECRET,
  G_MAILING_SERVICE_REFRESH_TOKEN,
  OAUTH_PLAYGROUND
);

//send email by Gmail from Google
const sendEmail = (to, url, txt) => {
  oauth2client.setCredentials({
    refresh_token: G_MAILING_SERVICE_REFRESH_TOKEN,
  });

  const accessToken = oauth2client.getAccessToken();
  const smtpTransport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: ADMIN_SENDER_GMAIL,
      clientId: G_MAILING_SERVICE_CLIENT_ID,
      clientSecret: G_MAILING_SERVICE_CLIENT_SECRET,
      refreshToken: G_MAILING_SERVICE_REFRESH_TOKEN,
      accessToken,
    },
  });

  const mailOptions = {
    from: ADMIN_SENDER_GMAIL,
    to: to,
    subject: "FROM SURI E-COMMERCE - ACTIVATE YOUR ACCOUNT",
    html: `
          <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
            <h2 style="text-align: center; text-transform: uppercase;color: teal;">Welcome to the Suri Universe 🧺.</h2>
            <p>Congratulations! You're almost set to start using SuRi❤️Store  😒😒.
                Just click the button below 👇👇 to validate your email address. 😊😊
            </p>
            
            <a href=${url} style="background: purple; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
        
            <p>If the button doesn't work for any reason, you can also click on the link below:</p>
        
            <div>${url}</div>
            </div>
        `,
  };

  smtpTransport.sendMail(mailOptions, (err, info) => {
    if (err) return { err };
    return info;
  });
};

module.exports = sendEmail;