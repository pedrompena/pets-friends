import React, { useContext, useState } from "react";
import { Context } from "../../../../../../store/appContext";

export const EditServiceForm = ({ handleOpenEditModal, item, getItems }) => {
  const { store, actions } = useContext(Context);
  const [image, setImage] = useState();
  const [checkBox, setCheckBox] = useState(true);
  const [serviceInfo, setServiceInfo] = useState({
    title: item.title,
    image: item.url,
    price: item.price,
    description: item.description,
    service_type: item.service_type,
    carer_id: store.clientInfo.id,
  });

  const saveService = async () => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serviceInfo),
    };
    const resp = await fetch(
      `${store.BACKEND_URL}api/services/${item.id}`,
      options
    );
    const data = await resp.json();
    console.log("dentro de async", data);
    getItems();
  };

  const handleClick = () => {
    saveService();
    handleOpenEditModal();
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const data = await actions.uploadImage(image)
    setServiceInfo({ ...serviceInfo, image: data.url})
    setCheckBox(false)
  };

  return (
    <form className="dashboard-form gap-3 p-3 w-100 d-flex flex-column align-items-center">
      <p>Edita el Servicio</p>
      <label className="fs-5 fw-bold">Nombre</label>
      <input
        className="col-8"
        value={serviceInfo.title}
        onChange={(e) =>
          setServiceInfo({ ...serviceInfo, title: e.target.value })
        }
      />
      <label className="fs-5 fw-bold">Descripción</label>
      <input
        className="col-8"
        value={serviceInfo.description}
        onChange={(e) =>
          setServiceInfo({ ...serviceInfo, description: e.target.value })
        }
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
      <select
        name="serviceType"
        value={serviceInfo.service_type}
        onChange={(e) =>
          setServiceInfo({ ...serviceInfo, service_type: e.target.value })
        }
      >
        <option>-- Selecciona el tipo de servicio --</option>
        <option value={1}>Paseo de 30 min</option>
        <option value={2}>Paseo de 1 hr</option>
        <option value={3}>Pijamada</option>
        <option value={4}>Personalizado</option>
      </select>
      <span
        className="btn btn-dark rounded-pill px-3 text-white"
        onClick={handleClick}
      >
        Guardar
      </span>
    </form>
  );
};
