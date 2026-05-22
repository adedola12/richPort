/* RichPort Portfolio UI Kit — Hero
   Hero image bg, sequential typing pill→headline→sub→buttons.
   Typing is simplified to a single fade-in here (the codebase
   uses a custom TypingText component; we approximate.).
   ============================================================ */

function Hero({ onPrimary, onSecondary }) {
  const [shown, setShown] = React.useState(0);

  React.useEffect(() => {
    const timers = [180, 600, 1200, 1700].map((t, i) =>
      setTimeout(() => setShown(s => Math.max(s, i + 1)), t)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const fade = (i) => ({
    opacity: shown >= i ? 1 : 0,
    transform: shown >= i ? "translateY(0)" : "translateY(8px)",
    transition: "opacity 600ms cubic-bezier(.22,.61,.36,1), transform 600ms cubic-bezier(.22,.61,.36,1)",
  });

  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="glow" style={{background: "#84CC16", opacity: 0.22, width: 288, height: 288, left: -160, top: 40, filter: "blur(170px)"}} />
      <div className="glow" style={{background: "#84CC16", opacity: 0.26, width: 320, height: 320, right: -96, top: 96, filter: "blur(190px)"}} />
      <div className="glow" style={{background: "#84CC16", opacity: 0.22, width: 288, height: 288, left: -160, bottom: 0, filter: "blur(160px)"}} />
      <div className="glow" style={{background: "#84CC16", opacity: 0.18, width: 288, height: 288, right: -160, bottom: 0, filter: "blur(160px)"}} />

      <div className="hero-content">
        <div style={fade(1)}>
          <span className="pill">Open for Projects</span>
        </div>
        <h1 className="hero-headline" style={fade(2)}>
          Crafting Stunning Experiences,
          <br />
          One Pixel at a Time.
        </h1>
        <p className="hero-sub" style={fade(3)}>
          Hi, I'm a multi-disciplinary designer who transforms ideas
          into seamless, user-centered solutions.
        </p>
        <div className="hero-cta-row" style={fade(4)}>
          <button className="btn-ghost" style={{height:40, padding:"0 22px"}} onClick={onSecondary}>View Works</button>
          <button className="btn-primary" style={{height:40, padding:"0 22px"}} onClick={onPrimary}>About Me</button>
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
