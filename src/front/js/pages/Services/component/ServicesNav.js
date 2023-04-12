import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../store/appContext";

// FALTA HACER PETICION PARA TRAER INFO FILTRADA

export const ServicesNav = ({ setServices }) => {
  const [filters, setFilters] = useState({
    city: "",
    type: "",
  });
  const { store } = useContext(Context);

  const hanldeChangeCity = (e) => {
    setFilters({ ...filters, city: e.target.value });
  };

  const handleChangeType = (e) => {
    setFilters({ ...filters, type: e.target.value });
  };

  const getServices = async () => {
    if (filters.city !== "" || filters.type !== "") {
      let url = `${store.BACKEND_URL}/api/services`;
      if (filters.type !== "" && filters.city !== "") {
        url += "?service_type=" + filters.type + "&city=" + filters.city;
      } else if (filters.type !== "" && filters.city === "") {
        url += "?service_type=" + filters.type;
      } else if (filters.type === "" && filters.city !== "") {
        url += "?city=" + filters.city;
      }
      console.log(url);
      const resp = await fetch(url);
      const data = await resp.json();
      data && setServices(data.results)
    }
    return;
  };

  useEffect(() => {
    getServices();
  }, [filters]);

  return (
    <div className="service-nav w-100 d-flex flex-wrap justify-content-evenly">
      <div className="d-flex flex-column px-3">
        <label className="fw-bold fs-5">Ciudad</label>
        <select className="p-2 rounded" onChange={hanldeChangeCity}>
          <option value="">Selecciona una ciudad</option>
          <option value="Madrid">Madrid</option>
          <option value="Barcelona">Barcelona</option>
          <option value="Valencia">Valencia</option>
          <option value="Sevilla">Sevilla</option>
          <option value="Zaragoza">Zaragoza</option>
          <option value="Málaga">Málaga</option>
          <option value="Murcia">Murcia</option>
          <option value="Palma">Palma de Mallorca</option>
          <option value="Las Palmas">Las Palmas de Gran Canaria</option>
          <option value="Bilbao">Bilbao</option>
        </select>
      </div>
      <div className="d-flex flex-column px-3">
        <label className="fw-bold fs-5">Tipo de servicio</label>
        <select className="p-2 rounded" onChange={handleChangeType}>
          <option value="">Selecciona un tipo de servicio</option>
          <option value="type_1">Paseo de 30 min</option>
          <option value="type_2">Paseo de 1 h</option>
          <option value="type_3">Pijamada perruna</option>
          <option value="type_4">Servicio personalizado</option>
        </select>
      </div>
    </div>
  );
};
