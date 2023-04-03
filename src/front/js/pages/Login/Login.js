import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Context } from "../../store/appContext";
import footprints from "../../../img/footprints.png";
import { Formik } from "formik";

export const Login = () => {
  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  const login = (body) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(body);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(`${store.BACKEND_URL}/api/login`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          alert("Ha ocurrido un error");
        }
      })
      .then((result) => {
        navigate(`/dashboard/${result.client_info.id}`);
      })
      .catch((error) => alert("Ha ocurrido un error", error));
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center mt-5"
    >
      <div className="box" style={{ minWidth: "350px", maxWidth: "350px" }}>
        <h2 className="text-center signup-title fs-1 fw-bold">inicia sesión</h2>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(values) => {
            let errors = {};

            //email validation
            if (!values.email) {
              errors.email = "Por favor ingresa un email";
            }

            //password validation
            if (!values.password) {
              errors.password = "Por favor ingresa una contraseña";
            }

            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            login(values);
            resetForm();
          }}
        >
          {({
            values,
            errors,
            touched,
            handleSubmit,
            handleChange,
            handleBlur,
          }) => (
            <form className="form position-relative" onSubmit={handleSubmit}>
              <label className="fw-bold" htmlFor="email">
                Correo
              </label>
              <input
                className="rounded"
                type="email"
                id="email"
                name="email"
                placeholder="correo@correo.com"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.email && touched.email && (
                <span className="error-message rounded text-danger">
                  &#8505; {errors.email}
                </span>
              )}
              <label className="fw-bold" htmlFor="password">
                Contraseña
              </label>
              <input
                className="rounded"
                type="password"
                id="password"
                name="password"
                placeholder="Pets1234*"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.password && touched.password && (
                <span className="error-message rounded text-danger">
                  &#8505; {errors.password}
                </span>
              )}
              <button
                className="btn-dark btn px-3 w-50 rounded-pill mx-auto"
                type="submit"
              >
                Iniciar Sesión
              </button>
              <img
                className="d-none d-md-block position-absolute footprint-1"
                width="300px"
                src={footprints}
              />
              <img
                className="d-none d-md-block position-absolute footprint-2"
                width="300px"
                src={footprints}
              />
              <img
                className="d-none d-md-block position-absolute footprint-3"
                width="300px"
                src={footprints}
              />
              <img
                className="d-none d-md-block position-absolute footprint-4"
                width="300px"
                src={footprints}
              />
            </form>
          )}
        </Formik>
        <hr />
        <div className="login-link w-100 d-flex flex-column align-items-center justify-content-center">
          <p className="fw-semibold">No tienes una cuenta?</p>
          <Link
            to="/signup"
            className="fw-bold text-decoration-none text-warning"
          >
            Resgístrate
          </Link>
        </div>
      </div>
    </div>
  );
};
