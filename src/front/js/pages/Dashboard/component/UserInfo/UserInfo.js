import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../../store/appContext";
import { UserInfoModal } from "./modal/UserInfoModal";
import "./userinfo.css";

export const UserInfo = ({ id }) => {
  const [clientInfo, setClientInfo] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const { store, actions } = useContext(Context);
  const getClientInfo = async () => {
    const resp = await fetch(`${store.BACKEND_URL}api/clients/${id}`);
    const data = await resp.json();
    actions.setLocalStorage(data.result)
    setClientInfo(data.result);
  };
 
  useEffect(() => {
    getClientInfo()
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="dashboard-box container mt-4 mb-4 py-5 gap-3 d-flex flex-column align-items-center bg-white">
      <div className="img-container" id="iContainer">
        <img className="img-fluid rounded-circle" src={clientInfo.avatar} />
      </div>
      <p className="fs-2 fw-bold">
        {clientInfo.name} {clientInfo.surname},{" "}
        <span className="text-muted fs-5">{clientInfo.city}</span>
      </p>
      <p className="fs-4 text-muted">{clientInfo.email}</p>
      <p className="fs-5">{clientInfo.description}</p>
      <a
        className="btn btn-dark text-white rounded-pill px-3 mb-2 fs-5"
        onClick={handleOpenModal}
      >
        Editar Perfil
      </a>
      {openModal && <UserInfoModal handleOpenModal={handleOpenModal} getClientInfo={getClientInfo} clientInfo={clientInfo} />}
    </div>
  );
};
