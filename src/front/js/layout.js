import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";

import { Signup } from "./pages/Signup/Signup";
import { Login } from "./pages/Login/Login";
import { Services } from "./pages/Services/Services";
import { Profile } from "./pages/Profile/Profile";
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
              <Route element={<Services />} path="/services" />
              <Route element={<Profile />} path="/profile/:id" />
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
