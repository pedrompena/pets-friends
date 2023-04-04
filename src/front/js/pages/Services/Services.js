import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ServicesNav } from "./component/ServicesNav";

// FALTA CREAR ESTADO TRAIDO DE LA API

const listaServicios = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1567644495368-82cb64d087f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    title: "Paseo de medio dia",
    price: 15,
    description:
      "Paseo de media hora por zonas cercanas a tu hogar afdtgasgasd afgt asd asdfg asdf asd",
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

export const Services = () => {
  const [services, setServices] = useState([]);

  return (
    <div>
      <div className="service-header mt-5 d-flex justify-content-center align-items-center">
        <h2 className="text-center fw-bold text-white">servicios</h2>
      </div>
      <div className="box container mt-3 mb-3">
        <ServicesNav setServices={setServices} />
        <div className="d-flex flex-wrap justify-content-evenly align-items-center my-3 gap-3">
          {services?.map((service) => (
            <div
              key={service.id}
              className="position-relative card-service rounded-4 d-flex p-2 align-items-center gap-3"
            >
              <div className="card-img rounded-circle overflow-hidden d-flex justify-content-center align-items-center">
                <img
                  width="150px"
                  src={service.img}
                  alt={`Imagen para ${service.title}`}
                />
              </div>
              <div className="card-body">
                <div className="d-flex gap-2 align-items-center">
                  <p className="fw-bold">{service.title}</p>
                  <p className="text-warning fw-bold">€ {service.price}</p>
                </div>
                <p className="description">{service.description}</p>
              </div>
              <Link
                to={`/profile/${service.carer_id}`}
                className="profile-link text-decoration-none position-absolute w-100 h-100 bg-dark d-flex align-items-center justify-content-center"
              >
                <span className="text-white fs-4">
                  Ir al perfil del cuidador
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
