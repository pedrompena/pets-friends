import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";

// const user = {
//   id: 2,
//   name: "Pedro",
//   surname: "Peña",
//   img: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80",
//   city: "Madrid",
//   description:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse ipsum dolor, sagittis sed est et, facilisis ultricies orci.",
//   rol: "carer",
// };

// const userServices = [
//   {
//     id: 1,
//     img: "https://images.unsplash.com/photo-1591225721994-8dec7e2c7ffc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80",
//     title: "Paseo de una hora",
//     description: "una breve descripción del servicio a ofrecer",
//     price: 15,
//   },
//   {
//     id: 2,
//     img: "https://images.unsplash.com/photo-1611601303737-6496949997cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//     title: "Paseo de 30 minutos",
//     description: "una breve descripción del servicio a ofrecer",
//     price: 10,
//   },
// ];

export const Profile = () => {
  const { id } = useParams();
  const { store } = useContext(Context);
  const [user, setUser] = useState({});
  const [userItems, setUserItems] = useState([]);
  const navigate = useNavigate();

  const getUserItems = async (userInfo) => {
    let url;
    if (userInfo.rol === "carer") {
      url = `${store.BACKEND_URL}/api/services_by_carer/${userInfo.id}`;
    } else {
      url = `${store.BACKEND_URL}/api/pets_by_owner/${userInfo.id}`;
    }
    const resp = await fetch(url);
    const data = await resp.json();
    data && setUserItems(data.results);
  };

  const getProfileInfo = async () => {
    const resp = await fetch(`${store.BACKEND_URL}/api/clients/${id}`);
    const data = await resp.json();
    data && setUser(data.result);
    data && getUserItems(data.result);
  };

  const openChat = async () => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_1_id: store.clientInfo.id,
        client_2_id: user.id,
      }),
    };
    const resp = await fetch(`${store.BACKEND_URL}/api/chats`, options);
    const data = await resp.json();
    data && navigate("/dashboard");
  };

  useEffect(() => {
    getProfileInfo();
  }, []);

  return (
    <div
      style={{ height: "100vh" }}
      className="mt-5 d-flex justify-content-center align-items-center"
    >
      <div className="container d-flex flex-wrap justify-content-center gap-3 aling-items-center">
        <div className="box profile-user-info d-flex flex-column justify-content-evenly align-items-center">
          <div className="user-img rounded-circle overflow-hidden d-flex align-items-center justify-content-center">
            <img
              width="250px"
              src={
                user.avatar ||
                "https://res.cloudinary.com/dpnb8zw1d/image/upload/v1680636124/user_vy0sxx.jpg"
              }
            />
          </div>
          <div className="d-flex jutify-content-center align-items-center flex-column">
            <h2 className="w-100 text-center user-name fs-1 fw-bold">
              {user.name} {user.surname}
            </h2>
            <p className="text-muted fw-semibold">{user.city}</p>
          </div>
          <p className="text-center">{user.description}</p>
          {user.rol === "carer" && (
            <button
              onClick={openChat}
              className="btn btn-dark px-3 rounded-pill"
            >
              Enviar Mensaje
            </button>
          )}
        </div>
        <div className="box profile-user-content d-flex flex-column">
          <h2 className="w-100 text-center fs-1 fw-bold">
            {user.rol === "carer" ? "servicios" : "mascotas"}
          </h2>
          <div className="d-flex gap-2 flex-wrap justify-content-evenly align-items-center">
            {userItems.map((item) =>
              user.rol === "carer" ? (
                <div
                  key={item.id}
                  className="item-card mx-2 w-100 d-flex align-items-center gap-2 px-2 rounded"
                >
                  <div className="item-card-img-container rounded-circle overflow-hidden bg-dark d-flex justify-content-center align-items-center">
                    <img
                      width="120px"
                      src={
                        item.image ||
                        "https://res.cloudinary.com/dpnb8zw1d/image/upload/v1680636392/14669667_5508800_arspvr.jpg"
                      }
                    />
                  </div>
                  <div className="w-100">
                    <div className="w-100 d-flex justify-content-around">
                      <h3 className="fs-6 fw-bold">{item.title}</h3>
                      <p className="text-warning">€ {item.price}</p>
                    </div>
                    <p className="text-center">{item.description}</p>
                  </div>
                </div>
              ) : (
                <div
                  key={item.id}
                  className="item-card mx-2 w-100 d-flex align-items-center gap-2 px-2 rounded"
                >
                  <div className="item-card-img-container rounded-circle overflow-hidden bg-dark d-flex justify-content-center align-items-center">
                    <img
                      width="120px"
                      src={
                        item.image ||
                        "https://res.cloudinary.com/dpnb8zw1d/image/upload/v1680636392/14669667_5508800_arspvr.jpg"
                      }
                    />
                  </div>
                  <div className="w-100">
                    <div className="w-100 d-flex justify-content-around">
                      <h3 className="fs-6 fw-bold">{item.name}</h3>
                    </div>
                    <p className="text-center">{item.description}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
