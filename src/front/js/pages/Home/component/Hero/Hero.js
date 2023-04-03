import React from "react";
import header from "../../../../../img/header.png";

export const Hero = () => {
  return (
    <div
      id="Hero"
      className="d-flex w-100 flex-column align-items-center postion-relative py-5"
    >
      <img className="position absolute" src={header} alt="pets friends logo" />
      <h1 className="fw-bold hero-title mt-0">Pet Friends</h1>
      <p className="fs-4 hero-subtitle">Amigos de tus mascotas</p>
    </div>
  );
};
