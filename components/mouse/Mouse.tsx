"use client";
import React, { useEffect, useRef, useState } from "react";

const MouseDot: React.FC = () => {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);
  const requestRef = useRef<number>(0);
  const [hue, setHue] = useState(0); // for dynamic color

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX;
      mouseY.current = e.clientY;
    };

    const animate = () => {
      const dx = mouseX.current - currentX.current;
      const dy = mouseY.current - currentY.current;

      currentX.current += dx * 0.1;
      currentY.current += dy * 0.1;

      if (dotRef.current) {
        dotRef.current.style.left = `${currentX.current}px`;
        dotRef.current.style.top = `${currentY.current}px`;
        dotRef.current.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
      }

      // smoothly update hue (loop back at 360)
      setHue((prevHue) => (prevHue + 1) % 360);

      requestRef.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [hue]);

  const dotStyle: React.CSSProperties = {
    position: "fixed",
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    pointerEvents: "none",
    zIndex: 9999,
    transform: "translate(-50%, -50%)",
    transition: "background-color 0.1s linear",
  };

  return <div ref={dotRef} style={dotStyle} />;
};

export default MouseDot;
