'use client';

import { motion } from "framer-motion";

export default function AnimatedButton() {
  return (
    <div className="overflow-visible">
      <motion.button
        animate={{
          x: [0, 20], 
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.08,
          boxShadow: "0 6px 20px rgba(0, 29, 81, 0.7)",
        }}
        whileTap={{ scale: 0.95 }}
        style={{
          background: "#ffff",
        }}
        className="text-[#00022E] px-8 cursor-pointer py-3 rounded-2xl font-semibold shadow-lg tracking-wide transition-shadow duration-300"
      >
        Browse Canteens
      </motion.button>
    </div>
  );
}
