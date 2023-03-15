import React, { useContext, useState } from "react";
import { Context } from "../../../../../store/appContext";

export const UserForm = ({ handleOpenModal, getClientInfo, clientInfo }) => {
  const { store, actions } = useContext(Context);
  const [city, setCity] = useState("");
  const [image, setImage] = useState("");
  const [checkBox, setCheckBox] = useState(true);
  const [userInfo, setUserInfo] = useState({
    roles: clientInfo.roles,
    name: clientInfo.name,
    surname: clientInfo.surname,
    email: clientInfo.email,
    avatar: clientInfo.avatar,
    description: clientInfo.description,
    password: clientInfo.password,
    city: clientInfo.city,
    latitude: clientInfo.latitude,
    longitude: clientInfo.longitude,
  });

  const changeCity = () => {
    setUserInfo({ ...userInfo, city: city.value });
    setUserInfo({
      ...userInfo,
      latitude: city.options[city.selectedIndex].getAttribute("data-latitud"),
    });
    setUserInfo({
      ...userInfo,
      longitude: city.options[city.selectedIndex].getAttribute("data-longitud"),
    });
  };

  const saveInfo = async () => {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    };
    const resp = await fetch(
      `${store.BACKEND_URL}api/clients/${store.clientInfo.id}`,
      options
    );
    const data = await resp.json();
    data && getClientInfo();
  };
  const handleClick = () => {
    saveInfo();
    handleOpenModal();
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    const data = await actions.uploadImage(image);
    setUserInfo({ ...userInfo, avatar: data.url });
    setCheckBox(false);
  };

  return (
    <form className="dashboard-form gap-3 p-3 w-100 d-flex flex-column align-items-center">
      <label className="fs-5 fw-bold">Nombre</label>
      <input
        className="col-8"
        value={userInfo.name}
        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
      />
      <label className="fs-5 fw-bold">Apellido</label>
      <input
        className="col-8"
        value={userInfo.surname}
        onChange={(e) => setUserInfo({ ...userInfo, surname: e.target.value })}
      />
      <label className="fs-5 fw-bold">Ciudad</label>
      <div className="desplegable">
        <select
          id="provincia"
          name="provincia"
          value={userInfo.city}
          onChange={(event) => {
            setCity(event.target), changeCity();
          }}
        >
          <option value="">-- Selecciona una provincia --</option>
          <option
            value="Álava"
            data-latitud="42.847831"
            data-longitud="-2.672338"
          >
            Álava
          </option>
          <option
            value="Albacete"
            data-latitud="38.997777"
            data-longitud="-1.860737"
          >
            Albacete
          </option>
          <option
            value="Alicante"
            data-latitud="38.345487"
            data-longitud="-0.483166"
          >
            Alicante
          </option>
          <option
            value="Almería"
            data-latitud="36.834047"
            data-longitud="-2.463713"
          >
            Almería
          </option>
          <option
            value="Asturias"
            data-latitud="43.361914"
            data-longitud="-5.849389"
          >
            Asturias
          </option>
          <option
            value="Ávila"
            data-latitud="40.656265"
            data-longitud="-4.700299"
          >
            Ávila
          </option>
          <option
            value="Badajoz"
            data-latitud="38.879449"
            data-longitud="-6.970657"
          >
            Badajoz
          </option>
          <option
            value="Barcelona"
            data-latitud="41.394768"
            data-longitud="2.078727"
          >
            Barcelona
          </option>
          <option
            value="Burgos"
            data-latitud="42.340873"
            data-longitud="-3.699731"
          >
            Burgos
          </option>
          <option
            value="Cáceres"
            data-latitud="39.476048"
            data-longitud="-6.372197"
          >
            Cáceres
          </option>
          <option
            value="Cádiz"
            data-latitud="36.524905"
            data-longitud="-6.288858"
          >
            Cádiz
          </option>
          <option
            value="Cantabria"
            data-latitud="43.182839"
            data-longitud="-3.987842"
          >
            Cantabria
          </option>
          <option
            value="Castellón"
            data-latitud="39.986068"
            data-longitud="-0.037647"
          >
            Castellón
          </option>
          <option
            value="Ciudad Real"
            data-latitud="38.986545"
            data-longitud="-3.929977"
          >
            Ciudad Real
          </option>
          <option
            value="Córdoba"
            data-latitud="37.891871"
            data-longitud="-4.819501"
          >
            Córdoba
          </option>
          <option
            value="Cuenca"
            data-latitud="40.071268"
            data-longitud="-2.134134"
          >
            Cuenca
          </option>
          <option
            value="Girona"
            data-latitud="41.981468"
            data-longitud="2.823611"
          >
            Girona
          </option>
          <option
            value="Granada"
            data-latitud="37.177336"
            data-longitud="-3.598557"
          >
            Granada
          </option>
          <option
            value="Guadalajara"
            data-latitud="40.629396"
            data-longitud="-3.166228"
          >
            Guadalajara
          </option>
          <option
            value="Guipúzcoa"
            data-latitud="43.158961"
            data-longitud="-2.330748"
          >
            Guipúzcoa
          </option>
        </select>
      </div>
      <label className="fs-5 fw-bold">Imagen</label>
      <div className="d-flex justify-content-center">
        <input
          className="col-8"
          type="file"
          onChange={(e) => handleChangeImage(e)}
        />
        {checkBox && (
          <i className="fa-solid fa-check" onClick={handleUpload}></i>
        )}
      </div>
      <label className="fs-5 fw-bold">Descripción</label>
      <input
        className="col-8"
        value={userInfo.description}
        onChange={(e) =>
          setUserInfo({ ...userInfo, description: e.target.value })
        }
      />
      <a
        className="btn btn-dark rounded-pill px-3 text-white"
        onClick={handleClick}
      >
        Guardar
      </a>
    </form>
  );
};
