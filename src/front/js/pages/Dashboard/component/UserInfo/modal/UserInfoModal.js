import React from "react";
import { UserForm } from "./Userform";
import "./userinfomodal.css";

export const UserInfoModal = ({ handleOpenModal, getClientInfo, clientInfo }) => {
  return (
    <div className="content">
      <div className="dashboard-box container mt-4 mb-4 p-3 d-flex flex-column align-items-center bg-white col-4 gap-3">
        <div className="w-100 d-flex justify-content-end">
          <i
            className="fa-solid fa-xmark p-2 close-button"
            onClick={handleOpenModal}
          ></i>
        </div>
        <UserForm getClientInfo={getClientInfo} handleOpenModal={handleOpenModal} clientInfo={clientInfo} />
      </div>
    </div>
  );
};
