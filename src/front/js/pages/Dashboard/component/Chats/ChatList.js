import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../../store/appContext";
import { Chat } from "./modal/Chat";

export const ChatList = () => {
  const { store } = useContext(Context);
  const [chatList, setChatList] = useState([]);
  const [openChat, setOpenChat] = useState(false);
  const [chatInfo, setChatInfo] = useState({
    id: "",
    name: "",
    surname: "",
    avatar: "",
  });
  const user = store.clientInfo;

  const getChatList = async () => {
    const resp = await fetch(`${store.BACKEND_URL}/api/chats/${user.id}`);
    const data = await resp.json();
    data && setChatList(data.results);
  };

  const handleOpenChat = (chatId, chatName, chatSurname, chatAvatar) => {
    setChatInfo({
      id: chatId,
      name: chatName,
      surname: chatSurname,
      avatar: chatAvatar,
    });
    setOpenChat(!openChat);
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
              onClick={() =>
                handleOpenChat(chat.id, user_name, user_surname, user_img)
              }
              key={chat.id}
              className="chat-card item-card mx-2 w-100 d-flex align-items-center gap-3 px-2 rounded"
            >
              <div className="item-card-img-container rounded-circle overflow-hidden bg-dark d-flex justify-content-center align-items-center">
                <img width="120px" src={user_img || "https://res.cloudinary.com/dpnb8zw1d/image/upload/v1680636124/user_vy0sxx.jpg"} />
              </div>
              <h3 className="fs-4 fw-bold">
                {user_name} {user_surname}
              </h3>
            </div>
          );
        })
      )}
      {openChat && (
        <Chat
          handleOpen={handleOpenChat}
          chatId={chatInfo.id}
          chatAvatar={chatInfo.avatar}
          chatName={chatInfo.name}
          chatSurname={chatInfo.surname}
        />
      )}
    </div>
  );
};
