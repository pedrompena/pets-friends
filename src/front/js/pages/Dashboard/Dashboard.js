import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import { ChatList } from "./component/Chats/ChatList";
import { ServicesPets } from "./component/ServicesPets/ServicesPets";
import { UserInfo } from "./component/UserInfo/UserInfo";

export const Dashboard = () => {
  const { store } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (store.clientInfo?.id) {
      setLoading(false);
    }
  }, [store.clientInfo]);

  return !loading ? (
    <div
      style={{ height: "100vh" }}
      className="position-relative mt-5 d-flex flex-wrap gap-2 justify-content-center align-items-center"
    >
      <UserInfo />

      <div className="dashboard-content">
        <ServicesPets />
        <ChatList />
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
