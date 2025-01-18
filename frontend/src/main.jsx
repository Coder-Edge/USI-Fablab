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
import Membres from "./pages/Members_fablab/members";
import App from "./Test/test";
import UserForm from "./pages/Registre/registre";
import Product from "./pages/Add_product/product";
import LoginForm from "./pages/Login/login";
import useAuth, { AuthProvider } from "./auth/AuthProvider";
import PageNotFound from "./pages/error/notfound";
import RequireAuth from "./auth/requiredAuth";
import Permission from "./auth/permission";
import Role from "./api/roles";
import UnknowRequire from "./auth/requiredUnknown";


export default function Main() {

  const { auth } = useAuth()

  return (
    <main>
      <Router>
        <Routes>

          <Route element={<UnknowRequire />}>
            <Route index element={
              <>
                <NavbarOTH />
                <div
                  className="main-content"><Header title={"Inventaire"} name={"Unknown"} role={"Extern"} />
                  <InventoryEXT />
                </div>
              </>} />
          </Route>

          <Route element={<RequireAuth />}>
            {/* Route pour le manager */}
            <Route element={<Permission role={[Role.manager]} />}>
              <Route path="/manager/*" element={
                <>
                  <Navbar />
                  <Routes>
                    <Route index element={<div className="main-content"><Header title={"Inventaire"} name={auth.name} role={auth.userType} /><InventoryMNG /></div>} />
                  </Routes>
                </>
              } />
            </Route>


            {/* Route pour le student */}
            <Route element={<Permission role={[Role.student]} />}>
              <Route path="/student/*" element={
                <>
                  <NavbarOTH />
                  <Routes>
                    <Route index element={<div className="main-content"><Header title={"Inventaire"} name={auth.name} role={auth.userType} /><InventorySTD /></div>} />
                  </Routes>
                </>
              } />
            </Route>

            {/* Route pour le extern */}
            <Route element={<Permission role={[Role.extern]} />}>
              <Route path="/extern/*" element={
                <>
                  <NavbarOTH />
                  <Routes>
                    <Route index element={<div className="main-content"><Header title={"Inventaire"} name={auth.name} role={auth.userType} /><InventoryEXT /></div>} />
                  </Routes>
                </>
              } />
            </Route>

            {/* Route pour le member */}
            <Route element={<Permission role={[Role.member]} />}>
              <Route path="/member/*" element={
                <>
                  <Navbar />
                  <Routes>
                    <Route index element={<div className="main-content"><Header title={"Inventaire"} name={auth.name} role={auth.userType} /><InventoryMBR /></div>} />
                  </Routes>
                </>
              } />
            </Route>

            {/* Route pour le calendrier */}
            <Route path="/calendar" element={
              <>
                <Navbar />
                <div className="main-content"><Header title={"Calendrier"} name={auth.name} role={auth.userType} /><Calendrier /></div>
              </>
            } />
          </Route>

          {/* Route pour les membres */}
          <Route path="/membres/*" element={
            <>
              <Navbar />
              <Routes>
                <Route index element={<div className="main-content"><Header title={"Membres"} /> name={auth.name} role={auth.userType}<Membres /></div>} />
              </Routes>
            </>
          } />

          {/* Route pour le test */}
          <Route path="/test" element={<App />} />

          {/* Route pour l'enregistrement des user */}
          <Route element={<UnknowRequire />}>
            <Route path="/register" element={<UserForm />} />
          </Route>

          {/* Route pour la connexion de l'utilisateur */}
          <Route element={<UnknowRequire />}>
            <Route path="/login" element={<LoginForm />} />
          </Route>

          {/* Route pour ajouter les produits */}
          <Route path="/add-product" element={<Product />} />

          {/* Chaemin introuvable */}
          <Route path="*" element={<PageNotFound />} />


        </Routes>
      </Router>
    </main>
  );
}

//Afficher le composant Main
ReactDom.createRoot(document.querySelector("#root")).render(
  <AuthProvider >
    <Main />
  </AuthProvider>
);
