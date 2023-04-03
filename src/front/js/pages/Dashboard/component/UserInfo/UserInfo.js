import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../../store/appContext";
import { UserInfoModal } from "./modal/UserInfoModal";

export const UserInfo = ({ id }) => {
  const [user, setUser] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const { store, actions } = useContext(Context);
  const getUserInfo = async () => {
    const resp = await fetch(`${store.BACKEND_URL}/api/clients/${id}`);
    const data = await resp.json();
    actions.setLocalStorage(data.result);
    setUser(data.result);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };

  return (
    <div className="box profile-user-info d-flex flex-column justify-content-evenly align-items-center">
      <div className="user-img rounded-circle overflow-hidden d-flex align-items-center justify-content-center">
        <img width="250px" src={user.avatar} />
      </div>
      <div className="d-flex jutify-content-center align-items-center flex-column">
        <h2 className="w-100 text-center user-name fs-1 fw-bold">
          {user.name} {user.surname}
        </h2>
        <p className="text-muted fw-semibold"> {user.email}</p>
        <p className="text-muted fw-semibold">📍 {user.city}</p>
      </div>
      <p className="text-center">{user.description}</p>
      <button
        onClick={handleOpenModal}
        className="btn btn-dark px-3 rounded-pill"
      >
        Editar Perfil
      </button>
      {openModal && (
        <UserInfoModal
          handleOpenModal={handleOpenModal}
          getClientInfo={getUserInfo}
          user={user}
        />
      )}
    </div>
  );
};
