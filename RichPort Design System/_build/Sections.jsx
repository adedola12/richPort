/* RichPort Portfolio UI Kit — Sections
   Partners, Process, AboutMe, BuildCTA, Footer.
   ============================================================ */

function Partners() {
  return (
    <section className="section" style={{padding: "32px 0 0"}}>
      <div className="partners">
        <div className="partners-row">
          {PARTNERS.map(p => p.color ? (
            <span key={p.alt} className="partner-swap" title={p.alt}>
              <img className="partner-grey" src={p.src} alt={p.alt}/>
              <img className="partner-color" src={p.color} alt=""/>
            </span>
          ) : (
            <img key={p.alt} className="partner-logo" src={p.src} alt={p.alt}/>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const iconMap = { search: IconSearch, bulb: IconBulb, ruler: IconRuler, flask: IconFlask };
  return (
    <section className="section" style={{padding: "20px 0 60px"}}>
      <div className="glow" style={{background: "#84CC16", opacity: 0.12, width: 288, height: 288, left: "50%", top: "33%", transform: "translateX(-50%)", filter: "blur(200px)"}} />
      <div style={{position: "relative", maxWidth: 1356, margin: "0 auto", padding: "0 32px"}}>
        <div className="section-head">
          <span className="pill">Process</span>
          <h2 className="section-title">My Design Process: From Concept to Completion</h2>
          <p className="section-sub">Every project is unique, but the path to great design is built on a clear and thoughtful approach.</p>
        </div>
        <div className="process-grid">
          {PROCESS_STEPS.map(step => {
            const IconCmp = iconMap[step.icon];
            return (
              <div key={step.title} className="process-card">
                <span className="process-icon"><IconCmp size={20}/></span>
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function AboutMe() {
  return (
    <section className="section" style={{padding: "80px 0", overflow: "hidden"}}>
      <div className="glow" style={{background: "#84CC16", opacity: 0.15, width: 288, height: 288, left: -128, top: 40, filter: "blur(180px)"}} />
      <div className="glow" style={{background: "#84CC16", opacity: 0.20, width: 384, height: 384, right: -80, bottom: -40, filter: "blur(220px)"}} />
      <div style={{position: "relative", maxWidth: 1377, margin: "0 auto", padding: "0 32px"}}>
        <div className="about-grid">
          <div className="about-text-block" style={{textAlign: "left"}}>
            <span className="pill" style={{alignSelf: "flex-start"}}>Hi there, I'm…</span>
            <h2 className="about-name">Richard Enoch</h2>
            <p>{`Design, for me, is simply giving life to the many ideas constantly buzzing in my head. I love to draw, play with colors, and explore the endless possibilities that come from starting with a blank canvas.

I'm a multidisciplinary designer, and I've been on this roller coaster for about 6 years now. Over the years, I've had the chance to bring brands to life, collaborate with national organizations both locally and internationally, and just enjoy the process of creating.`}</p>
          </div>

          <div className="about-portrait-wrap">
            <div className="about-portrait-glow" />
            <div className="about-portrait">
              <img src={window.__resources.portrait} alt="Richard Enoch" />
            </div>
          </div>

          <div className="about-text-block" style={{textAlign: "left", paddingTop: 120}}>
            <p>{`I've also worked across different teams, building my soft skills and doing my best to make sure my designs solve real problems—because at the end of the day, isn't that what design is all about?

And since I find the construction industry super fascinating (I studied Quantity Surveying, by the way), I like to think I'm discovering my purpose in connecting design and construction…

or maybe it's the other way around.`}</p>
            <div className="about-cta-row">
              <button className="btn-lime-outline" onClick={() => alert("Demo: would download resume PDF")}>
                <IconDownload size={12}/> View Resume
              </button>
              <a className="social-square" href="#" onClick={e => e.preventDefault()}><IconLinkedIn size={15}/></a>
              <a className="social-square" href="#" onClick={e => e.preventDefault()}><IconTwitter size={15}/></a>
              <a className="social-square" href="#" onClick={e => e.preventDefault()}><IconInstagram size={15}/></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BuildCTA({ onContactClick }) {
  return (
    <section className="section" style={{padding: "80px 0"}}>
      <div style={{maxWidth: 1200, margin: "0 auto", padding: "0 32px"}}>
        <div className="build-card">
          <div className="build-bg" />
          <div className="build-overlay" />
          <div className="build-inner">
            <span className="pill">Available for New Projects</span>
            <h2 className="build-headline">Let's Build Something<br />Amazing Together.</h2>
            <p className="build-sub">
              Have a question or an exciting project in mind? I'd love to hear from you.
              Let's create user experiences that make a difference.
            </p>
            <button className="build-cta" onClick={onContactClick}>Check out my rate card</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onNavigate }) {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-wordmark">Richard Enoch</div>
          <nav className="footer-nav">
            <a onClick={() => onNavigate("home")}>Home</a>
            <a onClick={() => onNavigate("about")}>About</a>
            <a onClick={() => onNavigate("projects")}>Projects</a>
            <a onClick={() => onNavigate("rate")}>Rate Card</a>
          </nav>
          <div className="stay-connected">
            <span className="label">Stay Connected</span>
            <a className="stay-icon"><span className="stay-icon-inner"><IconLinkedIn size={12}/></span></a>
            <a className="stay-icon"><span className="stay-icon-inner"><IconTwitter size={12}/></span></a>
            <a className="stay-icon"><span className="stay-icon-inner"><IconInstagram size={12}/></span></a>
          </div>
        </div>
        <div className="footer-divider" />
        <div className="footer-bottom">
          <div className="row">
            <span className="contact-pill">
              <span className="contact-icon"><IconMail size={9}/></span>
              <span style={{color: "var(--fg-2)"}}>des.richardenoch@gmail.com</span>
            </span>
            <span className="contact-pill">
              <span className="contact-icon"><IconPhone size={9}/></span>
              <span style={{color: "var(--fg-2)"}}>+234 903 852 2066</span>
            </span>
          </div>
          <span className="copyright">© 2026 Richard Enoch. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

window.Partners = Partners;
window.Process = Process;
window.AboutMe = AboutMe;
window.BuildCTA = BuildCTA;
window.Footer = Footer;
