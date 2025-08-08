import React from "react";
import { motion } from "framer-motion";

const Header: React.FC = () => (
  <motion.h2
    className="text-4xl font-extrabold text-teal-400 tracking-wide select-none"
    initial={{ filter: "drop-shadow(0 0 0px #f59e0b)", opacity: 0 }}
    animate={{
      filter: [
        "drop-shadow(0 0 0px #f59e0b)",
        "drop-shadow(0 0 6px #f59e0b)",
        "drop-shadow(0 0 0px #f59e0b)",
      ],
      opacity: [0.9, 1, 1, 0.9],
    }}
    transition={{
      duration: 1,
      repeat: Infinity,
      repeatType: "loop",
      ease: "easeInOut",
    }}
  >
    Mekus Chat
  </motion.h2>
);

export default Header;
