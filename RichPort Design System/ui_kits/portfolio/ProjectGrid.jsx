/* RichPort Portfolio UI Kit — ProjectGrid + ProjectCard
   Filterable card grid mirroring the home and projects pages.
   ============================================================ */

function ProjectCard({ project, onOpen }) {
  return (
    <article className="project-card" onClick={() => onOpen(project)}>
      <div style={{display:"flex", flexDirection:"column", gap: 14, flexShrink: 0}}>
        <div className="head">
          <h3 className="project-name">{project.name}</h3>
          <button
            className="btn-ghost"
            style={{height: 36, padding: "0 16px", fontSize: 13, borderRadius: 8, borderColor: "rgba(255,255,255,.8)"}}
            onClick={(e) => { e.stopPropagation(); onOpen(project); }}
          >
            View Project
          </button>
        </div>

        {project.url && (
          <span className="url-badge">{project.url}</span>
        )}

        <div className="project-tags">
          {(project.tags || []).map(t => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>

        {project.description && <p className="desc">{project.description}</p>}
      </div>

      <div className="preview">
        <img src={project.image} alt={project.name + " preview"} />
      </div>
    </article>
  );
}

function ProjectGrid({ onOpenProject }) {
  const [activeTab, setActiveTab] = React.useState(TABS[0].label);

  const filtered = PROJECTS.filter(p => {
    const cfg = TABS.find(t => t.label === activeTab);
    if (!cfg || !cfg.matches) return true;
    return cfg.matches.some(m => p.categories.includes(m));
  });

  return (
    <section className="section" style={{padding: "80px 0"}}>
      <div className="glow" style={{background: "#84CC16", opacity: 0.15, width: 288, height: 288, left: "50%", top: "25%", transform: "translateX(-50%)", filter: "blur(200px)"}} />
      <div style={{position: "relative", maxWidth: 1377, margin: "0 auto", padding: "0 32px"}}>
        <div className="section-head">
          <span className="pill">Services / Work</span>
          <h2 className="section-title">Custom design solutions for your requirements.</h2>
          <p className="section-sub">I specialize in crafting user-centered solutions for businesses and individuals. Let's create something extraordinary together.</p>
        </div>

        <div style={{display: "flex", justifyContent: "center", marginTop: 40}}>
          <div className="tabbar">
            {TABS.map(t => (
              <button
                key={t.label}
                className={"tabbar-btn" + (activeTab === t.label ? " active" : "")}
                onClick={() => setActiveTab(t.label)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{marginTop: 40}}>
          {filtered.length === 0 ? (
            <p style={{textAlign: "center", color: "var(--fg-3)", fontSize: 14}}>
              No projects found in this category yet.
            </p>
          ) : (
            <div className="project-grid">
              {filtered.map(p => (
                <ProjectCard key={p.slug} project={p} onOpen={onOpenProject} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

window.ProjectCard = ProjectCard;
window.ProjectGrid = ProjectGrid;
