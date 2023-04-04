import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../../store/appContext";

export const ChatList = () => {
  const { store } = useContext(Context);
  const [chatList, setChatList] = useState([]);
  const user = store.clientInfo;

  const getChatList = async () => {
    const resp = await fetch(`${store.BACKEND_URL}/api/chats/${user.id}`);
    const data = await resp.json();
    data && setChatList(data.results);
  };

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <div className="box d-flex flex-column gap-2 flex-wrap justify-content-evenly align-items-center">
      <h2 className="fw-bold fs-1 items-title">mensajes</h2>
      {chatList.length < 1 ? (
        <div className="non-chat">
          <i className="fa-regular fa-comments"></i> Aun no tienes ningun chat!
        </div>
      ) : (
        chatList?.map((chat) => {
          const user_name =
            chat.client_1_name === user.name
              ? chat.client_2_name
              : chat.client_1_name;

          const user_surname =
            chat.client_1_surname === user.surname
              ? chat.client_2_surname
              : chat.client_1_surname;

          const user_img =
            chat.client_1_avatar === user.avatar
              ? chat.client_2_avatar
              : chat.client_1_avatar;

          return (
            <div
              key={chat.id}
              className="item-card mx-2 w-100 d-flex align-items-center gap-3 px-2 rounded"
            >
              <div className="item-card-img-container rounded-circle overflow-hidden bg-dark d-flex justify-content-center align-items-center">
                <img width="120px" src={user_img} />
              </div>
              <h3 className="fs-4 fw-bold">
                {user_name} {user_surname}
              </h3>
            </div>
          );
        })
      )}
    </div>
  );
};
