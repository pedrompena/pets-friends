import React, { useContext } from "react";
import { Context } from "../../../../../store/appContext";
import { Modal } from "../../Modal";
import { PetForm } from "./PetForm";
import { ServiceForm } from "./ServiceForm";

export const ServicesPetsModal = ({ item, handleOpen, getItems }) => {
  const { store } = useContext(Context);

  const user = store.clientInfo;

  return (
    <Modal handleOpen={handleOpen}>
      {user.rol === "carer" ? (
        <ServiceForm handleOpen={handleOpen} getItems={getItems} item={item} />
      ) : (
        <PetForm handleOpen={handleOpen} getItems={getItems} item={item} />
      )}
    </Modal>
  );
};
