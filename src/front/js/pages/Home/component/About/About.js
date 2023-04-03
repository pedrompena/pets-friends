import React from "react";

export const About = () => {
  return (
    <div className="box d-flex flex-wrap gap-3">
      <div className="d-flex align-items-center justify-content-center col-lg-5 img-about-container">
        <img
          className="img-fluid rounded"
          src="https://image.europafm.com/clipping/cmsimages01/2021/10/17/062EC2FA-A697-438D-A069-C2D152AB7A29/98.jpg?crop=1920,1080,x0,y102&width=1900&height=1069&optimize=high&format=webply"
        />
      </div>
      <div className="about-text d-flex flex-column justify-content-center col align-items-center">
        <h2 className="fw-bold fs-1">sobre pets friends</h2>
        <p>
          ¿Necesitas una persona responsable y cuidadosa para cuidar de tus
          mascotas? ¡Estás en el lugar correcto!
        </p>
        <p>
          Pet Friends nació de tres amartes de los animales con necesidades como
          las tuyas! encontrar a un cuidador que mime y ame a nuestras mascotas
          como si fueran suyas.
        </p>
        <p>
          Ya sea que estés de vacaciones, viajando por negocios o simplemente no
          te gusta dejar a tu mascota en casa todo el día, déjala con alguien
          que realmente ame a los animales. Además de ofrecer atención
          especializada, te ofrecemos tranquilidad.
        </p>
      </div>
    </div>
  );
};
