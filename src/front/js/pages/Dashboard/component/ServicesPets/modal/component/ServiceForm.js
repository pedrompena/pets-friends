import React, { useContext, useState } from "react";
import { Context } from "../../../../../../store/appContext";

export const ServiceForm = ({ handleOpenModal, getItems }) => {
  const { store, actions } = useContext(Context);
  const [checkBox, setCheckBox] = useState(true);
  const [image, setImage] = useState();
  const [serviceInfo, setServiceInfo] = useState({
    title: "",
    price: "",
    description: "",
    service_type: "",
    image: "",
    carer_id: store.clientInfo.id,
  });

  const addService = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serviceInfo),
    };
    try {
      const resp = await fetch(`${store.BACKEND_URL}api/services`, options);
      const data = await resp.json();
      if (data) getItems();
    } catch (error) {
      console.error("Hay un error en el metodo", error);
    }
  };

  const handleClick = () => {
    addService();
    handleOpenModal();
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const data = await actions.uploadImage(image);
    setServiceInfo({ ...serviceInfo, image: data.url });
    setCheckBox(false);
  };

  return (
    <form className="dashboard-form gap-3 p-3 w-100 d-flex flex-column align-items-center">
      <label className="fs-5 fw-bold">Titulo</label>
      <input
        type="text"
        className="col-8"
        value={serviceInfo.title}
        onChange={(e) =>
          setServiceInfo({ ...serviceInfo, title: e.target.value })
        }
      />

      <label className="fs-5 fw-bold">Precio</label>
      <input
        className="col-8"
        type="number"
        value={serviceInfo.price}
        onChange={(e) =>
          setServiceInfo({ ...serviceInfo, price: e.target.value })
        }
      />
      <label className="fs-5 fw-bold">Descripción</label>
      <input
        type="text"
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
      <a
        className="btn btn-dark rounded-pill px-3 text-white"
        onClick={handleClick}
      >
        Guardar
      </a>
    </form>
  );
};
