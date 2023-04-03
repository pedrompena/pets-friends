import { Formik } from "formik";
import React, { useContext, useState } from "react";
import { Context } from "../../../../../store/appContext";
import { Modal } from "../../Modal";

export const UserInfoModal = ({ handleOpenModal, getClientInfo, user }) => {
  const { store, actions } = useContext(Context);
  const [image, setImage] = useState("");
  const [checkBox, setCheckBox] = useState(true);

  const saveInfo = async (body) => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
    const resp = await fetch(
      `${store.BACKEND_URL}/api/clients/${store.clientInfo.id}`,
      options
    );
    const data = await resp.json();
    data && getClientInfo();
    handleOpenModal();
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async (setFieldValue) => {
    const data = await actions.uploadImage(image);
    setFieldValue("avatar", data.url);
    setCheckBox(false);
  };

  return (
    <Modal handleOpen={handleOpenModal}>
      <Formik
        initialValues={{
          name: user.name,
          surname: user.surname,
          description: user.description || "",
          city: user.city,
          avatar: image,
          password: "",
        }}
        onSubmit={(values, { resetForm }) => {
          saveInfo(values);
          resetForm();
        }}
      >
        {({
          setFieldValue,
          values,
          handleSubmit,
          handleChange,
          handleBlur,
        }) => (
          <form className="form position-relative" onSubmit={handleSubmit}>
            <label className="fw-bold" htmlFor="image">
              Avatar
            </label>
            <input
              className="rounded"
              id="image"
              type="file"
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
              placeholder="Jose"
              value={values.name}
              onChange={handleChangeImage}
              onBlur={handleBlur}
            />
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
            <label className="fw-bold" htmlFor="description">
              Descripción
            </label>
            <textarea
              className="rounded"
              type="text"
              id="description"
              name="description"
              placeholder="Esto es una breve descripción sobre mi."
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
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
            <button
              className="btn-dark btn px-3 w-50 rounded-pill mx-auto"
              type="submit"
            >
              Guardar
            </button>
          </form>
        )}
      </Formik>
    </Modal>
  );
};
