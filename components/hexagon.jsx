"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

export default function Hexagon({
  id,
  label,
  color,
  x,
  y,
  isActive,
  onClick,
  index
}) {
  const hexRef = useRef(null);
  const [size, setSize] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [ripple, setRipple] = useState({ active: false, x: 0, y: 0 });

  const colorStart = color.split("-")[1];
  const colorEnd = color.split("-")[2];

  // Update size on resize
  useEffect(() => {
    const updateSize = () => setSize(Math.min(window.innerWidth, window.innerHeight) * 0.16);
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Position logic for hexagons, with responsiveness taken into account
  const position = {
    posX: (size * 1.30) * x - (size * 0.5),  // Adjusted position calculation to center properly
    posY: (size * 0.75) * y - (size * 0.5)  // Adjusted position calculation to center properly
  };

  const handleClick = (e) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    setRipple({ active: true, x, y });

    setTimeout(() => setRipple({ active: false, x: 0, y: 0 }), 600);
    onClick();
  };

  const floatingVariants = {
    initial: { y: 0 },
    floating: {
      y: [0, -10, 0, 5, 0],
      transition: { duration: 5, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: index * 0.2 }
    }
  };

  const entranceVariants = {
    hidden: { scale: 0, opacity: 0, rotate: -30 },
    visible: {
      scale: 1, opacity: 1, rotate: 0,
      transition: { type: "spring", stiffness: 260, damping: 20, delay: 0.1 + index * 0.15 }
    }
  };

  return (
    <motion.div
      ref={hexRef}
      className={`absolute cursor-pointer ${isActive ? "z-10" : "z-0"} bg-pink`}
      style={{
        left: `calc(${position.posX}px)`,
        top: `calc(${position.posY}px)`,
        width: `${size}px`,
        height: `${size * 1.1547}px`,
      }}
      variants={floatingVariants}
      initial="initial"
      animate="floating"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative w-full h-full"
        variants={entranceVariants}
        initial="hidden"
        animate="visible"
      >
        <div
          className={`absolute inset-0 overflow-hidden transition-all duration-300 ease-in-out bg-gradient-to-br ${color}`}
          style={{
            clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
            boxShadow: isHovered ? "0 15px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 255, 255, 0.1)" : "0 10px 30px rgba(0, 0, 0, 0.3)",
            filter: isHovered ? "brightness(1.2)" : "brightness(1)",
            transform: isHovered ? "translateY(-5px)" : "translateY(0)"
          }}
        >
          <div className="absolute inset-0 bg-white opacity-10 mix-blend-overlay" />
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 8%), radial-gradient(circle at 70% 70%, rgba(255,255,255,0.2) 0%, transparent 10%)",
              backgroundSize: "30px 30px"
            }}
          />
          {isActive && <div className="absolute inset-0 bg-white opacity-10 animate-pulse" />}
          {ripple.active && (
            <motion.div
              className="absolute bg-white rounded-full opacity-30"
              style={{
                top: ripple.y,
                left: ripple.x,
                width: 10,
                height: 10,
                transform: "translate(-50%, -50%)"
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 10, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )}
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-white font-bold text-center px-2 drop-shadow-lg"
            style={{ fontSize: `${size * 0.15}px`, transform: isHovered ? "translateY(-5px)" : "translateY(0)" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {label}
          </motion.div>
        </div>
        {isHovered && (
          <div
            className="absolute inset-0 opacity-70"
            style={{
              clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
              background: "transparent",
              boxShadow: `0 0 15px 5px var(--${colorStart})`,
              filter: "blur(8px)"
            }}
          />
        )}
      </motion.div>
    </motion.div>
  );
}
