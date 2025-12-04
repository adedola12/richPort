
import ProjectGrid from "./ProjectGrid";


const Services = () => {


  return (
    <section className="relative w-full bg-[#050505] py-20 lg:py-24">
      {/* subtle glow behind the whole block */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[25%] h-80 w-80 -translate-x-1/2 rounded-full bg-lime-500/15 blur-[200px]" />
      </div>

      <div className="relative mx-auto max-w-[1200px] px-4 lg:px-6">
        {/* MAIN CONTAINER */}
        <div className="rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/80 to-black/95 px-4 py-10 sm:px-8 sm:py-12 lg:px-12 lg:py-14 shadow-[0_0_40px_rgba(0,0,0,0.85)]">
          {/* HEADER */}
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-5 py-1.5 backdrop-blur">
              <span className="text-xs font-semibold tracking-tight text-white font-['Mont']">
                Services / Work
              </span>
            </div>

            <div className="flex flex-col items-center gap-4">
              {/* GRADIENT HEADING */}
              <h2
                className="
                  max-w-[880px]
                  text-2xl sm:text-3xl md:text-4xl lg:text-[40px]
                  font-medium font-['Outfit']
                  leading-snug lg:leading-[1.2]
                  bg-gradient-to-b from-white via-white to-neutral-300
                  bg-clip-text text-transparent
                "
              >
                Custom design solutions for
                <br className="hidden sm:block" />
                your requirements.
              </h2>

              <p className="max-w-[600px] text-sm sm:text-base font-normal leading-6 text-neutral-200 font-['Lexend']">
                I specialize in crafting user-centered solutions for businesses
                and individuals. Let&apos;s create something extraordinary
                together.
              </p>
            </div>
          </div>

          <ProjectGrid />
        </div>
      </div>
    </section>
  );
};

export default Services;
