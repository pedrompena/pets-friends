import React, { useContext, useState } from "react";
import { Context } from "../../../../../../store/appContext";

export const EditServiceForm = ({ handleOpenEditModal, item ,getItems }) => {
  const { store } = useContext(Context);
  const [serviceInfo, setServiceInfo] = useState({
    title: item.title,
    image: item.url,
    price: item.price,
    description: item.description,
    service_type: item.service_type,
    carer_id: store.clientInfo.id,
  })

  const saveService = async () => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serviceInfo)
    };
    const resp = await fetch(`${store.BACKEND_URL}api/services/${item.id}`, options);
    const data = await resp.json();
    console.log("dentro de async",data);
  };

  const handleClick = () => {
    saveService();
    getItems(); 
    handleOpenEditModal();
  };

  return (
    <form className="dashboard-form gap-3 p-3 w-100 d-flex flex-column align-items-center">
      <p>Edita el Servicio</p>
      <label className="fs-5 fw-bold">Nombre</label>
      <input
        className="col-8"
        value={serviceInfo.title}
        onChange={(e) => setServiceInfo({ ...serviceInfo, title: e.target.value })}
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
