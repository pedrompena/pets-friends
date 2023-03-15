import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../../store/appContext";
import { ServicesPetsModal } from "./modal/ServicesPetsModal";
import { EditPetsModal } from "./modal/EditPetsModal";
import "./servicespets.css";

export const ServicesPets = () => {
  const { store, actions } = useContext(Context);
  const [items, setItems] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [editing, setEditing] = useState([]);

  const urlAltPet =
    "https://cdn.pixabay.com/photo/2021/01/23/07/53/dogs-5941898_1280.jpg";
  const urlAltService =
    "https://img.interempresas.net/FotosArtProductos/P138118.jpg";

  const getItems = async () => {
    let url;
    /*llama a la API de pets por owner o por carer y se almacena en items*/
    if (store.clientInfo.roles === "Owner") {
      url = `api/pets_by_owner/${store.clientInfo.id}`;
    } else {
      url = `api/services_by_carer/${store.clientInfo.id}`;
    }
    const resp = await fetch(`${store.BACKEND_URL}${url}`);
    const data = await resp.json();
    setItems(data.results);
    console.log("LLamando a items", items);
  };

  const deletePet = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify("hemos hecho borrado"),
    };
    const resp = await fetch(`${store.BACKEND_URL}api/pets/${id}`, options);
    const data = await resp.json();

    /*Si todo esta bien data=OK*/
    console.log("hemos borrado mascota", data);
  };

  const deleteService = async (id) => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify("hemos hecho borrado de servicio"),
    };
    const resp = await fetch(`${store.BACKEND_URL}api/services/${id}`, options);
    const data = await resp.json();

    /*Si todo esta bien data=OK*/
    console.log("hemos borrado mascota", data);
  };
  /*Debe hacer solo una llamada*/
  useEffect(() => {
    actions.setClientInfo();
    getItems();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  const handleOpenEditModal = (item) => {
    console.log(" ANTES dentro handleOpenEditModal", item);
    setEditing(item);
    console.log(" DESPUES dentro handleOpenEditModal", editing);
    console.log(" DESPUES dentro OpenEditModal", openEditModal);
    setOpenEditModal(!openEditModal);
    console.log(" DESPUES dentro OpenEditModal", openEditModal);
  };

  /*Borra pet o service*/
  const handleDeleteModal = (item) => {
    /*Borra pet-service del listado*/
    let newItems = items.filter((it) => it !== item);
    setItems(newItems);
    /*Borra pet o service de la api*/
    store.clientInfo?.roles === "Owner"
      ? deletePet(item.id)
      : deleteService(item.id);
  };

  return openEditModal ? (
    <EditPetsModal
      handleOpenEditModal={handleOpenEditModal}
      itemPet={editing}
      getItems={getItems}
    />
  ) : (
    <div className="dashboard-box container mt-5 mb-4 p-3 d-flex flex-column align-items-center bg-white">
      <p className="fs-4 fw-bold">
        {store.clientInfo?.roles === "Owner" ? "Mis Mascotas" : "Mis Servicios"}
      </p>
      <div className="w-100">
        {items.map((item, i) => (
          <div
            key={i}
            className="p-2 d-flex mb-2 pet-service-card d-flex align-items-center"
          >
            <div className="img-container mr-2 col-3">
              {store.clientInfo?.roles === "Owner" ? (
                <img
                  className="img-fluid rounded-circle"
                  src={item.image ? item.image : urlAltPet}
                />
              ) : (
                <img
                  className="img-fluid rounded-circle"
                  src={item.image ? item.image : urlAltService}
                />
              )}
            </div>
            <div className="col-8">
              {store.clientInfo?.roles === "Owner" ? (
                <p className="fs-4">{item.name}</p>
              ) : (
                <div className="d-flex justify-content-between align-items-center">
                  <p className="fs-4 fw-bold">{item.title}</p>
                  <p className="fs-5">{item.price}€</p>
                </div>
              )}
              <p className="fs-5">{item.description}</p>
            </div>

            <div className="d-flex flex-column justify-content-center align-items-center gap-2 actions">
              <i
                className="fas fa-edit fs-3"
                onClick={() => handleOpenEditModal(item)}
              ></i>
              <i
                className="fas fa-trash fs-3"
                onClick={() => handleDeleteModal(item)}
              ></i>
            </div>
          </div>
        ))}
        <div className="p-4 d-flex mb-2 pet-service-card col-12 justify-content-center">
          <i
            className="fa-solid fa-circle-plus fs-1 add"
            onClick={handleOpenModal}
          ></i>
        </div>
      </div>
      {openModal && (
        <ServicesPetsModal
          getItems={getItems}
          handleOpenModal={handleOpenModal}
        />
      )}
    </div>
  );
};
