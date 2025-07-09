// empruntTermineTemplate.js

function generateBorrowCompletionEmail(borrowDetails) {
  // Formatage des dates
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Version texte
  const textMessage = `
Bonjour ${borrowDetails.user.name} ${borrowDetails.user.firstName},

Votre emprunt (référence #${borrowDetails._id}) a été marqué comme terminé avec succès.

RÉCAPITULATIF DE L'EMPRUNT :
- Date de début : ${formatDate(borrowDetails.startDate)}
- Date de retour : ${formatDate(borrowDetails.endDate)}
- Statut : Terminé

MATÉRIEL RENDU :
${borrowDetails.Listborrow.map(
  (item) => `- ${item.product_name} (quantité: ${item.quantity})`
).join("\n")}

FEEDBACK :
Nous apprécions votre retour ponctuel du matériel. Merci d'avoir respecté nos conditions d'emprunt.

Vous pouvez à tout moment :
1. Consulter votre historique d'emprunts
2. Faire une nouvelle demande
3. Nous faire part de vos suggestions

Merci d'avoir utilisé nos services et à bientôt au FabLab !

Cordialement,
L'équipe du FabLab ${borrowDetails.labName || 'ULC-Icam'}
`;

  // Version HTML
  const htmlMessage = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { color: #27ae60; font-size: 22px; border-bottom: 2px solid #d5f5e3; padding-bottom: 10px; }
        .section { margin: 20px 0; }
        .section-title { color: #27ae60; font-size: 18px; margin-bottom: 10px; }
        .product-list { 
            background: #e8f8f5; 
            padding: 15px; 
            border-left: 4px solid #27ae60;
            margin: 20px 0;
        }
        .feedback { background: #f9f9f9; padding: 15px; border-radius: 5px; }
        .footer { margin-top: 30px; font-size: 14px; color: #7f8c8d; border-top: 1px solid #eee; padding-top: 15px; }
        .signature { font-weight: bold; color: #2c3e50; }
        .ref-number { background: #f0f7ff; padding: 5px 10px; border-radius: 3px; display: inline-block; }
    </style>
</head>
<body>
    <div class="header">Emprunt terminé - Confirmation</div>
    
    <p>Bonjour ${borrowDetails.user.name} ${borrowDetails.user.firstName},</p>
    
    <p>Votre emprunt <span class="ref-number">#${borrowDetails._id}</span> a été marqué comme terminé avec succès.</p>
    
    <div class="section">
        <div class="section-title">Récapitulatif de l'emprunt</div>
        <p><strong>Date de début :</strong> ${formatDate(borrowDetails.startDate)}</p>
        <p><strong>Date de retour :</strong> ${formatDate(borrowDetails.endDate)}</p>
        <p><strong>Statut :</strong> Terminé</p>
    </div>
    
    <div class="section">
        <div class="section-title">Matériel rendu</div>
        <ul class="product-list">
            ${borrowDetails.Listborrow.map(
              (item) => `<li><strong>${item.product_name}</strong> (quantité: ${item.quantity})</li>`
            ).join("\n")}
        </ul>
    </div>
    
    <div class="section feedback">
        <p>Nous apprécions votre retour ponctuel du matériel. Merci d'avoir respecté nos conditions d'emprunt.</p>
    </div>
    
    <div class="section">
        <p>Vous pouvez à tout moment :</p>
        <ul>
            <li>Consulter votre historique d'emprunts</li>
            <li>Faire une nouvelle demande</li>
            <li>Nous faire part de vos suggestions</li>
        </ul>
    </div>
    
    <div class="footer">
        <p>Merci d'avoir utilisé nos services et à bientôt au FabLab !</p>
        <p class="signature">L'équipe du FabLab ${borrowDetails.labName || 'ULC-Icam'}</p>
        ${borrowDetails.labLogo ? `<img src="${borrowDetails.labLogo}" alt="Logo FabLab" width="150">` : ''}
    </div>
</body>
</html>
`;

  return {
    text: textMessage,
    html: htmlMessage,
    subject: `Confirmation de fin d'emprunt #${borrowDetails._id}`
  };
}

module.exports = {
  generateBorrowCompletionEmail
};