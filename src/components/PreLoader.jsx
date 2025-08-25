import React, { useState, useEffect } from "react";
import img0 from "../assets/img0.jpg";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";
import img8 from "../assets/img8.jpg";
import img9 from "../assets/img9.jpg";
import img10 from "../assets/img10.jpg";
import img11 from "../assets/img11.jpg";
import img12 from "../assets/img12.jpg";
import img13 from "../assets/img13.jpg";
import img14 from "../assets/img14.jpg";
import img15 from "../assets/img15.jpg";
import bg from "../assets/bg.jpg";
import icon from "../assets/quote.png";
import base from "../assets/base.png";

const images = [
  img0,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
];

const PreLoader = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < images.length) return prev + 1;
        clearInterval(interval);
        return prev;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const progress = Math.min((visibleCount / images.length) * 100, 100);

  return (
    <div
      className="relative min-h-screen grayscale-100 bg-gray-300"
      style={{ backgroundImage: `url(${bg})`, backgroundSize: "cover" }}
    >
      <div className="absolute inset-0 bg-white opacity-60"></div>

      <div className="absolute right-[20px] top-10">
        <img className="h-[100px] contrast-200 " src={icon} alt="logo" loading="lazy" />
      </div>

      {/* Progress Bar */}
      <div className="absolute left-20 top-[610px] w-[250px] h-1 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-2 bg-gradient-to-r from-gray-600 via-gray-800 to-gray-900 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Loading text */}
      <h1 className="absolute left-20 top-[625px] text-3xl text-gray-700 font-medium tracking-tight animate-pulse">
        Loading your experience...
      </h1>

      {/* Image stack with base behind */}
      <div className="images min-h-screen flex items-center justify-center relative">
        {/* Base image behind */}
        <img
          src={base}
          alt="base"
          className="absolute  rounded-lg"
          style={{
            height: "720px",
            zIndex: 0,
          }}
          loading="lazy"
        />

        {/* Main stacked images */}
        {images.slice(0, visibleCount).map((src, i) => {
          const height = 500 - i * 25 > 80 ? 500 - i * 25 : 80;
          const rotation = i % 2 === 0 ? "rotate-2" : "-rotate-2";

          return (
            <img
              key={i}
              src={src}
              alt={`image-${i}`}
              loading="lazy"
              className={`absolute ${rotation} shadow-lg rounded-sm`}
              style={{
                height: `${height}px`,
                zIndex: i + 1,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PreLoader;
