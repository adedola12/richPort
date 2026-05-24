// src/pages/Home.jsx
import React from "react";
import Hero from "../components/Home/Hero";
import PickACard from "../components/Home/PickACard";
import AboutMe from "../components/Home/AboutMe";
import Services from "../components/Home/Services";
import Partners from "../components/Home/Partners";
import DesignProcess from "../components/Home/DesignProcess";
import Testimonials from "../components/Home/Testimonials";
import BuildSection from "../components/Home/BuildSection";
import WorkExp from "../components/Home/WorkExp";
import PageMeta from "../components/common/PageMeta";

const Home = () => {
  return (
    <div className="text-white bg-[#050505]">
      <PageMeta
        title="Home"
        description="Portfolio of Richard Enoch — a multidisciplinary designer specialising in brand identity, UI/UX, graphic design, and web design."
        url="/"
      />
      <Hero />
      <PickACard />
      <AboutMe />
      <Partners />
      <Services />
      <WorkExp />
      <DesignProcess />
      <Testimonials />
      <BuildSection />
    </div>
  );
};

export default Home;
