// emailTemplates.js

function generateBorrowRejectionEmail(borrowDetails, rejectionReason = "") {
  // Formatage des dates
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  // Version texte
  const textMessage = `
Bonjour ${borrowDetails.user.name} ${borrowDetails.user.firstName},

Nous regrettons de vous informer que votre demande d'emprunt (référence #${
    borrowDetails._id
  }) n'a pas pu être acceptée.

DÉTAILS DE LA DEMANDE :
- Date de début prévue : ${formatDate(borrowDetails.startDate)}
- Date de retour prévue : ${formatDate(borrowDetails.endDate)}
- Motif : ${borrowDetails.motif || "Non spécifié"}

MATÉRIEL DEMANDÉ :
${borrowDetails.Listborrow.map(
  (item) => `- ${item.product_name} (quantité: ${item.quantity})`
).join("\n")}

RAISON DU REFUS :
${rejectionReason || "Non spécifiée"}

VOICI VOS OPTIONS :
1. Modifier votre demande (dates ou matériel) dans une nouvelle et la resoumettre
2. Nous contacter pour plus d'informations (répondez à cet email)
3. Consulter notre règlement d'emprunt sur notre site web

Nous sommes désolés pour ce refus et restons à votre disposition pour toute question.

Cordialement,
L'équipe du FabLab ${borrowDetails.labName || "ULC-Icam"}
`;

  // Version HTML
  const htmlMessage = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { color: #e74c3c; font-size: 22px; border-bottom: 2px solid #f5b7b1; padding-bottom: 10px; }
        .section { margin: 20px 0; }
        .section-title { color: #c0392b; font-size: 18px; margin-bottom: 10px; }
        .product-list { margin: 15px 0; padding-left: 20px; }
        .rejection-reason { background: #fdedec; padding: 15px; border-left: 4px solid #e74c3c; margin: 20px 0; }
        .options { background: #f9f9f9; padding: 15px; border-radius: 5px; }
        .footer { margin-top: 30px; font-size: 14px; color: #7f8c8d; border-top: 1px solid #eee; padding-top: 15px; }
        .signature { font-weight: bold; color: #2c3e50; }
        .ref-number { background: #f0f7ff; padding: 5px 10px; border-radius: 3px; display: inline-block; }
    </style>
</head>
<body>
    <div class="header">Notification de refus d'emprunt</div>
    
    <p>Bonjour ${borrowDetails.user.name} ${borrowDetails.user.firstName},</p>
    
    <p>Nous regrettons de vous informer que votre demande d'emprunt <span class="ref-number">#${
      borrowDetails._id
    }</span> n'a pas pu être acceptée.</p>
    
    <div class="section">
        <div class="section-title">Détails de la demande</div>
        <p><strong>Date de début prévue :</strong> ${formatDate(
          borrowDetails.startDate
        )}</p>
        <p><strong>Date de retour prévue :</strong> ${formatDate(
          borrowDetails.endDate
        )}</p>
        <p><strong>Motif :</strong> ${borrowDetails.motif || "Non spécifié"}</p>
    </div>
    
    <div class="section">
        <div class="section-title">Matériel demandé</div>
        <ul class="product-list">
            ${borrowDetails.Listborrow.map(
              (item) =>
                `<li><strong>${item.product_name}</strong> (quantité: ${item.quantity})</li>`
            ).join("\n")}
        </ul>
    </div>
    
    <div class="rejection-reason">
        <div class="section-title">Raison du refus</div>
        <p>${rejectionReason || "Non spécifiée"}</p>
    </div>
    
    <div class="section options">
        <div class="section-title">Vos options</div>
        <ol>
            <li>Modifier votre demande (dates ou matériel) dans une nouvelle et la resoumettre</li>
            <li>Nous contacter pour plus d'informations (répondez à cet email)</li>
            <li>Consulter notre règlement d'emprunt sur notre site web</li>
        </ol>
    </div>
    
    <div class="section">
        <p>Nous sommes désolés pour ce refus et restons à votre disposition pour toute question.</p>
    </div>
    
    <div class="footer">
        <p>Cordialement,</p>
        <p class="signature">L'équipe du FabLab ${
          borrowDetails.labName || "ULC-Icam"
        }</p>
        ${
          borrowDetails.labLogo
            ? `<img src="${borrowDetails.labLogo}" alt="Logo FabLab" width="150">`
            : ""
        }
    </div>
</body>
</html>
`;

  return {
    text: textMessage,
    html: htmlMessage,
    subject: `Refus de votre demande d'emprunt #${borrowDetails._id}`,
  };
}

module.exports = {
  generateBorrowRejectionEmail,
};
