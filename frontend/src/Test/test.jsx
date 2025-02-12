import React, { useState } from "react";

const EmailValidator = () => {
  // État pour stocker l'e-mail saisi par l'utilisateur
  const [email, setEmail] = useState("");
  // État pour stocker le résultat de la validation
  const [isValid, setIsValid] = useState(null);

  // Regex pour valider l'e-mail
  const emailRegex = /^(?:<)?([a-zA-Z.-]+)@(\d{4})\.(icam\.fr|ulc-icam\.com)(?:>)?$/;

  // Fonction pour valider l'e-mail
  const validateEmail = () => {
    if (emailRegex.test(email)) {
      setIsValid(true); // L'e-mail est valide
    } else {
      setIsValid(false); // L'e-mail est invalide
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Vérification d'adresse e-mail</h1>
      <p style={styles.description}>
        Entrez une adresse e-mail pour vérifier si elle correspond au format attendu.
      </p>

      {/* Champ de saisie de l'e-mail */}
      <input
        type="email"
        placeholder="Entrez votre e-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styles.input}
      />

      {/* Bouton pour valider l'e-mail */}
      <button onClick={validateEmail} style={styles.button}>
        Vérifier
      </button>

      {/* Affichage du résultat */}
      {isValid !== null && (
        <p style={isValid ? styles.valid : styles.invalid}>
          {isValid
            ? "✅ L'adresse e-mail est valide."
            : "❌ L'adresse e-mail est invalide."}
        </p>
      )}
    </div>
  );
};

// Styles pour la page
const styles = {
  container: {
    maxWidth: "400px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "24px",
    marginBottom: "10px",
  },
  description: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "16px",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontSize: "16px",
    cursor: "pointer",
  },
  valid: {
    color: "green",
    marginTop: "10px",
  },
  invalid: {
    color: "red",
    marginTop: "10px",
  },
};

export default EmailValidator;