import React from "react";
import { ServicesPets } from "./component/ServicesPets/ServicesPets";
import { UserInfo } from "./component/UserInfo/UserInfo";

export const Dashboard = () => {
  return (
    <div className="container pt-4 d-flex">
      <div className="col-5 mt-4">
        <UserInfo />
      </div>
      <div className="col-8">
        <ServicesPets />
      </div>
    </div>
  );
};
