import React, { useContext, useState } from "react";
import { Context } from "../../../../../../store/appContext";

export const ServiceForm = ({ handleOpenModal }) => {
  const { store } = useContext(Context);
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
    const resp = await fetch(`${store.BACKEND_URL}api/services`, options);
    const data = await resp.json();
    console.log(data);
  };

  const handleClick = () => {
    addService();
    handleOpenModal();
  };

  return (
    <form className="dashboard-form gap-3 p-3 w-100 d-flex flex-column align-items-center">
      <label className="fs-5 fw-bold">Titulo</label>
      <input
        className="col-8"
        value={serviceInfo.title}
        onChange={(e) =>
          setServiceInfo({ ...serviceInfo, title: e.target.value })
        }
      />
      <label className="fs-5 fw-bold">Precio</label>
      <input
        className="col-8"
        value={serviceInfo.price}
        onChange={(e) =>
          setServiceInfo({ ...serviceInfo, price: e.target.value })
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
      <input
        className="col-8"
        value={serviceInfo.image}
        onChange={(e) =>
          setServiceInfo({ ...serviceInfo, image: e.target.value })
        }
      />
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
        save
      </a>
    </form>
  );
};
