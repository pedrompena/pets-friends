import React, { useContext, useEffect, useState } from "react";
import { ServicesNav } from "./component/ServicesNav";
import { Context } from "../../store/appContext";

import "./servicios.css";
import { useNavigate, useParams } from "react-router-dom";

const listaServicios = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1567644495368-82cb64d087f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    title: "Paseo de medio dia",
    price: 15,
    description: "Paseo de media hora por zonas cercanas a tu hogar afdtgasgasd afgt asd asdfg asdf asd",
    carer_id: 1,
    city: "Badajoz",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1567644495368-82cb64d087f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    title: "Energía por una hora",
    price: 15,
    description: "Paseo para los mas traviesos",
    carer_id: 1,
    city: "Badajoz",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1567644495368-82cb64d087f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    title: "Energia por una hora",
    price: 15,
    description: "Paseo de una hora",
    carer_id: 1,
    city: "Alicante",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1567644495368-82cb64d087f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    title: "Energia por una hora",
    price: 15,
    description: "Paseo de una hora",
    carer_id: 1,
    city: "Alicante",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1567644495368-82cb64d087f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    title: "Energia por una hora",
    price: 15,
    description: "Paseo de una hora",
    carer_id: 1,
    city: "Alicante",
  },
  {
    id: 6,
    img: "https://images.unsplash.com/photo-1678446332674-27e494ebe44e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80",
    title: "Energia por una hora",
    price: 15,
    description: "Paseo de una hora",
    carer_id: 1,
    city: "Alicante",
  },
];

export const Servicios = () => {
  const { id } = useParams();
  const [city, setCity] = useState("");
  const [serviceType, setServiceType] = useState(id);
  const [url, setUrl] = useState("");
  const [servicesList, setServicesList] = useState([]);
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const getServices = async (url) => {
    const resp = await fetch(url);
    const data = await resp.json();
    setServicesList(data.results);
    console.log(data.results);
  };

  const buildUrl = () => {
    let baseUrl = `${store.BACKEND_URL}api/services`;
    if (serviceType !== "" && city !== "") {
      baseUrl += "?service_type=" + serviceType + "&city=" + city;
    } else if (serviceType !== "" && city === "") {
      baseUrl += "?service_type=" + serviceType;
    } else if (serviceType === "" && city !== "") {
      baseUrl += "?city=" + city;
    }
    setUrl(baseUrl);
  };

  useEffect(() => {
    buildUrl();
  }, [serviceType, city]);

  useEffect(() => {
    getServices(url);
  }, [url]);

  const handleClick = (id) => {
    navigate(`/carer/${id}`);
  };

  return (
    <div className="mt-4">
      <section id="header" className="jumbotron text-center">
        <h3 className="display-3">Servicios</h3>
        <h5 className="aaa fs-4">Encuentra al cuidador que más te guste</h5>
        <ServicesNav setCity={setCity} setServiceType={setServiceType} />
      </section>
      <section className="container pb-4">
        <div className="d-flex flex-wrap gap-5 mx-5 justify-content-center">
          {servicesList?.map((service) => (
            <div
              key={service.id}
              className="service-element p-3 d-flex aling-items-center justify-content-evenly mb-2 bg-white w-100"
            >
              <div className="card-img-container h-100 d-flex justify-content-center align-items-center">
                <img className="img-fluid card-img" src={service.img} />
              </div>
              <div className="w-100 text-center d-flex flex-column justify-content-evenly px-3">
                <p className="card-title fs-2 fw-bold">{service.title}</p>
                <p className="card-text card-price fw-bold fs-5 p-3">{service.price} €</p>
                <p className="card-text fs-5">{service.description}</p>
                <a 
                className="card-button bg-dark text-white"
                onClick={() => handleClick(service.carer_id)}
                >
                  <span className="fs-2 fw-bold">Contactar</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
