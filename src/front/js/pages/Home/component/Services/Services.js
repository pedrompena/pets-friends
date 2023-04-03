import React from "react";
import { Link } from "react-router-dom";

const servicesList = [
  {
    id: 1,
    title: "Paseo de mediodía",
    img: "https://images.unsplash.com/photo-1637441607612-43944d988e5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80",
    description: "Paseo por zonas cercanas a tu hogar",
    duration: "30 min",
  },
  {
    id: 2,
    title: "Energía por una hora",
    img: "https://images.unsplash.com/photo-1514984879728-be0aff75a6e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1084&q=80",
    description: "Paseo para los mas traviesos",
    duration: "1 h",
  },
  {
    id: 3,
    title: "Pijamada perruna",
    img: "https://images.unsplash.com/photo-1601758063541-d2f50b4aafb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1105&q=80",
    description: "Cuidado integral de tu mascota",
    duration: "8 h",
  },
  {
    id: 4,
    title: "Servicios Personalizados",
    img: "https://images.unsplash.com/photo-1567644495368-82cb64d087f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80",
    description: "Servicios creados por nuestros paseadores para tu mascota",
  },
];

export const Services = () => {
  return (
    <div className="box services ">
      <h2 className="fs-1 fw-bold text-center mb-3">nuestros servicios</h2>
      <div className="d-flex flex-wrap gap-3 align-items-center justify-content-evenly">
        {servicesList.map((service) => (
          <div
            key={service.id}
            className="position-relative service-card d-flex rounded justify-content-between"
          >
            <div className="d-flex">
              <img
                width="200px"
                height="180px"
                className="object-fit-cover rounded h-100"
                src={service.img}
                alt={`imagen para el servicio ${service.title}`}
              />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center w-100 px-3">
              <h3 className="fw-bold fs-1 text-center">{service.title}</h3>
              <span className="text-center mb-3">{service.description}</span>
            </div>
            <Link
              to="/services"
              className="text-decoration-none position-absolute conect w-100 h-100 rounded bg-dark d-flex justify-content-center align-items-center"
            >
              <span className="fs-1 fw-semibold text-white">
                Conecta con un cuidador
              </span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
