import React from "react";

export const Gallery = () => {
  return (
    <div className="box gallery d-flex flex-wrap gap-3">
      <div className="d-flex align-items-center justify-content-center col-lg-5 img-about-container">
        <div
          id="carouselExampleInterval"
          data-bs-ride="carousel"
          className="carousel col-11 slide"
        >
          <div className="carousel-inner">
            <div className="carousel-item active" data-bs-interval="3000">
              <img
                src="https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                className="d-block w-100 rounded"
                alt="Gato"
              />
            </div>
            <div className="carousel-item" data-bs-interval="2000">
              <img
                src="https://images.unsplash.com/photo-1520808663317-647b476a81b9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1173&q=80"
                className="d-block w-100 rounded"
                alt="Pájaro"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1496943388386-e569e2b970a8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1127&q=80"
                className="d-block w-100 rounded"
                alt="Conejo"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1425082661705-1834bfd09dca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80"
                className="d-block w-100 rounded"
                alt="Hamster"
              />
            </div>
            <div className="carousel-item">
              <img
                src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                className="d-block w-100 rounded"
                alt="Perro"
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExampleInterval"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
      <div className="about-text d-flex flex-column justify-content-center col align-items-center">
        <h2 className="fw-bold fs-1">nuestra galería</h2>
        <p>
          ¿Tienes un gato, un pájaro, un conejo o un hamster que necesita ser
          cuidado? No hay ningún problema, en Pet Friends podrás encontrar
          cuidadores para todas tus mascotas.
        </p>
      </div>
    </div>
  );
};
