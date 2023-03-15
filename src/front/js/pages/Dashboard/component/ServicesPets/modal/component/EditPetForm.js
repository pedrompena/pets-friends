import React, { useContext, useState } from "react";
import { Context } from "../../../../../../store/appContext";

export const EditPetForm = ({ handleOpenEditModal, item, getItems }) => {
  const { store, actions } = useContext(Context);
  const [image, setImage] = useState();
  const [checkBox, setCheckBox] = useState(true);
  const [petInfo, setPetInfo] = useState({
    name: item.name,
    image: item.url,
    description: item.description,
    owner_id: store.clientInfo.id,
  });

  const saveEditPet = async () => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petInfo),
    };
    const resp = await fetch(
      `${store.BACKEND_URL}api/pets/${item.id}`,
      options
    );
    const data = await resp.json();
    console.log("dentro de async", data);
    getItems();
  };

  const handleClick = () => {
    saveEditPet();
    handleOpenEditModal();
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const data = await actions.uploadImage(image)
    setPetInfo({ ...petInfo, image: data.url})
    setCheckBox(false)
  };

  return (
    <form className="dashboard-form gap-3 p-3 w-100 d-flex flex-column align-items-center">
      <p>Edita tu mascota</p>
      <label className="fs-5 fw-bold">Nombre</label>
      <input
        className="col-8"
        value={petInfo.name}
        onChange={(e) => setPetInfo({ ...petInfo, name: e.target.value })}
      />
      <label className="fs-5 fw-bold">Imagen</label>
      <div className="d-flex justify-content-center">
        <input
          className="col-8"
          type="file"
          onChange={(e) => handleChangeImage(e)}
        />
        {checkBox && (
          <i className="fa-solid fa-check" onClick={handleUpload}></i>
        )}
      </div>
      <label className="fs-5 fw-bold">Descripción</label>
      <input
        className="col-8"
        value={petInfo.description}
        onChange={(e) =>
          setPetInfo({ ...petInfo, description: e.target.value })
        }
      />
      <span
        className="btn btn-dark rounded-pill px-3 text-white"
        onClick={handleClick}
      >
        Guardar
      </span>
    </form>
  );
};
