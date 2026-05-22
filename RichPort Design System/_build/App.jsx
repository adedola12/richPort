/* RichPort Portfolio UI Kit — App shell
   Routes between Home / About / Projects / ProjectDetail / Rate
   via simple useState (no router). Mirrors the live site flow.
   ============================================================ */

const SCREEN_LABELS = {
  home: "01 Home",
  about: "02 About",
  projects: "03 Projects",
  project: "04 Project Detail",
  rate: "05 Rate Card",
  admin: "06 Admin (placeholder)",
};

function AboutPage() {
  /* The About route mirrors /about. It chains the about hero,
     a journey timeline strip, and tools / capabilities. */
  const CAPABILITIES = [
    "Brand Guidelines", "Campaigns", "UI/UX Design", "Publication Design",
    "Design Systems", "Product Design", "Landing Pages", "Event Branding",
    "Marketing Design", "Book Cover Design", "Logo Design", "Brand Identity Design",
    "Social Media Design", "Presentation Designs", "Pitch Deck Designs",
    "Company Profiles", "Prototyping", "Magazine Design",
  ];
  const TOOL_ROW = [
    "figma","photoshop","illustrator","indesign","xd","notion","slack","zoom","openai","behance","creative-cloud","chrome","gmail","meet"
  ];
  const isSvg = (n) => ["chrome","gmail","docs","sheets","meet","calendar","teams","notes"].includes(n);

  return (
    <div style={{paddingTop: 80}}>
      <AboutMe />

      <section style={{position: "relative", padding: "60px 0 40px", background: "var(--bg-deep)"}}>
        <div style={{maxWidth: 1457, margin: "0 auto", padding: "0 32px"}}>
          <h2 className="about-name" style={{marginBottom: 32, color: "transparent", background: "linear-gradient(180deg,#fff 0%,#fff 50%,#D4D4D4 100%)", WebkitBackgroundClip: "text", backgroundClip: "text"}}>
            My Competencies
          </h2>
          <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12, marginBottom: 24}}>
            {CAPABILITIES.map(c => <span key={c} className="cap-pill">{c}</span>)}
          </div>
          <p style={{textAlign: "center", fontSize: 14, color: "rgba(255,255,255,0.7)", marginBottom: 16}}>
            .... and for tools...
          </p>
          <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center", alignItems: "center", gap: "32px 48px"}}>
            {TOOL_ROW.map(n => (
              <img key={n} src={window.__resources['ico' + n.charAt(0).toUpperCase() + n.replace(/-/g,'').slice(1) + (isSvg(n) ? 'Svg' : '')] || ''} alt={n}
                style={{height: 48, width: 48, objectFit: "contain", filter: "drop-shadow(0 0 8px rgba(0,0,0,0.35))", transition: "transform 200ms"}}
                onMouseEnter={e => e.target.style.transform = "translateY(-4px) scale(1.07)"}
                onMouseLeave={e => e.target.style.transform = ""}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function HomePage({ onNavigate, onOpenProject, onContactClick }) {
  return (
    <React.Fragment>
      <Hero onPrimary={() => onNavigate("about")} onSecondary={() => onNavigate("projects")} />
      <Partners />
      <ProjectGrid onOpenProject={onOpenProject} />
      <Process />
      <AboutMe />
      <BuildCTA onContactClick={onContactClick} />
    </React.Fragment>
  );
}

function ProjectsPage({ onOpenProject }) {
  return (
    <div style={{paddingTop: 100}}>
      <ProjectGrid onOpenProject={onOpenProject} />
    </div>
  );
}

function App() {
  const [route, setRoute] = React.useState("home");
  const [openProject, setOpenProject] = React.useState(null);

  const onNavigate = (id) => {
    setRoute(id);
    setOpenProject(null);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "instant" });
  };
  const onOpenProject = (p) => {
    setOpenProject(p);
    setRoute("project");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // Page transition wrapper — opacity+y+blur to match the codebase
  const [transitionKey, setTransitionKey] = React.useState(route);
  React.useEffect(() => { setTransitionKey(route + (openProject?.slug || "")); }, [route, openProject]);

  let body = null;
  if (route === "home") body = <HomePage onNavigate={onNavigate} onOpenProject={onOpenProject} onContactClick={() => onNavigate("rate")} />;
  else if (route === "about") body = <AboutPage />;
  else if (route === "projects") body = <ProjectsPage onOpenProject={onOpenProject} />;
  else if (route === "project" && openProject) body = <ProjectDetail project={openProject} onBack={() => onNavigate("projects")} />;
  else if (route === "rate") body = <RateCard />;
  else if (route === "admin") body = (
    <div style={{paddingTop: 200, textAlign: "center"}}>
      <p style={{color: "var(--fg-3)", fontSize: 14}}>
        Admin sign-in lives at <code style={{color: "var(--lime-400)"}}>/admin-auth</code> in the live product.
        Omitted in this UI kit.
      </p>
    </div>
  );

  return (
    <div className="app">
      <Nav active={route} onNavigate={onNavigate} onContactClick={() => onNavigate("rate")} />
      <main className="main" data-screen-label={SCREEN_LABELS[route]}>
        <div key={transitionKey}
          style={{
            animation: "pageFade 550ms cubic-bezier(.22,.61,.36,1) both",
          }}
        >
          {body}
        </div>
      </main>
      <Footer onNavigate={onNavigate} />
      <style>{`
        @keyframes pageFade {
          from { opacity: 0; transform: translateY(16px); filter: blur(4px); }
          to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
        }
      `}</style>
    </div>
  );
}

window.App = App;

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
