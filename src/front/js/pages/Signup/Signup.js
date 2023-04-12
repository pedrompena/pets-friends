import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import footprints from "../../../img/footprints.png";
import { Context } from "../../store/appContext";

export const Signup = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);

  const register = (body) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify(body);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(`${store.BACKEND_URL}/api/clients`, requestOptions)
      .then((response) => {
        if (response.status === 200) {
          navigate("/login");
          return response.json();
        } else {
          alert("Ha ocurrido un error");
        }
      })

      .catch((error) => alert("Ha ocurrido un error", error));
  };

  return (
    <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center mt-5"
    >
      <div className="box" style={{ minWidth: "350px", maxWidth: "350px" }}>
        <h2 className="text-center signup-title fs-1 fw-bold">regístrate</h2>
        <Formik
          initialValues={{
            name: "",
            surname: "",
            email: "",
            password: "",
            rol: "",
            city: "",
          }}
          validate={(values) => {
            let errors = {};

            //name validation
            if (!values.name) {
              errors.name = "Por favor ingresa un nombre";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
              errors.name = "El nombre debe contener solo letras y espacios";
            }

            //surname validation
            if (!values.surname) {
              errors.surname = "Por favor ingresa un apellido";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.surname)) {
              errors.surname =
                "El apellido debe contener solo letras y espacios";
            }

            //email validation
            if (!values.email) {
              errors.email = "Por favor ingresa un email";
            } else if (
              !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                values.email
              )
            ) {
              errors.email = "Por favor ingresa un email válido";
            }

            //password validation
            if (!values.password) {
              errors.password = "Por favor ingresa una contraseña";
            } else if (
              !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W_]).{8,}$/.test(
                values.password
              )
            ) {
              errors.password =
                "La contraseña debe tener al menos un caracter especial, una letra mayúscula, una minúscula y un numero";
            }

            //rol validation
            if (!values.rol) {
              errors.rol = "Por favor selecciona un rol";
            }

            //city validation
            if (!values.city) {
              errors.city = "Por favor selecciona una ciudad";
            }

            return errors;
          }}
          onSubmit={(values, { resetForm }) => {
            register(values);
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
              <label className="fw-bold" htmlFor="name">
                Nombre
              </label>
              <input
                className="rounded"
                type="text"
                id="name"
                name="name"
                placeholder="Jose"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.name && touched.name && (
                <span className="error-message rounded text-danger">
                  &#8505; {errors.name}
                </span>
              )}
              <label className="fw-bold" htmlFor="surname">
                Apellido
              </label>
              <input
                className="rounded"
                type="text"
                id="surname"
                name="surname"
                placeholder="Perez"
                value={values.surname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.surname && touched.surname && (
                <span className="error-message rounded text-danger">
                  &#8505; {errors.surname}
                </span>
              )}
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
              <label className="fw-bold" htmlFor="city">
                Ciudad
              </label>
              <select
                className="rounded"
                id="city"
                name="city"
                value={values.city}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option value="">Selecciona una ciudad</option>
                <option value="Madrid">Madrid</option>
                <option value="Barcelona">Barcelona</option>
                <option value="Valencia">Valencia</option>
                <option value="Sevilla">Sevilla</option>
                <option value="Zaragoza">Zaragoza</option>
                <option value="Málaga">Málaga</option>
                <option value="Murcia">Murcia</option>
                <option value="Palma">Palma de Mallorca</option>
                <option value="Las Palmas">Las Palmas de Gran Canaria</option>
                <option value="Bilbao">Bilbao</option>
              </select>
              {errors.city && touched.city && (
                <span className="error-message rounded text-danger">
                  &#8505; {errors.city}
                </span>
              )}
              <label className="fw-bold" htmlFor="rol">
                Rol
              </label>
              <select
                className="rounded"
                id="rol"
                name="rol"
                value={values.rol}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option>Selecciona un rol</option>
                <option value="owner">Dueño de Mascota/s</option>
                <option value="carer">Cuidador de Mascota/s</option>
              </select>
              {errors.rol && touched.rol && (
                <span className="error-message rounded text-danger">
                  &#8505; {errors.rol}
                </span>
              )}
              <button
                className="btn-dark btn px-3 w-50 rounded-pill mx-auto"
                type="submit"
              >
                Registrate
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
          <p className="fw-semibold">Ya estás registrado?</p>
          <Link
            to="/login"
            className="fw-bold text-decoration-none text-warning"
          >
            Inicia Sesión
          </Link>
        </div>
      </div>
    </div>
  );
};
