import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./carer.css";
import { Context } from "../../../store/appContext";

export const Carer = () => {
  const { store } = useContext(Context);
  const [carer, setCarer] = useState("");
  const [services, setServices] = useState([]);
  const [image, setImage] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const getCarer = async () => {
    const resp = await fetch(`${store.BACKEND_URL}api/clients/${id}`);
    const data = await resp.json();
    setCarer(data.result);
  };

  const getServices = async () => {
    const resp = await fetch(`${store.BACKEND_URL}api/services_by_carer/${id}`);
    const data = await resp.json();
    setServices(data.results);
  };

  const getImage = async () => {
    const resp = await fetch(`${store.BACKEND_URL}api/gallery/${id}`);
    const data = await resp.json();
    setImage(data.results);
  };

  const handleChatClick = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_1_id: store.clientInfo.id,
        client_2_id: carer.id,
      }),
    };
    const resp = await fetch(store.BACKEND_URL + "api/chats", options);
    const data = await resp.json();
    data && navigate("/dashboard");
  };


  useEffect(() => {
    getCarer();
    getServices();
    getImage();
  }, []);

  return (
    <div className="container emp-profile">
      <form method="post">
        <div className="row">
          <div className="col-md-4">
            <div className="profile-img pt-4">
              <img src={carer?.avatar} alt="" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="profile-head">
              <h2>
                {carer?.name} {carer?.surname}
              </h2>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item">
                  <button
                    className="nav-link active"
                    id="nav-home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-home"
                    type="button"
                    role="tab"
                    aria-controls="nav-home"
                    aria-selected="true"
                  >
                    Sobre mí
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link"
                    id="nav-profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-profile"
                    type="button"
                    role="tab"
                    aria-controls="nav-profile"
                    aria-selected="false"
                  >
                    Servicios
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link"
                    id="nav-contact-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#nav-contact"
                    type="button"
                    role="tab"
                    aria-controls="nav-contact"
                    aria-selected="false"
                  >
                    Galería
                  </button>
                </li>
              </ul>
            </div>
            <div className="row">
              <div className="col-md-4">
                <div className="profile-work">
                  <h6>DATOS DE CONTACTO</h6>
                  <br />
                  <p>Nombre: {carer?.name}</p>
                  <p>Apellidos: {carer?.surname}</p>
                  <p>Email: {carer?.email}</p>
                  <p>Ciudad: {carer?.city}</p>
                  {store.clientInfo ? (
                    <a
                      className="btn btn-dark rounded-pill px-3 text-white"
                      role="button"
                      href="/#chat"
                      onClick={handleChatClick}
                    >
                      Abrir chat
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
            >
              <div className="row row-cols-1 row-cols-md-3 g-4">
                <div className="d-flex justify-content-start" id="cardspets">
                  {services?.map((service) => (
                    <div key={service.id} className="col">
                      <div className="ica">
                        <img src={service.image} className="card-img-top"></img>
                        <div className="card-body">
                          <p className="card-text">
                            {service.title}, {service.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="nav-contact"
              role="tabpanel"
              aria-labelledby="nav-contact-tab"
            >
              <div
                id="carouselExampleAutoplaying"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {image?.map((image) => (
                    <div key={image.id} className="carousel-item active">
                      <img
                        src={image?.url}
                        className="d-block w-80"
                        alt="..."
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleAutoplaying"
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
                  data-bs-target="#carouselExampleAutoplaying"
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
          </div>
        </div>
      </form>
    </div>
  );
};
