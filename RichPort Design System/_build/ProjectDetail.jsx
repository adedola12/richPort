/* RichPort Portfolio UI Kit — ProjectDetail screen
   Mirrors /projects/:slug — hero, meta block, main image, write-up.
   ============================================================ */

function ProjectDetail({ project, onBack }) {
  return (
    <div className="detail">
      <span className="detail-back" onClick={onBack}>
        <IconArrowLeft size={14}/> Back to projects
      </span>

      <div className="detail-hero-pill">
        <span className="pill">{project.tags?.[0] || "Project"}</span>
      </div>

      <h1 className="detail-title">{project.name}</h1>

      <p style={{marginTop: 16, maxWidth: 720, fontSize: 18, lineHeight: 1.35, letterSpacing: "-0.02em", color: "var(--fg-3)"}}>
        {project.description}
      </p>

      <div className="detail-meta">
        <div className="detail-meta-block">
          <span className="detail-meta-label">Role</span>
          <span className="detail-meta-value">{project.detail?.role || "—"}</span>
        </div>
        <div className="detail-meta-block">
          <span className="detail-meta-label">Timeline</span>
          <span className="detail-meta-value">{project.detail?.timeline || "—"}</span>
        </div>
        <div className="detail-meta-block">
          <span className="detail-meta-label">Client</span>
          <span className="detail-meta-value">{project.detail?.client || "—"}</span>
        </div>
        {project.url && (
          <div className="detail-meta-block">
            <span className="detail-meta-label">URL</span>
            <span className="detail-meta-value" style={{display:"inline-flex", alignItems:"center", gap:6, color:"var(--lime-400)"}}>
              {project.url} <IconExternal size={12}/>
            </span>
          </div>
        )}
      </div>

      <div className="detail-image">
        <img src={project.detail?.hero || project.image} alt={project.name} />
      </div>

      <div className="detail-body">
        <h3>The work</h3>
        {(project.detail?.body || []).map((para, i) => <p key={i}>{para}</p>)}
      </div>

      <div style={{marginTop: 64, paddingTop: 32, borderTop: "1px solid var(--border-strong)"}}>
        <button className="btn-primary" style={{height: 48, padding: "0 32px", fontSize: 14}} onClick={onBack}>
          ← See more projects
        </button>
      </div>
    </div>
  );
}

window.ProjectDetail = ProjectDetail;
