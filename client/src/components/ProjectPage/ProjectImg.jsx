import React from "react";
import { motion } from "framer-motion";
import midImg from "../../assets/Bookrion/midImg.png";

const imgVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 0.61, 0.36, 1] },
  },
};
const ProjectImg = ({ project }) => {
  const mainImageUrl = project?.midImageUrl || project?.images?.mid || midImg;

  return (
    <section className="relative w-full bg-[#050505] py-16">
      <motion.div
        className="relative mx-auto max-w-[1200px] px-4 lg:px-6"
        variants={imgVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.6 }}
      >
        <div className="relative mx-auto max-w-[1222px] aspect-[1222/631]">
          <div
            className="
              pointer-events-none
              absolute inset-[-28px]
              rounded-[46px]
              bg-lime-400/18
              blur-3xl
            "
          />
          <div
            className="
              relative
              h-full w-full
              rounded-[32px]
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
                  ? `${project.name} main visual`
                  : "Project main visual"
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
