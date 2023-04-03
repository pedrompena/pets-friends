import React from "react";
import PedroImage from "../../../../../img/pedro.jpg";
import IreneImage from "../../../../../img/irene.jpg";
import ManuelImage from "../../../../../img/manuel.jpg";

const petFriendsTeam = [
  {
    name: "Pedro",
    surname: "Peña",
    img: PedroImage,
    url: "https://github.com/pedrompena",
  },
  {
    name: "Irene",
    surname: "Quero",
    img: IreneImage,
    url: "https://github.com/IreneQuero",
  },
  {
    name: "Manuel",
    surname: "Cabrera",
    img: ManuelImage,
    url: "https://github.com/Manuquim",
  },
];

export const Contact = () => {
  return (
    <div className="box contact">
      <h2 className="text-center fs-1 fw-bold">contacta con nosotros</h2>
      <div className="d-flex mt-5 flex-wrap justify-content-evenly align-items-center">
        {petFriendsTeam.map((person) => (
          <div className="card-team" key={person.name}>
            <a href={person.url} target="_blank">
              <div className="rounded-circle overflow-hidden border border-2 border-dark">
                <img
                  width="200px"
                  className="rounded-cirlce"
                  src={person.img}
                />
              </div>
              <p className="text-center text-dark fw-bold fs-2">
                {person.name} {person.surname}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};
