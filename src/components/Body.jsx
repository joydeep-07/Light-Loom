import React from "react";
import text from "../assets/text.png";
import quote from "../assets/quote.png";
import tape from "../assets/tape.png";
import base from "../assets/base.png";
import img13 from "../assets/img13.jpg";
import img8 from "../assets/img8.jpg";
import img11 from "../assets/img11.jpg";
import Social from "./Social";


const Body = () => {
  return (
    <div className="h-[89vh] relative cursor-crosshair ">
      <p className="text-[1.5rem] leading-relaxed text-left absolute top-50 left-20">
        India's most premium still photography studio & some <br />
        random stuff about us and how{" "}
        <span className="inline-block">
          <img
            className="h-15 inline-block contrast-200"
            src={text}
            alt="text-img"
            loading="lazy"
          />
        </span>{" "}
        is the one <br />
        which you should choose.
      </p>

      <button
        className="absolute top-80 left-2 flex items-center justify-center text-gray-900 font-semibold text-xl px-8 py-4"
        style={{
          backgroundImage: `url(${tape})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          width: "400px",
          height: "200px",
        }}
      >
        Book Appointment
      </button>

      <div className=" absolute top-0 right-[70px] z-30 inline-block justify-center">
        <img
          className="h-[100px] contrast-200"
          src={quote}
          alt=""
          loading="lazy"
        />
      </div>

      <div>
        <div className="absolute top-0 right-[650px] rotate-3  ">
          {/* <img className="h-[450px] z-0" src={base} alt="" /> */}
          <img
            className="h-[350px] z-2 rounded-sm"
            src={img8}
            alt=""
            loading="lazy"
          />
        </div>

        <div className="absolute top-70 right-[850px] -rotate-5  ">
          {/* <img className="h-[435px] z-0" src={base} alt="" /> */}
          <img
            className="h-[335px] z-2 rounded-sm"
            src={img13}
            alt=""
            loading="lazy"
          />
        </div>

        <div className="absolute top-85 right-[600px] rotate-5  ">
          {/* <img className="h-[435px] z-0" src={base} alt="" /> */}
          <img
            className="h-[335px] z-2 rounded-sm"
            src={img11}
            alt=""
            loading="lazy"
          />
        </div>

        <div className="absolute right-10 bottom-10" >
          <Social />
        </div>
      </div>
    </div>
  );
};

export default Body;
