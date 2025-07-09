// emailTemplates.js

function generateBorrowAcceptanceEmail(borrowDetails) {
  // Formatage des dates
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Version texte
  const textMessage = `
Bonjour ${borrowDetails.user.name} ${borrowDetails.user.firstName},

Nous avons le plaisir de vous informer que votre demande d'emprunt (référence #${borrowDetails._id}) a été acceptée.

DÉTAILS DE L'EMPRUNT :
- Date de début : ${formatDate(borrowDetails.startDate)}
- Date de retour prévue : ${formatDate(borrowDetails.endDate)}
- Motif : ${borrowDetails.motif || 'Non spécifié'}

MATÉRIEL EMPRUNTÉ :
${borrowDetails.Listborrow.map(
  (item) => `- ${item.product_name} (quantité: ${item.quantity})`
).join("\n")}

CONDITIONS D'EMPRUNT :
1. Le matériel doit être récupéré avant le ${formatDate(borrowDetails.startDate)}
2. Tout le matériel doit être retourné avant le ${formatDate(borrowDetails.endDate)}
3. Le matériel doit être rendu dans le même état

Pour toute question concernant votre emprunt, vous pouvez :
- Répondre directement à cet email
- Nous contacter au 01 23 45 67 89
- Vous présenter au FabLab aux heures d'ouverture

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
        .header { color: #2c3e50; font-size: 22px; border-bottom: 2px solid #eee; padding-bottom: 10px; }
        .section { margin: 20px 0; }
        .section-title { color: #3498db; font-size: 18px; margin-bottom: 10px; }
        .product-list { margin: 15px 0; padding-left: 20px; }
        .conditions { background: #f9f9f9; padding: 15px; border-radius: 5px; }
        .footer { margin-top: 30px; font-size: 14px; color: #7f8c8d; border-top: 1px solid #eee; padding-top: 15px; }
        .signature { font-weight: bold; color: #2c3e50; }
        .ref-number { background: #f0f7ff; padding: 5px 10px; border-radius: 3px; display: inline-block; }
    </style>
</head>
<body>
    <div class="header">Confirmation d'emprunt</div>
    
    <p>Bonjour ${borrowDetails.user.name} ${borrowDetails.user.firstName},</p>
    
    <p>Nous avons le plaisir de vous informer que votre demande d'emprunt <span class="ref-number">#${borrowDetails._id}</span> a été acceptée.</p>
    
    <div class="section">
        <div class="section-title">Détails de l'emprunt</div>
        <p><strong>Date de début :</strong> ${formatDate(borrowDetails.startDate)}</p>
        <p><strong>Date de retour prévue :</strong> ${formatDate(borrowDetails.endDate)}</p>
        <p><strong>Motif :</strong> ${borrowDetails.motif || 'Non spécifié'}</p>
    </div>
    
    <div class="section">
        <div class="section-title">Matériel emprunté</div>
        <ul class="product-list">
            ${borrowDetails.Listborrow.map(
              (item) => `<li><strong>${item.product_name}</strong> (quantité: ${item.quantity})</li>`
            ).join("\n")}
        </ul>
    </div>
    
    <div class="section conditions">
        <div class="section-title">Conditions d'emprunt</div>
        <ol>
            <li>Le matériel doit être récupéré avant le ${formatDate(borrowDetails.startDate)}</li>
            <li>Tout le matériel doit être retourné avant le ${formatDate(borrowDetails.endDate)}</li>
            <li>Le matériel doit être rendu dans le même état</li>
        </ol>
    </div>
    
    <div class="section">
        <p>Pour toute question concernant votre emprunt, vous pouvez :</p>
        <ul>
            <li>Répondre directement à cet email</li>
            <li>Nous contacter au 01 23 45 67 89</li>
            <li>Vous présenter au FabLab aux heures d'ouverture</li>
        </ul>
    </div>
    
    <div class="footer">
        <p>Cordialement,</p>
        <p class="signature">L'équipe du FabLab ${borrowDetails.labName || 'ULC-Icam'}</p>
        ${borrowDetails.labLogo ? `<img src="${borrowDetails.labLogo}" alt="Logo FabLab" width="150">` : ''}
    </div>
</body>
</html>
`;

  return {
    text: textMessage,
    html: htmlMessage,
    subject: `Confirmation d'emprunt #${borrowDetails._id}`
  };
}

module.exports = {
  generateBorrowAcceptanceEmail
};