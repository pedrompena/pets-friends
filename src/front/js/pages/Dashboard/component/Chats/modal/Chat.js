import React, { useContext, useEffect, useState, useRef } from "react";
import { SocketContext } from "../../../../../socket";
import { Context } from "../../../../../store/appContext";

export const Chat = ({
  handleOpenModal,
  chatId,
  chatName,
  chatSurname,
  chatAvatar,
}) => {
  const { store } = useContext(Context);
  const socket = useContext(SocketContext);
  const [messages, setMessages] = useState();
  const [newMessage, setNewMessage] = useState({
    chat_id: chatId,
    date: "",
    content: "",
    client_id: store.clientInfo.id,
  });
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollTop = divRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = () => {
    socket.emit("send_message", newMessage);
    setNewMessage({ ...newMessage, content: "" });
  };

  useEffect(() => {
    socket.emit("get_chat_history", { chat_id: chatId });
    socket.emit("join", { client_id: store.clientInfo.id, chat_id: chatId });
  }, []);

  useEffect(() => {
    socket.on("new_message", () => {
      socket.emit("get_chat_history", { chat_id: chatId});
    });

    socket.on("chat_history", (data) => {
      setMessages(data.messages);
    });
  });

  return (
    <div className="content">
      <div className="dashboard-box container mt-4 mb-4 p-3 d-flex flex-column align-items-center bg-white col-4 gap-3">
        <div className="w-100 d-flex justify-content-between">
          <div className="col-10 d-flex align-items-center gap-3">
            <div className="avatar d-flex justify-content-center">
              <img className="rounded-circle h-100" src={chatAvatar} />
            </div>
            <span className="fs-4 fw-bold ml-3">
              {chatName} {chatSurname}
            </span>
          </div>
          <i
            className="fa-solid fa-xmark p-2 close-button"
            onClick={handleOpenModal}
          ></i>
        </div>
        <div
          ref={divRef}
          className="chat-box messages w-100 d-flex flex-column gap-3 p-3"
        >
          {!messages || messages.length < 1 ? (
            <span className="bg-dark text-white rounded-pill p-3 mx-auto">
              Aun no hay ningun mensaje!
            </span>
          ) : (
            messages
              .sort((a, b) => a.id - b.id)
              .map((message) => {
                if (message.client_id === store.clientInfo.id) {
                  return (
                    <div
                      key={message.id}
                      className="message px-3 py-1 bg-white align-self-end"
                    >
                      {message.content}
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={message.id}
                      className="message px-3 py-1 bg-dark text-white align-self-start"
                    >
                      {message.content}
                    </div>
                  );
                }
              })
          )}
        </div>
        <div className="d-flex w-100">
          <textarea
            className="text-message col-10"
            value={newMessage.content}
            onChange={(e) =>
              setNewMessage({
                ...newMessage,
                content: e.target.value,
                date: new Date().toString(),
              })
            }
          />
          <a
            onClick={sendMessage}
            className="btn btn-dark text-white col-2 d-flex align-items-center justify-content-center"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </a>
        </div>
      </div>
    </div>
  );
};
