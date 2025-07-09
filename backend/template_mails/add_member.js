// adminNotificationTemplate.js

function generateAdminNominationEmail(userDetails) {
  // Version texte
  const textMessage = `
Bonjour ${userDetails.name} ${userDetails.firstName},

Nous avons le plaisir de vous informer que vous avez été nommé(e) Administrateur du FabLab ULC-Icam.

DÉTAILS DE VOTRE NOUVEAU RÔLE :
- Accès : Panel d'administration complet
- Responsabilités : Gestion des emprunts, validation des demandes, suivi du matériel
- Durée : ${userDetails.duration || 'Permanente'}

PROCHAINES ÉTAPES :
1. Connectez-vous à votre compte avec vos identifiants existants
2. Accédez au dashboard administrateur via le menu
3. Consultez le guide administrateur (pièce jointe)

VOS PRIVILÈGES :
✓ Gérer les utilisateurs
✓ Valider/rejeter les emprunts
✓ Suivre l'état du matériel
✓ Générer des rapports

Pour toute question technique, contactez notre support :
- Email : support@fablab-ulc-icam.fr
- Téléphone : 01 23 45 67 89

Nous vous remercions pour votre engagement et vous souhaitons la bienvenue dans l'équipe d'administration !

Cordialement,
L'équipe de direction
FabLab ULC-Icam
`;

  // Version HTML
  const htmlMessage = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { color: #2c3e50; font-size: 22px; border-bottom: 2px solid #3498db; padding-bottom: 10px; }
        .section { margin: 20px 0; }
        .section-title { color: #3498db; font-size: 18px; margin-bottom: 10px; }
        .privileges-list { 
            background: #e8f4fc; 
            padding: 15px; 
            border-left: 4px solid #3498db;
            margin: 20px 0;
        }
        .steps { background: #f9f9f9; padding: 15px; border-radius: 5px; }
        .footer { margin-top: 30px; font-size: 14px; color: #7f8c8d; border-top: 1px solid #eee; padding-top: 15px; }
        .signature { font-weight: bold; color: #2c3e50; }
        .highlight { background-color: #fffde7; padding: 2px 5px; }
    </style>
</head>
<body>
    <div class="header">Nomination en tant qu'Administrateur</div>
    
    <p>Bonjour <strong>${userDetails.name} ${userDetails.firstName}</strong>,</p>
    
    <p>Nous avons le plaisir de vous informer que vous avez été nommé(e) <span class="highlight">Administrateur du FabLab ULC-Icam</span>.</p>
    
    <div class="section">
        <div class="section-title">Détails de votre nouveau rôle</div>
        <p><strong>Accès :</strong> Panel d'administration complet</p>
        <p><strong>Responsabilités :</strong> Gestion des emprunts, validation des demandes, suivi du matériel</p>
        <p><strong>Durée :</strong> ${userDetails.duration || 'Permanente'}</p>
    </div>
    
    <div class="section steps">
        <div class="section-title">Procédure d'activation</div>
        <ol>
            <li>Connectez-vous à votre compte avec vos identifiants existants</li>
            <li>Accédez au <strong>dashboard administrateur</strong> via le menu utilisateur</li>
            <li>Consultez le guide administrateur (disponible dans votre espace)</li>
        </ol>
    </div>
    
    <div class="section">
        <div class="section-title">Vos privilèges</div>
        <ul class="privileges-list">
            <li>✅ <strong>Gérer les utilisateurs</strong> et leurs permissions</li>
            <li>✅ <strong>Valider/rejeter</strong> les demandes d'emprunt</li>
            <li>✅ <strong>Suivre l'état</strong> du matériel et des réservations</li>
            <li>✅ <strong>Générer des rapports</strong> d'activité</li>
            <li>✅ <strong>Modifier le catalogue</strong> des équipements</li>
        </ul>
    </div>
    
    <div class="section">
        <p>Pour toute question technique, notre équipe support reste à votre disposition :</p>
        <ul>
            <li>📧 <strong>Email :</strong> support@fablab-ulc-icam.fr</li>
            <li>📞 <strong>Téléphone :</strong> 01 23 45 67 89</li>
            <li>🕒 <strong>Disponibilité :</strong> Lundi-vendredi, 9h-18h</li>
        </ul>
    </div>
    
    <div class="footer">
        <p>Nous vous remercions pour votre engagement et vous souhaitons la bienvenue dans l'équipe d'administration !</p>
        <p class="signature">L'équipe de direction<br>FabLab ULC-Icam</p>
        <img src="https://fablab-ulc-icam.fr/logo.png" alt="Logo FabLab ULC-Icam" width="150">
    </div>
</body>
</html>
`;

  return {
    text: textMessage,
    html: htmlMessage,
    subject: `[Important] Nomination en tant qu'Administrateur du FabLab ULC-Icam`
  };
}

module.exports = {
  generateAdminNominationEmail
};