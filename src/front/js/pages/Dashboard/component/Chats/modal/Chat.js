import React, { useContext, useEffect, useState, useRef } from "react";
import { SocketContext } from "../../../../../socket";
import { Context } from "../../../../../store/appContext";
import { Modal } from "../../Modal";

export const Chat = ({
  handleOpen,
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
      socket.emit("get_chat_history", { chat_id: chatId });
    });

    socket.on("chat_history", (data) => {
      setMessages(data.messages);
    });
  });

  return (
    <Modal handleOpen={handleOpen}>
      <div className="d-flex gap-3 align-items-center h-100">
        <div className="chat-avatar overflow-hidden rounded-circle">
          <img
            width="60px"
            src={chatAvatar || "https://res.cloudinary.com/dpnb8zw1d/image/upload/v1680636124/user_vy0sxx.jpg"}
          />
        </div>
        <span className="chat-title fw-bold fs-5">{chatName} {chatSurname}</span>
      </div>
      <div ref={divRef} className="chat-box mt-3 p-3 gap-2 rounded d-flex flex-column">
        {!messages || messages.length < 1 ? (
          <span className="bg-dark mt-3 text-white rounded-pill p-3 mx-auto">
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
                    className="message px-3 rounded-pill py-1 bg-white align-self-end"
                  >
                    {message.content}
                  </div>
                );
              } else {
                return (
                  <div
                    key={message.id}
                    className="message px-3 rounded-pill py-1 bg-dark text-white align-self-start"
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
    </Modal>
  );
};

const Hola = () => {
  return (
    <>
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
    </>
  );
};
