import React from "react";
import Hero from "../components/Home/Hero";
import WorkImg from "../components/Home/WorkImg";
import AboutMe from "../components/Home/AboutMe";
import Services from "../components/Home/Services";
import Partners from "../components/Home/Partners";
import DesignProcess from "../components/Home/DesignProcess";
import BuildSection from "../components/Home/BuildSection";

const Home = () => {
  return (
    // same background as hero & work section
    <div className="text-white bg-[#050505]">
      <Hero />
      <WorkImg />
      <AboutMe />
      <Services />
      <Partners />
      <DesignProcess />
      <BuildSection />
    </div>
  );
};

export default Home;
