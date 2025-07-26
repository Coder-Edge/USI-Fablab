// utils/emailSender.js
const nodemailer = require("nodemailer");

// 1. Créer un transporteur SMTP (Gmail, Mailgun, SendGrid, etc.)
const transporter = nodemailer.createTransport({
  service: "gmail", // Service utilisé (Gmail, Outlook, etc.)
  auth: {
    user: process.env.EMAIL_USER, // Votre email
    pass: process.env.EMAIL_PASSWORD, // Votre mot de passe (ou "App Password" pour Gmail)
  },
});
// const sendEmail = async (to, subject, text, html) => {
//   try {
//     const mailOptions = {
//       from: `"Mon Application" <${process.env.EMAIL_USER}>`, // Expéditeur
//       to, // Destinataire
//       subject, // Sujet
//       text, // Version texte
//       html, // Version HTML (optionnel)
//     };

//     // 3. Envoyer l'email
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email envoyé:", info.messageId);
//     return true;
//   } catch (error) {
//     console.error("Erreur lors de l'envoi de l'email:", error);
//     return false;
//   }
// };

const sendEmail = async ({ to, subject, text, html }) => {

  if (!to) throw new Error('Aucun destinataire fourni');

  const mailOptions = {
    from: `"Fablab ULC-Icam" <${process.env.EMAIL_USER}>`,
    to: String(to), // Force la conversion en string
    subject,
    text: text || '',
    html: html || text || ''
  };

  return transporter.sendMail(mailOptions)
    .then(info => {
    //   console.log('Email envoyé à:', to);
      return true;
    })
    .catch(error => {
    //   console.error('Erreur technique:', error);
      return false;
    });
};

module.exports = sendEmail;