// src/components/common/TypingText.jsx
import React from "react";
import { motion } from "framer-motion";

const letterVariants = {
  hidden: { opacity: 0, y: "0.3em" },
  visible: {
    opacity: 1,
    y: "0em",
    transition: { duration: 0.03 },
  },
};

const containerVariants = {
  hidden: {},
  visible: (delay = 0) => ({
    transition: {
      staggerChildren: 0.02,
      delayChildren: delay,
    },
  }),
};

const TypingText = ({
  text = "",
  as: Tag = "p",
  className = "",
  delay = 0,
}) => {
  const MotionTag = motion(Tag);
  const letters = Array.from(text);

  return (
    <MotionTag
      className={className}
      variants={containerVariants}
      custom={delay}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.7 }}
    >
      {letters.map((letter, idx) => (
        <motion.span
          key={idx}
          variants={letterVariants}
          style={{
            display: "inline-block",
            whiteSpace: letter === " " ? "pre" : "normal",
          }}
        >
          {letter}
        </motion.span>
      ))}
    </MotionTag>
  );
};

export default TypingText;
