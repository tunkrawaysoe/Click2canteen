'use client';

import { motion } from "framer-motion";

export default function AnimatedButton() {
  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{
        opacity: 1,
        x: [0, 10, 0], // slide left to right and back
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
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
  );
}
