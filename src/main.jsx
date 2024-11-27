import React from "react";
import ReactDom from "react-dom";

import Navbar from "./Navbar/navbar"; //importation du composant navbar
import "./main.css"; //importation du fichier style main.css
import Header from "./Header/header";
import Dashboard from "./Dashboard/dashboard";

export default function Main() {
  return (
  <>
    <main>
      <Navbar />
      <div className="main-content">
        <Header />
        <Dashboard />
      </div>
    </main>
  </>
  );
}

//Afficher le composant Main
ReactDom.createRoot(document.querySelector("#root")).render(<Main />);
