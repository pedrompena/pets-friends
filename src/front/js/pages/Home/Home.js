import React, { useEffect, useRef, useState } from "react";

import { Hero } from "./component/Hero/Hero";
import { About } from "./component/About/About";
import { Services } from "./component/Services/Services";
import { Gallery } from "./component/Gallery/Gallery";
import { Contact } from "./component/Contact/Contact";
import { Footer } from "../../component/footer/Footer";

import bone from "../../../img/bone.png";
import paw from "../../../img/paw.png";
import ball from "../../../img/ball.png";

const petToys = [
  {
    img: bone,
  },
  {
    img: paw,
  },
  {
    img: ball,
  },
];

export const Home = () => {
  const [toys, setToys] = useState([]);
  const homeRef = useRef(null);

  const getToys = () => {
    const height = homeRef.current.getBoundingClientRect().height;
    const width = homeRef.current.getBoundingClientRect().width;
    let newToys = [];
    for (let i = 0; i < 70; i++) {
      newToys.push({
        id: i,
        img: petToys[Math.floor(Math.random() * petToys.length)].img,
        x: Math.floor(Math.random() * width - 30),
        y: Math.floor(Math.random() * height),
      });
    }
    setToys(newToys);
  };

  useEffect(() => {
    getToys();
  }, []);

  return (
    <>
      <div className="position-relative container mb-5" ref={homeRef}>
        {toys?.map((toy) => (
          <img
            key={toy.id}
            style={{ top: toy.y, left: toy.x, zIndex: -1, opacity: 0.3 }}
            className="position-absolute"
            width="50px"
            src={toy.img}
          />
        ))}

        <div id="hero" className="pt-5">
          <Hero />
        </div>

        <div id="about" className="pt-5">
          <About />
        </div>

        <div id="services" className="pt-5">
          <Services />
        </div>

        <div id="gallery" className="pt-5">
          <Gallery />
        </div>
        <div id="contact" className="pt-5">
          <Contact />
        </div>
      </div>
      <Footer />
    </>
  );
};
