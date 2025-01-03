import React from "react";
import ReactDom from "react-dom/client";
import Navbar from "./components/Navbar/navbar"; //importation du composant navbar
import "./main.css"; //importation du fichier style main.css
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header/header";
import InventoryMNG from "./pages/manager/Inventory/inventory";
import InventorySTD from "./pages/student/inventory/inventory";
import InventoryEXT from "./pages/extern/inventory/inventory";
import InventoryMBR from "./pages/member/Inventory/inventory";
import NavbarOTH from "./components/Navbar/other-nav";
import Calendrier from "./pages/Calendrier/calendrier";
import App from "./Test/test";
import Appusers from "./Test/testuser";

export default function Main() {
  return (
    <main>
      <Router>
        <Routes>
          {/* Route pour le manager */}

          <Route path="/*" element={
            <>
              <Navbar />
              <Routes>
                <Route index element={<div className="main-content"><Header title={"Inventaire"} /><InventoryMNG /></div>} />
              </Routes>
            </>
          }/>

          <Route path="/manager/*" element={
            <>
              <Navbar />
              <Routes>
                <Route index element={<div className="main-content"><Header title={"Inventaire"} /><InventoryMNG /></div>} />
              </Routes>
            </>
          }/>

          {/* Route pour le student */}
          <Route path="/student/*" element={
            <>
              <NavbarOTH />
              <Routes>
                <Route index element={<div className="main-content"><Header title={"Inventaire"} /><InventorySTD /></div>} />
              </Routes>
            </>
          }/>

          {/* Route pour le extern */}
          <Route path="/extern/*" element={
            <>
              <NavbarOTH />
              <Routes>
                <Route index element={<div className="main-content"><Header title={"Inventaire"} /><InventoryEXT /></div>} />
              </Routes>
            </>
          }/>

          {/* Route pour le member */}
          <Route path="/member/*" element={
            <>
              <Navbar />
              <Routes>
                <Route index element={<div className="main-content"><Header title={"Inventaire"} /><InventoryMBR /></div>} />
              </Routes>
            </>
          }/>

          {/* Route pour le calendrier */}
          <Route path="/calendar/*" element={
            <>
              <Navbar />
              <Routes>
                <Route index element={<div className="main-content"><Header title={"Calendrier"} /><Calendrier /></div>} />
              </Routes>
            </>
          }/>
          
          {/* Route pour le test */}
          <Route path="/test/*" element={
            <Routes>
              <Route index element={<Appusers />} />
            </Routes>
          }/>
        </Routes>
      </Router>
    </main>
  );
}

//Afficher le composant Main
ReactDom.createRoot(document.querySelector("#root")).render(<Main />);
