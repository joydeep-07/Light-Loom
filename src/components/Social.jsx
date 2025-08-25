import React from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6"; // X logo

const Social = () => {
  return (
    <div className="flex flex-col items-start space-y-6 p-4">
      {/* GitHub */}
      <a
        href="https://github.com/joydeep-07"
        target="_blank"
        rel="noreferrer"
        className="flex items-center group"
      >
        <FaGithub className="text-gray-600 text-xl group-hover:text-cyan-400 transition" />
       
      </a>

      {/* LinkedIn */}
      <a
        href="https://www.linkedin.com/in/joydeep-paul-06b37926a/"
        target="_blank"
        rel="noreferrer"
        className="flex items-center group"
      >
        <FaLinkedin className="text-gray-600 text-xl group-hover:text-cyan-400 transition" />
      
      </a>

      {/* X (Twitter) */}
      <a
        href="https://x.com/Paul__here?t=2fFjvZ-b0vCsuhrg2oOpEQ&s=09"
        target="_blank"
        rel="noreferrer"
        className="flex items-center group"
      >
        <FaXTwitter className="text-gray-600 text-xl group-hover:text-cyan-400 transition" />
       
      </a>

      {/* Facebook */}
      <a
        href="https://www.facebook.com/joydeep.paul.568089?mibextid=ZbWKwL"
        target="_blank"
        rel="noreferrer"
        className="flex items-center group"
      >
        <FaFacebook className="text-gray-600 text-xl group-hover:text-cyan-400 transition" />
       
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/mr.paul_16?igsh=dWhrOW1oYzdzZmlj"
        target="_blank"
        rel="noreferrer"
        className="flex items-center group"
      >
        <FaInstagram className="text-gray-600 text-xl group-hover:text-cyan-400 transition" />
       
      </a>
    </div>
  );
};

export default Social;
