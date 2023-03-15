import React, { useContext } from "react";
import { Context } from "../../../../../store/appContext";
import { PetForm } from "./component/PetForm";
import { ServiceForm } from "./component/ServiceForm";
import "./servicespetsmodal.css";

export const ServicesPetsModal = ({ handleOpenModal, getItems }) => {
  const { store } = useContext(Context);
  return (
    <div className="content">
      <div className="dashboard-box container mt-4 mb-4 p-3 d-flex flex-column align-items-center bg-white col-4 gap-3">
        <div className="w-100 d-flex justify-content-end">
          <i
            className="fa-solid fa-xmark p-2 close-button"
            onClick={handleOpenModal}
          ></i>
        </div>
        {store.clientInfo.roles === "Owner" ? (
          <PetForm handleOpenModal={handleOpenModal} getItems={getItems} />
          ) : (
          <ServiceForm handleOpenModal={handleOpenModal} getItems={getItems} />
        )}
      </div>
    </div>
  );
};
