import React from "react";
import "./notfound.css"; // Fichier CSS pour les styles

const PageNotFound = () => {
  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page Not Found</h2>
        <p className="notfound-message">
          Oups ! La page que vous cherchez n'existe pas.
        </p>
        <a href="/" className="notfound-button">
          Retour à l'accueil
        </a>
      </div>
    </div>
  );
};

export default PageNotFound;