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

import App from "./Test/test"

export default function Main() {
  return (

    <main>

      <Router basename="">
        <Routes>
          <Route index element={<><Header title={"Inventaire"}/><InventoryMNG/></>}/>
          <Route path="manager">
            <Route path="inventory" element={<><Header title={"Inventaire"}/><InventoryMNG/></>}/>
            <Route path="calendar" element={<><Header title={"Calendrier"}/><Calendrier/></>}/>
          </Route>
          <Route path="student">
            <Route path="inventory" element={<><Header title={"Inventaire"}/><InventorySTD/></>}/>
          </Route>

          <Route path="test">
            <Route path="test" element={<><Header title={"Test"}/><App/></>}/>
          </Route>

          <Route index element={<><Navbar /><div className="main-content"><Header title={"Inventaire"}/><InventoryMNG/></div></> }/>
        </Routes>
      </Router>

      <Router basename="manager">
        <Navbar />
        <Routes>
            <Route index element={<div className="main-content"><Header title={"Inventaire"}/><InventoryMNG/></div>}/>
        </Routes>
      </Router>


      <Router basename="student">
        <NavbarOTH />
        <Routes>
            <Route index element={<div className="main-content"><Header title={"Inventaire"}/><InventorySTD/></div>}/>
        </Routes>
      </Router>


      <Router basename="extern">
        <NavbarOTH />
        <Routes>
            <Route index element={<div className="main-content"><Header title={"Inventaire"}/><InventoryEXT/></div>}/>
        </Routes>
      </Router>


      <Router basename="member">
        <Navbar />
        <Routes>
            <Route index element={<div className="main-content"><Header title={"Inventaire"}/><InventoryMBR/></div>}/>
        </Routes>
      </Router>

      <Router basename="calendar">
        <Routes>
          <Route index element={<Calendrier/>}/>
        </Routes>
      </Router>


    </main>
  );
}

//Afficher le composant Main
ReactDom.createRoot(document.querySelector("#root")).render(<Main />);
