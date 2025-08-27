import React, { useEffect, useState } from "react";
import PreLoader from "./components/PreLoader";
import Hero from "./components/Hero";
import Phone from "./components/Phone";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [unsupported, setUnsupported] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
 
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|iPad|iPhone|iPod/i.test(userAgent)) {
      setUnsupported(true);
      return;
    }

  
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setUnsupported(true);
      }
    } catch (err) {
      setUnsupported(true);
    }

    // Preloader
    const handleLoad = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    };

    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("load", handleLoad);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("load", handleLoad);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (unsupported) {
    return (
      <>
      <Phone/>
      </>
    );
  }

  return (
    <div className="relative">
      {loading ? (
        <PreLoader />
      ) : (
        <div className="relative">
          <Hero />

          {/* Cursor-following crosshair lines */}
          <div
            className="pointer-events-none fixed top-0 left-0 w-full h-full z-50"
            style={{ mixBlendMode: "difference" }}
          >
            {/* Vertical Lines */}
            <div
              className="absolute top-0 h-full w-[0.5px] bg-gray-800"
              style={{ left: `${cursorPos.x}px` }}
            ></div>

            {/* Horizontal Lines */}
            <div
              className="absolute left-0 w-full h-[0.5px] bg-gray-800"
              style={{ top: `${cursorPos.y}px` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
