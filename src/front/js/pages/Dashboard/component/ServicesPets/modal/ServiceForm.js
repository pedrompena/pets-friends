import { Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../../../store/appContext";

export const ServiceForm = ({ item, handleOpen, getItems }) => {
  const { store, actions } = useContext(Context);
  const [url, setUrl] = useState("");
  const [options, setOptions] = useState({});
  const [image, setImage] = useState("");
  const [checkBox, setCheckBox] = useState(true);

  const user = store.clientInfo;

  useEffect(() => {
    if (item.id) {
      setUrl(`/api/services/${item.id}`);
      setOptions({
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: "",
      });
    } else {
      setUrl(`/api/services`);
      setOptions({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: "",
      });
    }
  }, []);

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const saveInfo = async (body) => {
    const requestOptions = {
      method: options.method,
      headers: options.headers,
      body: JSON.stringify(body),
    };

    const resp = await fetch(`${store.BACKEND_URL}${url}`, requestOptions);
    const data = await resp.json();
    data && getItems();
    handleOpen();
  };

  const handleUpload = async (setFieldValue) => {
    const data = await actions.uploadImage(image);
    setFieldValue("image", data.url);
    setCheckBox(false);
  };

  return (
    <Formik
      initialValues={{
        image: item.image || "",
        title: item.title || "",
        price: item.price || "",
        service_type: item.service_type || "",
        description: item.description || "",
        carer_id: user.id,
      }}
      onSubmit={(values, { resetForm }) => {
        saveInfo(values);
        resetForm();
      }}
    >
      {({ setFieldValue, values, handleSubmit, handleChange, handleBlur }) => (
        <form className="form position-relative" onSubmit={handleSubmit}>
          <label className="fw-bold" htmlFor="image">
            Imagen
          </label>
          <input
            className="rounded"
            type="file"
            id="image"
            onChange={handleChangeImage}
          />
          {checkBox && (
            <i
              className="fa-solid fa-check"
              onClick={() => handleUpload(setFieldValue)}
            ></i>
          )}
          <label className="fw-bold" htmlFor="title">
            Titulo
          </label>
          <input
            className="rounded"
            type="text"
            id="title"
            name="title"
            placeholder="Paseo divertido"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label className="fw-bold" htmlFor="price">
            Precio
          </label>
          <input
            className="rounded"
            type="number"
            id="price"
            name="price"
            placeholder="15"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label className="fw-bold" htmlFor="type">
            Tipo de servicio
          </label>
          <select
                className="rounded"
                id="type"
                name="type"
                value={values.service_type}
                onChange={handleChange}
                onBlur={handleBlur}
              >
                <option>Selecciona un tipo de servicio</option>
                <option value="type_1">Paseo de 30 m</option>
                <option value="type_2">Paseo de 1 h</option>
                <option value="type_3">Cuidado Integral (+8 h)</option>
                <option value="type_4">Servicio personalizado</option>
              </select>
          <label className="fw-bold" htmlFor="description">
            Descripción
          </label>
          <textarea
            className="rounded"
            type="text"
            id="description"
            name="description"
            placeholder="Un paseo super divertido por zonas cercanas a tu hogar"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <button
            className="btn-dark btn px-3 w-50 rounded-pill mx-auto"
            type="submit"
          >
            {item ? "Guardar" : "Añadir"}
          </button>
        </form>
      )}
    </Formik>
  );
};
