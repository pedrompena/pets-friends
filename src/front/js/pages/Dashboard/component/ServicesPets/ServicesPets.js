import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../../store/appContext";
import { ServicesPetsModal } from "./modal/ServicesPetsModal";

export const ServicesPets = () => {
  const { store, actions } = useContext(Context);
  const [items, setItems] = useState([]);
  const [editItemInfo, setEditItemInfo] = useState({
    onEdit: null,
    isEditing: false,
  });

  const user = store.clientInfo;

  const getItems = async () => {
    let url;
    if (user.rol !== "carer") {
      url = `/api/pets_by_owner/${user.id}`;
    } else {
      url = `/api/services_by_carer/${user.id}`;
    }

    const resp = await fetch(`${store.BACKEND_URL}${url}`);
    const data = await resp.json();
    setItems(data.results);
  };

  const deleteItem = async (id) => {
    let url;
    if (user.rol !== "carer") {
      url = `/api/pets/${id}`;
    } else {
      url = `/api/services/${id}`;
    }

    const options = {
      method: "DELETE",
    };

    const resp = await fetch(`${store.BACKEND_URL}${url}`, options);
    const data = await resp.json();
    data && getItems();
  };

  const handleOpenItemInfo = (item) => {
    item
      ? setEditItemInfo({ onEdit: item, isEditing: !editItemInfo.isEditing })
      : setEditItemInfo({
          ...editItemInfo,
          isEditing: !editItemInfo.isEditing,
        });
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className="box d-flex gap-2 flex-wrap justify-content-evenly align-items-center">
      <h2 className="items-title fw-bold fs-1">
        {user?.rol === "carer" ? "mis servicios" : "mis mascotas"}
      </h2>
      {items?.map((item) =>
        item.price ? (
          <div
            key={item.id}
            className="position-relative item-card mx-2 w-100 d-flex align-items-center gap-2 px-2 rounded"
          >
            <div className="item-card-img-container rounded-circle overflow-hidden bg-dark d-flex justify-content-center align-items-center">
              <img
                width="120px"
                src={
                  item.image ||
                  "https://res.cloudinary.com/dpnb8zw1d/image/upload/v1680636392/14669667_5508800_arspvr.jpg"
                }
              />
            </div>
            <div className="w-100">
              <div className="d-flex justify-content-around">
                <h3 className="fs-6 fw-bold">{item.title}</h3>
                <p className="text-warning">€ {item.price}</p>
              </div>
              <p className="text-center">{item.description}</p>
            </div>
            <div className="actions position-absolute d-flex flex-column justify-content-evenly align-items-center gap-4">
              <i
                onClick={() => handleOpenItemInfo(item)}
                className="fas fa-edit fs-4"
              ></i>
              <i
                onClick={() => deleteItem(item.id)}
                className="fas fa-trash fs-4"
              ></i>
            </div>
          </div>
        ) : (
          <div
            key={item.id}
            className="position-relative item-card mx-2 w-100 d-flex align-items-center gap-2 px-2 rounded"
          >
            <div className="item-card-img-container rounded-circle overflow-hidden bg-dark d-flex justify-content-center align-items-center">
              <img
                height="120px"
                src={
                  item.image ||
                  "https://res.cloudinary.com/dpnb8zw1d/image/upload/v1680636392/14669667_5508800_arspvr.jpg"
                }
              />
            </div>
            <div className="w-100">
              <div className="d-flex justify-content-around">
                <h3 className="fs-6 fw-bold">{item.name}</h3>
              </div>
              <p className="text-center">{item.description}</p>
            </div>
            <div className="actions position-absolute d-flex flex-column justify-content-evenly align-items-center gap-4">
              <i
                onClick={() => handleOpenItemInfo(item)}
                className="fas fa-edit fs-4"
              ></i>
              <i
                onClick={() => deleteItem(item.id)}
                className="fas fa-trash fs-4"
              ></i>
            </div>
          </div>
        )
      )}
      <div className="item-card mx-2 w-100 d-flex align-items-center justify-content-center rounded">
        <i
          onClick={handleOpenItemInfo}
          className="fa-solid fa-circle-plus add"
        ></i>
      </div>
      {editItemInfo.isEditing && (
        <ServicesPetsModal
          user={user}
          getItems={getItems}
          item={editItemInfo.onEdit}
          handleOpen={handleOpenItemInfo}
        />
      )}
    </div>
  );
};
