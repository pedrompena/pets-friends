import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Signup } from "./pages/Signup/Signup";
import { Login } from "./pages/Login/Login";
import { Servicios } from "./pages/Servicios/Servicios";
import { Owner } from "./pages/Perfil/Owner/Owner";
import { Carer } from "./pages/Perfil/Carer/Carer";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar/Navbar";

import { Home } from "./pages/Home/Home";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { SocketProvider } from "./socket";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
    <div>
      <SocketProvider>
        <BrowserRouter basename={basename}>
          <ScrollToTop>
            <Navbar />
            <Routes>
              <Route element={<Home />} path="/" />
              <Route element={<Signup />} path="/signup" />
              <Route element={<Login />} path="/login" />
              <Route element={<Servicios />} path="/servicios/:id" />
              <Route element={<Carer />} path="/carer/:id" />
              <Route element={<Owner />} path="/owner" />
              <Route element={<Dashboard />} path="/dashboard" />
              <Route element={<h1>Not found!</h1>} />
            </Routes>
          </ScrollToTop>
        </BrowserRouter>
      </SocketProvider>
    </div>
  );
};

export default injectContext(Layout);
