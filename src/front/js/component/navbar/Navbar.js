import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";

export const Navbar = () => {
  const [onSession, setOnSession] = useState(false);
  const { store, actions } = useContext(Context);

  useEffect(() => {
    store.clientInfo !== null ? setOnSession(true) : setOnSession(false);
  }, []);

  return (
    <nav className="fixed-top navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="/#hero">
          Inicio
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/#about">
                Sobre Pets Friends
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#services">
                Servicios
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#gallery">
                Galería
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/#contact">
                Contacto
              </a>
            </li>
            {onSession ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/dashboard">
                    Mi perfil
                  </Link>
                </li>
                <li className="nav-item">
                  {/* a este agregar funcion para cerrar sesion */}
                  <Link className="nav-link" to="/signup">
                    Cerrar sesión
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Inicia Sesión
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">
                    Regístrate
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
