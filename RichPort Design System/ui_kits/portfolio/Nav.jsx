/* RichPort Portfolio UI Kit — Nav
   Fixed glass top bar. Emerald → white → sky gradient.
   ============================================================ */

function Nav({ active, onNavigate, onContactClick }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const links = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "rate", label: "Rate Card" },
  ];

  return (
    <React.Fragment>
      <header className="nav">
        <div className="nav-inner">
          <a className="nav-wordmark" onClick={() => onNavigate("home")} style={{cursor:"pointer"}}>
            Richard Enoch
          </a>

          <nav className="nav-links" style={{display: "flex"}}>
            {links.map(l => (
              <span
                key={l.id}
                className={"nav-link" + (active === l.id ? " active" : "")}
                onClick={() => onNavigate(l.id)}
              >
                {l.label}
              </span>
            ))}
          </nav>

          <div className="nav-actions">
            <button className="btn-ghost" onClick={() => onNavigate("projects")}>View Works</button>
            <button className="btn-primary" onClick={onContactClick}>Contact</button>
            <button className="icon-btn" title="Admin sign in" onClick={() => onNavigate("admin")}>
              <IconUser size={14} />
            </button>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}

window.Nav = Nav;
