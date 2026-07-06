// src/pages/Home.jsx
import React from "react";
import Hero from "../components/Home/Hero";
import PickACard from "../components/Home/PickACard";
import AboutMe from "../components/Home/AboutMe";
import Services from "../components/Home/Services";
import Partners from "../components/Home/Partners";
import DesignProcess from "../components/Home/DesignProcess";
import Testimonials from "../components/Home/Testimonials";
import FaqSection from "../components/Home/FaqSection";
import BuildSection from "../components/Home/BuildSection";
import WorkExp from "../components/Home/WorkExp";
import PageMeta from "../components/common/PageMeta";

const Home = () => {
  return (
    <div className="text-white bg-[#050505]">
      <PageMeta
        title="Home"
        description="Portfolio of Richard Enoch — visual designer and product thinker with 6 years across brand identity, UI/UX, and construction technology."
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
      <FaqSection />
      <BuildSection />
    </div>
  );
};

export default Home;
