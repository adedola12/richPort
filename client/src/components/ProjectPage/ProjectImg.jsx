import React from "react";
import midImg from "../../assets/Bookrion/midImg.png";

const ProjectImg = ({ project }) => {
  const mainImageUrl = project?.midImgUrl || project?.images?.midImg || midImg;

  return (
    <section className="relative w-full bg-[#050505] py-16">
      <div className="relative mx-auto max-w-[1200px] px-4 lg:px-6">
        {/* Wrapper so the glow hugs the card */}
        <div className="relative mx-auto max-w-[1222px] aspect-[1222/631]">
          {/* Subtle lime glow behind card */}
          <div
            className="
                pointer-events-none
                absolute inset-[-28px]
                rounded-[46px]
                bg-lime-400/18
                blur-3xl
              "
          />

          {/* Actual image card */}
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
      </div>
    </section>
  );
};

export default ProjectImg;
