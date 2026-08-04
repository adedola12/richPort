import React from "react";
import { motion } from "framer-motion";
import workExperience from "../../data/workExperience";

const WorkExp = () => {

  /* Content ships with the build — see src/data/workExperience.js. */
  const list = workExperience;

  return (
    <section id="work-experience" className="w-full bg-[#050505] py-12 md:py-16">
      <div className="mx-auto max-w-[961px] px-4">
        <motion.h2
          className="text-[28px] sm:text-[34px] lg:text-[40px] font-['Outfit'] font-medium leading-tight tracking-[-0.05em] bg-gradient-to-b from-white via-white to-neutral-300 bg-clip-text text-transparent mb-10"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
        >
          Work Experience
        </motion.h2>

        <div className="pl-4 sm:pl-[30px] space-y-0">
          {list.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1], delay: index * 0.1 }}
            >
              <div className="grid gap-6 md:grid-cols-[420px_1fr] py-8 first:pt-0">
                <div>
                  <h3
                    className="font-['Outfit'] font-medium text-[24px] sm:text-[28px] lg:text-[40px] leading-tight tracking-tight bg-clip-text text-transparent"
                    style={{ backgroundImage: "linear-gradient(179deg, rgb(255,255,255) 5%, rgb(118,116,116) 103%)" }}
                  >
                    {exp.name}
                  </h3>
                  {exp.role && (
                    <p className="mt-3 text-[15px] sm:text-[16px] text-neutral-300">{exp.role}</p>
                  )}
                  {exp.durationLabel && (
                    <p className="mt-2 text-[12px] sm:text-[13px] text-[#89ff00] tracking-wide">{exp.durationLabel}</p>
                  )}
                </div>
                <ul className="list-disc list-outside pl-5 space-y-2.5 text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.7] text-neutral-300">
                  {exp.workExperience.map((item, idx) => (
                    <li key={idx} className="text-justify">{item}</li>
                  ))}
                </ul>
              </div>
              {index < list.length - 1 && (
                <div className="h-px bg-neutral-800 mt-2 mb-6" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExp;
