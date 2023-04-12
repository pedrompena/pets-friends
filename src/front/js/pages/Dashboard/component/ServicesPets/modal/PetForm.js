import { Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../../../store/appContext";

export const PetForm = ({ item, handleOpen, getItems }) => {
  const { store, actions } = useContext(Context);
  const [url, setUrl] = useState("");
  const [options, setOptions] = useState({});
  const [image, setImage] = useState("");
  const [checkBox, setCheckBox] = useState(true);

  const user = store.clientInfo;

  useEffect(() => {
    if (item.id) {
      setUrl(`/api/pets/${item.id}`);
      setOptions({
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: "",
      });
    } else {
      setUrl(`/api/pets`);
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
        name: item.name || "",
        description: item.description || "",
        owner_id: user.id,
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
          <label className="fw-bold" htmlFor="name">
            Nombre
          </label>
          <input
            className="rounded"
            type="text"
            id="name"
            name="name"
            placeholder="Milka"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label className="fw-bold" htmlFor="description">
            Descripción
          </label>
          <textarea
            className="rounded"
            type="text"
            id="description"
            name="description"
            placeholder="La mejor mascota del mundo!"
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
