import React from "react";
import icon from "../assets/icon.png";
import text from "../assets/text.png";
const Navbar = () => {
  return (
    <div className="flex items-center w-[100vw] h-[100px] ">
      <div className="absolute left-20">
        <img className="h-20 contrast-200 " src={text} alt="" />
      </div>

      <div className="links absolute right-[100px]">
        <ul className="flex text-md font-medium gap-10 cursor-pointer">
          <li className="relative overflow-hidden h-6 group">
            <span className="block transition-all duration-500 group-hover:-translate-y-full group-hover:opacity-0">
              Home
            </span>
            <span className="absolute left-0 top-full block transition-all duration-500 opacity-0 group-hover:top-0 group-hover:opacity-100">
              Home
            </span>
          </li>

          <li className="relative overflow-hidden h-6 group">
            <span className="block transition-all duration-500 group-hover:-translate-y-full group-hover:opacity-0">
              Why are we special
            </span>
            <span className="absolute left-0 top-full block transition-all duration-500 opacity-0 group-hover:top-0 group-hover:opacity-100">
              Why are we special
            </span>
          </li>

          <li className="relative overflow-hidden h-6 group">
            <span className="block transition-all duration-500 group-hover:-translate-y-full group-hover:opacity-0">
              Samples
            </span>
            <span className="absolute left-0 top-full block transition-all duration-500 opacity-0 group-hover:top-0 group-hover:opacity-100">
              Samples
            </span>
          </li>

          <li className="relative overflow-hidden h-6 group">
            <span className="block transition-all duration-500 group-hover:-translate-y-full group-hover:opacity-0">
              Book an Appointment
            </span>
            <span className="absolute left-0 top-full block transition-all duration-500 opacity-0 group-hover:top-0 group-hover:opacity-100">
              Book an Appointment
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
