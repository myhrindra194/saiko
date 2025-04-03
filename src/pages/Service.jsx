/* eslint-disable react/prop-types */
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { features } from "../utils/data";

// Nouveaux composants pour les éléments animés
const FloatingShapes = () => (
  <>
    <motion.div
      animate={{
        y: [0, -20, 0],
        x: [0, 15, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full bg-blue-400/20 blur-lg"
    />
    <motion.div
      animate={{
        y: [0, 30, 0],
        x: [0, -20, 0],
        rotate: [0, -8, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1,
      }}
      className="absolute bottom-1/3 right-1/4 w-24 h-24 rounded-full bg-purple-400/20 blur-lg"
    />
  </>
);

const AnimatedIcon = ({ icon }) => (
  <motion.div
    initial={{ scale: 0.8, opacity: 0, rotateY: 180 }}
    animate={{
      scale: 1,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    }}
    whileHover={{
      scale: 1.1,
      rotateY: 10,
      transition: { duration: 0.3 },
    }}
    className="text-7xl md:text-9xl flex-1 text-center"
    style={{
      perspective: "1000px",
      transformStyle: "preserve-3d",
      color: "#6366f1", // Couleur violette moderne
    }}
  >
    {icon}
  </motion.div>
);

const Service = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [positions, setPositions] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setPositions(features.map(() => (Math.random() > 0.5 ? "left" : "right")));
  }, []);

  const navigate = useCallback((direction) => {
    setIsAnimating(true);
    setCurrentIndex((prev) => {
      if (direction === "next") {
        return prev === features.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? features.length - 1 : prev - 1;
      }
    });
    setTimeout(() => setIsAnimating(false), 1000);
  }, []);

  const handleWheel = useCallback(
    (e) => {
      if (isAnimating) return;
      if (e.deltaY > 50) navigate("next");
      else if (e.deltaY < -50) navigate("prev");
    },
    [isAnimating, navigate]
  );

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const variants = {
    enter: (direction) => ({
      y: direction === "next" ? 100 : -100,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
      transition: {
        y: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (direction) => ({
      y: direction === "next" ? -100 : 100,
      opacity: 0,
      transition: { duration: 0.5 },
    }),
  };

  return (
    <div className="md:px-20 px-8 py-4 md:pt-5 h-[88vh] overflow-hidden relative">
      {/* Éléments de fond animés */}
      <FloatingShapes />

      {/* Particules animées */}
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, window.innerHeight],
              x: [
                Math.random() * window.innerWidth,
                Math.random() * window.innerWidth,
              ],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 rounded-full bg-indigo-400/30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </motion.div>

      <AnimatePresence custom={currentIndex}>
        <motion.div
          key={currentIndex}
          custom={currentIndex}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0 flex items-center justify-center pt-20"
        >
          <div
            className={`container mx-auto px-4 flex ${
              positions[currentIndex] === "left"
                ? "flex-row"
                : "flex-row-reverse"
            } items-center gap-8 md:gap-16`}
          >
            <motion.div
              initial={{
                opacity: 0,
                x: positions[currentIndex] === "left" ? -50 : 50,
              }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="flex-1 relative z-10"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800 dark:text-white tracking-tight leading-tight">
                {features[currentIndex].title}
              </h2>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
                {features[currentIndex].description}
              </p>
            </motion.div>

            <div className="flex-1 relative">
              <AnimatedIcon icon={features[currentIndex].icon} />
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 0.5, 0.8],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 rounded-full bg-indigo-500/10 blur-xl -z-10"
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Service;
