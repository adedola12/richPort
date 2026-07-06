import React from "react";
import { motion } from "framer-motion";
import midImg from "../../assets/Bookrion/midImg.webp";

const imgVariants = {
  hidden: {
    opacity: 0,
    scale: 1.04,
    clipPath: "inset(6% 3% 6% 3% round 28px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    clipPath: "inset(0% 0% 0% 0% round 28px)",
    transition: { duration: 1.1, ease: [0.22, 0.61, 0.36, 1] },
  },
};

const ProjectImg = ({ project }) => {
  const mainImageUrl = project?.midImageUrl || project?.images?.mid || midImg;

  return (
    <section className="relative w-full py-16">
      <motion.div
        className="relative mx-auto max-w-[1200px] px-4 lg:px-6"
        variants={imgVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="relative mx-auto max-w-[1222px] aspect-[4/5] sm:aspect-[1222/631]">
          <div
            className="
              relative
              h-full w-full
              rounded-2xl sm:rounded-[32px]
              border-2 border-lime-500
              bg-black/20
              shadow-[0_0_40px_rgba(0,0,0,0.85)]
              overflow-hidden
            "
          >
            <img
              src={mainImageUrl}
              alt={
                project?.name
                  ? `${project.name} mid visual`
                  : "Project visual"
              }
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectImg;
