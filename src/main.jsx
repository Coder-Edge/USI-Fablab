import React from "react";
import ReactDom from "react-dom";

import Navbar from "./Navbar/navbar"; //importation du composant navbar
import "./main.css"; //importation du fichier style main.css

export default function Main() {
  return (
    <div>
      <Navbar />
    </div>
  );
}

//Afficher le composant Main
ReactDom.createRoot(document.querySelector("#root")).render(<Main />);
