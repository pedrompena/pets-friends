import React, { useContext, useState } from "react";
import { Context } from "../../../../../../store/appContext";

export const PetForm = ({ handleOpenModal }) => {
  const { store } = useContext(Context);
  const [petInfo, setPetInfo] = useState({
    name: "",
    image: "",
    description: "",
    owner_id: store.clientInfo.id,
  });

  const addPet = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petInfo),
    };
    const resp = await fetch(`${store.BACKEND_URL}api/pets`, options);
    const data = await resp.json();
    console.log(data);
  };

  const handleClick = () => {
    addPet();
    handleOpenModal();
  };

  return (
    <form className="dashboard-form gap-3 p-3 w-100 d-flex flex-column align-items-center">
      <label className="fs-5 fw-bold">Nombre</label>
      <input
        className="col-8"
        value={petInfo.name}
        onChange={(e) => setPetInfo({ ...petInfo, name: e.target.value })}
      />
      <label className="fs-5 fw-bold">Imagen</label>
      <input
        className="col-8"
        value={petInfo.image}
        onChange={(e) => setPetInfo({ ...petInfo, image: e.target.value })}
      />
      <label className="fs-5 fw-bold">Descripción</label>
      <input
        className="col-8"
        value={petInfo.description}
        onChange={(e) =>
          setPetInfo({ ...petInfo, description: e.target.value })
        }
      />
      <a
        className="btn btn-dark rounded-pill px-3 text-white"
        onClick={handleClick}
      >
        Guardar
      </a>
    </form>
  );
};
