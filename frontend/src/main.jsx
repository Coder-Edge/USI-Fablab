import React, { Children, useState } from "react";
import ReactDom from "react-dom/client";
import Navbar from "./components/Navbar/navbar"; //importation du composant navbar
import "./main.css"; //importation du fichier style main.css
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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
import { NavParams } from "./components/Navbar/navParams";
import BudgetMNG from "./pages/manager/budget/budget";
import MembersPage from "./pages/manager/members/members";
import MembersPageMBR from "./pages/member/members/members";
import ParamatreMNG from "./pages/manager/parametre/parametre";

export default function Main() {
  const { auth } = useAuth();
  const [navActive, setNavActive] = useState(NavParams.inventaire);

  // La siplification de l'expession
  // <div className="main-content"><Header title={"Inventaire"} name={auth.name} role={auth.userType} /> <PAGE /></div>

  const Simplifier = ({ children, title }) => {
    return (
      <>
        <div className="main-content">
          <Header title={title} name={auth.name} role={auth.userType} />
          {children}
        </div>
      </>
    );
  };

  return (
    <main>
      <Router>
        <Routes>
          <Route index element={<Navigate to="/login" />} />

          <Route element={<RequireAuth />}>
            {/* Route pour le manager */}
            <Route element={<Permission role={[Role.manager]} />}>
              <Route
                path="/manager/*"
                element={
                  <>
                    <Navbar param={navActive} role={Role.manager} />
                    <Routes>
                      <Route
                        index
                        element={
                          <Simplifier title={"Inventaire"}>
                            <InventoryMNG setNavActive={setNavActive} />
                          </Simplifier>
                        }
                      />

                      <Route
                        index
                        element={<Simplifier title={"Inventaire"}><InventoryMNG setNavActive={setNavActive} /></Simplifier>}
                      />
                      <Route path="/budget" element={<Simplifier title={"Budget"}><BudgetMNG setNavActive={setNavActive} /></Simplifier>} />
                      <Route path="/members" element={<Simplifier title={"Membres"}><MembersPage setNavActive={setNavActive} /></Simplifier>} />

                      {/* Route pour le calendrier */}
                      <Route
                        path="/calendar"
                        element={
                          <Simplifier title={"Calendrier"}>
                            <Calendrier setNavActive={setNavActive} />
                          </Simplifier>
                        }
                      />

                    </Routes>
                  </>
                }
              />
            </Route>

            {/* Route pour le student */}
            <Route element={<Permission role={[Role.student]} />}>
              <Route
                path="/student/*"
                element={
                  <>
                    <NavbarOTH param={navActive} />
                    <Routes>
                      <Route
                        index
                        element={
                          <div className="main-content">
                            <Header
                              title={"Inventaire"}
                              name={auth.name}
                              role={auth.userType}
                            />
                            <InventorySTD />
                          </div>
                        }
                      />
                    </Routes>
                  </>
                }
              />
            </Route>

            {/* Route pour le extern */}
            <Route element={<Permission role={[Role.extern]} />}>
              <Route
                path="/extern/*"
                element={
                  <>
                    <NavbarOTH param={navActive} />
                    <Routes>
                      <Route
                        index
                        element={
                          <div className="main-content">
                            <Header
                              title={"Inventaire"}
                              name={auth.name}
                              role={auth.userType}
                            />
                            <InventoryEXT setNavActive={setNavActive} />
                          </div>
                        }
                      />
                    </Routes>
                  </>
                }
              />
            </Route>

            {/* Route pour le member */}
            <Route element={<Permission role={[Role.member]} />}>
              <Route path="/member/*" element={
                <>
                  <Navbar param={navActive} role={Role.member} />
                  <Routes>
                    <Route index element={<Simplifier title={"Inventaire"}><InventoryMBR setNavActive={setNavActive} /></Simplifier>} />
                    <Route path="/budget" element={<Simplifier title={"Budget"}><BudgetMNG setNavActive={setNavActive} /></Simplifier>} />
                    <Route path="/members" element={<Simplifier title={"members"}><MembersPageMBR setNavActive={setNavActive} /></Simplifier>} />
                    <Route path="/calendar" element={<Simplifier title={"Calendrier"}><Calendrier setNavActive={setNavActive} /></Simplifier>} />
                    <Route path="/parametre" element={<Simplifier title={"Paramètre"}><ParamatreMNG setNavActive={setNavActive} /></Simplifier>} />
                  </Routes>
                </>
              } />
            </Route>
          </Route>

          {/* Route pour les membres */}
          <Route
            path="/membres/*"
            element={
              <>
                <Navbar param={navActive} />
                <Routes>
                  <Route
                    index
                    element={
                      <div className="main-content">
                        <Header title={"Membres"} /> name={auth.name} role=
                        {auth.userType}
                        <Membres />
                      </div>
                    }
                  />
                </Routes>
              </>
            }
          />

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
  <AuthProvider>
    <Main />
  </AuthProvider>
);
