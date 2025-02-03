import React from "react";
import { useNavigate } from "react-router-dom"; // Ou useHistory pour React Router v5
import "./notfound.css";

const PageNotFound = () => {
  const navigate = useNavigate(); // Ou useHistory pour React Router v5

  const handleGoBack = () => {
    navigate(-1); // Revenir à la page précédente
  };


  return (
    <div className="notfound-container">
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <h2 className="notfound-subtitle">Page Not Found</h2>
        <p className="notfound-message">
          Oups ! La page que vous cherchez n'existe pas.
        </p>
        <div className="notfound-buttons">
          <button onClick={handleGoBack} className="notfound-button">
            Retour à la page précédente
          </button>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;