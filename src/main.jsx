import React from "react";
import ReactDom from "react-dom/client";
import Navbar from "./components/Navbar/navbar"; //importation du composant navbar
import "./main.css"; //importation du fichier style main.css
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/header";
import InventoryMNG from "./pages/manager/Inventory/inventory";
import InventorySTD from "./pages/student/inventory/inventory";
import Calendrier from "./pages/Calendrier/calendrier";

export default function Main() {
  return (
  <Router>
    <main>
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route index element={<><Header title={"Inventaire"}/><InventoryMNG/></>}/>
          <Route path="manager">
            <Route path="inventory" element={<><Header title={"Inventaire"}/><InventoryMNG/></>}/>
            <Route path="calendar" element={<><Header title={"Calendrier"}/><Calendrier/></>}/>
          </Route>
          <Route path="student">
            <Route path="inventory" element={<><Header title={"Inventaire"}/><InventorySTD/></>}/>
          </Route>
        </Routes>
      </div>
    </main>
  </Router>
  );
}

//Afficher le composant Main
ReactDom.createRoot(document.querySelector("#root")).render(<Main />);
