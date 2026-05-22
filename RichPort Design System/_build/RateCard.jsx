/* RichPort Portfolio UI Kit — RateCard screen
   Mirrors /rate-details: heading, plan tabs, 3-up pricing
   cards (featured center), simplified enquiry form.
   ============================================================ */

const RATE_CATEGORIES = [
  {
    id: "brand-identity",
    label: "Brand Identity",
    heading: "Brand identity packages",
    description: "From the first sketch to a press-ready guideline. Choose the shape that matches the brief.",
    plans: [
      { id:"starter", name:"Starter", price:600, currency:"USD", description:"For solo founders ready to launch a clean, focused mark." },
      { id:"growth",  name:"Growth",  price:1500, currency:"USD", description:"Full brand build: strategy, identity system, launch kit.", isFeatured:true },
      { id:"studio",  name:"Studio",  price:3200, currency:"USD", description:"Multi-product brand system with documented guidelines.", isPremium:true },
    ],
  },
  {
    id: "ui-ux",
    label: "UI / UX",
    heading: "Product design engagements",
    description: "Discovery, design and delivery for product teams shipping web or mobile apps.",
    plans: [
      { id:"audit", name:"Audit", price:800, currency:"USD", description:"A focused review of one flow with annotated recommendations." },
      { id:"sprint", name:"Sprint", price:2400, currency:"USD", description:"Two-week paired sprint to ship a screen or feature end-to-end.", isFeatured:true },
      { id:"retainer", name:"Retainer", price:4500, currency:"USD", description:"One-month engagement, weekly check-ins, full Figma access.", isPremium:true },
    ],
  },
  {
    id: "graphics",
    label: "Graphic Design",
    heading: "Graphic design retainers",
    description: "Flyers, social media tiles, presentations, publications. Single drops or monthly packs.",
    plans: [
      { id:"single", name:"Single Drop", price:120, currency:"USD", description:"One flyer or social post, two rounds of feedback." },
      { id:"pack",   name:"Monthly Pack", price:850, currency:"USD", description:"Up to 10 deliverables per month with a 48-hour turnaround.", isFeatured:true },
      { id:"campaign", name:"Campaign", price:2200, currency:"USD", description:"End-to-end campaign with photography direction and copy.", isPremium:true },
    ],
  },
];

const SERVICE_OPTIONS = [
  "Website Design", "Logo Design", "Brand Identity Design", "Event Branding",
  "Presentation Design", "Pitch Deck Design", "Publication Design", "Others",
];

function PricingCard({ plan, featured }) {
  const isFeatured = plan.isFeatured || featured;
  const isPremium = plan.isPremium;

  if (isFeatured) {
    return (
      <div style={{position: "relative", borderRadius: 32, background: "linear-gradient(to bottom,#84CC16,#65A30D)", padding: 3, boxShadow: "0 22px 90px rgba(132,204,22,0.55)", marginTop: -16}}>
        <div style={{borderRadius: 28, background: "#111318", overflow: "hidden"}}>
          <div style={{background: "#84CC16", padding: 14, textAlign: "center", fontWeight: 700, fontSize: 14, color: "#fff"}}>
            Most popular
          </div>
          <div style={{padding: "28px 32px 36px"}}>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12}}>
              <img src={window.__resources.badgeSilver} alt="Silver tier badge" style={{height: 56, width: "auto", objectFit: "contain"}} />
              <span style={{display:"inline-flex", alignItems:"center", gap:4, padding:"4px 12px", borderRadius:9999, background:"linear-gradient(to bottom,#84CC16,#4D7C0F)", fontWeight:600, fontSize:11, color:"#fff", boxShadow:"0 0 18px rgba(190,242,100,0.8)"}}>
                <IconFire size={12}/> Recommended
              </span>
            </div>
            <h3 style={{textAlign: "center", fontWeight: 800, fontSize: 30, color: "#fff", marginBottom: 8}}>{plan.name}</h3>
            <p style={{textAlign: "center", fontWeight: 600, fontSize: 14, lineHeight: 1.35, color: "var(--fg-2)", marginBottom: 24, maxWidth: 280, margin: "0 auto 24px"}}>{plan.description}</p>
            <div style={{textAlign: "center", fontWeight: 800, fontSize: 48, color: "#fff", marginBottom: 28}}>${plan.price}</div>
            <button style={{width: "100%", padding: 12, borderRadius: 12, background: "linear-gradient(to bottom,#84CC16,#4D7C0F)", color: "#fff", fontWeight: 700, fontSize: 14, border: 0, boxShadow: "0 12px 40px rgba(132,204,22,0.7)", cursor: "pointer"}}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{position: "relative", borderRadius: 32, border: "1px solid rgba(132,204,22,0.35)", background: "radial-gradient(circle at top, rgba(132,204,22,0.22), transparent 55%), #050505", boxShadow: "0 20px 80px rgba(0,0,0,0.85)", padding: "32px"}}>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12}}>
        <img src={isPremium ? window.__resources.badgePlatinum : window.__resources.badgeGold} alt={isPremium ? "Platinum tier badge" : "Gold tier badge"} style={{height: 56, width: "auto", objectFit: "contain"}} />
        {isPremium && (
          <span style={{display:"inline-flex", alignItems:"center", padding:"4px 12px", borderRadius:9999, background:"linear-gradient(to bottom,#6366F1,#4338CA)", fontWeight:600, fontSize:11, color:"#fff"}}>
            Premium Choice
          </span>
        )}
      </div>
      <h3 style={{textAlign: "center", fontWeight: 800, fontSize: 30, color: "#fff"}}>{plan.name}</h3>
      <p style={{marginTop: 16, textAlign: "center", fontWeight: 600, fontSize: 14, lineHeight: 1.35, color: "var(--fg-2)", marginBottom: 24, maxWidth: 280, marginLeft: "auto", marginRight: "auto"}}>{plan.description}</p>
      <div style={{textAlign: "center", fontWeight: 800, fontSize: 48, color: "#fff", marginBottom: 28}}>${plan.price}</div>
      <button style={{width: "100%", padding: 12, borderRadius: 12, background: "linear-gradient(to bottom,#64748B,#1E293B)", color: "#fff", fontWeight: 700, fontSize: 14, border: 0, boxShadow: "0 10px 35px rgba(0,0,0,0.8)", cursor: "pointer"}}>
        Get Started
      </button>
    </div>
  );
}

function RateForm() {
  const [services, setServices] = React.useState([]);
  const [budget, setBudget] = React.useState(3000);
  const [submitted, setSubmitted] = React.useState(false);

  const toggle = (s) => setServices(prev => prev.includes(s) ? prev.filter(x=>x!==s) : [...prev, s]);

  const card = {
    margin: "0 32px",
    borderRadius: 14,
    background: "#111318",
    border: "1px solid rgba(255,255,255,0.05)",
    boxShadow: "0 24px 80px rgba(0,0,0,0.9)",
    padding: "28px 32px",
  };
  const underline = {
    marginTop: 12,
    borderBottom: "1px solid var(--border-mid)",
    paddingBottom: 8,
  };
  const input = {
    width: "100%",
    background: "transparent",
    border: 0,
    outline: 0,
    fontSize: 14,
    color: "#fff",
  };

  return (
    <section id="rate-form" style={{position: "relative", padding: "40px 0 80px", background: "var(--bg-deep)"}}>
      <div style={{maxWidth: 1100, margin: "0 auto", padding: "0 16px"}}>
        <div style={{borderLeft: "1px solid var(--border-mid)", borderRight: "1px solid var(--border-mid)", padding: "16px 0"}}>
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{display: "flex", flexDirection: "column", gap: 24}}>
            <div style={card}>
              <div style={{display: "grid", gap: 32, gridTemplateColumns: "1fr 1fr"}}>
                <div>
                  <label style={{fontSize: 13, fontWeight: 600, color: "#fff"}}>Full Name</label>
                  <div style={underline}><input style={input} placeholder="Type here" required /></div>
                </div>
                <div>
                  <label style={{fontSize: 13, fontWeight: 600, color: "#fff"}}>Email</label>
                  <div style={underline}><input style={input} type="email" placeholder="Type here" required /></div>
                </div>
              </div>
            </div>

            <div style={card}>
              <p style={{marginBottom: 20, fontSize: 15, fontWeight: 600, color: "#fff"}}>Why are you contacting us?</p>
              <div style={{display: "grid", gap: "16px 40px", gridTemplateColumns: "1fr 1fr"}}>
                {SERVICE_OPTIONS.map(s => {
                  const checked = services.includes(s);
                  return (
                    <label key={s} style={{display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "var(--fg-2)", cursor: "pointer"}}>
                      <span style={{
                        display: "flex", alignItems: "center", justifyContent: "center",
                        height: 28, width: 28,
                        borderRadius: 6,
                        border: checked ? "1px solid var(--lime-400)" : "1px solid #2b2c30",
                        background: "#141518",
                        boxShadow: checked ? "0 0 14px rgba(190,242,100,0.7)" : "0 0 0 1px rgba(0,0,0,0.75)",
                        color: "var(--lime-400)",
                        transition: "all 150ms",
                      }}>
                        {checked && <IconCheck size={14}/>}
                      </span>
                      <input type="checkbox" checked={checked} onChange={() => toggle(s)} style={{position: "absolute", opacity: 0, width: 0, height: 0}} />
                      <span>{s}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div style={card}>
              <p style={{marginBottom: 6, fontSize: 15, fontWeight: 600, color: "#fff"}}>Your Budget</p>
              <p style={{marginBottom: 24, fontSize: 13, color: "var(--fg-3)"}}>Slide to indicate your budget range</p>
              <input type="range" min={1000} max={5000} step={250} value={budget} onChange={e=>setBudget(+e.target.value)} style={{width: "100%", accentColor: "var(--lime-500)"}} />
              <div style={{display: "flex", justifyContent: "space-between", marginTop: 16, fontSize: 12, color: "var(--fg-4)"}}>
                <span>$1,000</span>
                <span style={{color: "var(--fg-2)"}}>${budget.toLocaleString()}</span>
                <span>$5,000</span>
              </div>
            </div>

            <div style={card}>
              <label style={{fontSize: 13, fontWeight: 600, color: "#fff"}}>Your Message</label>
              <div style={{...underline, marginTop: 18}}>
                <textarea style={{...input, resize: "none"}} placeholder="Type here" rows={3} />
              </div>
            </div>

            <div style={{display: "flex", justifyContent: "center", paddingTop: 8}}>
              <button type="submit" className="btn-primary" style={{minWidth: 180, height: 48, fontSize: 14, padding: "0 40px"}}>
                {submitted ? "✓ Sent" : "Submit"}
              </button>
            </div>
            {submitted && (
              <p style={{textAlign: "center", fontSize: 13, color: "var(--lime-400)"}}>
                Thanks! Your request has been sent (demo).
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

function RateCard() {
  const [activeId, setActiveId] = React.useState(RATE_CATEGORIES[0].id);
  const active = RATE_CATEGORIES.find(c => c.id === activeId);

  const scrollToForm = () => {
    document.getElementById("rate-form")?.scrollIntoView({behavior:"smooth"});
  };

  return (
    <div style={{paddingTop: 80}}>
      <section style={{position: "relative", padding: "80px 0", background: "var(--bg-deep)"}}>
        <div className="glow" style={{background: "#84CC16", opacity: 0.14, width: 288, height: 288, left: -80, top: 0, filter: "blur(190px)"}} />
        <div className="glow" style={{background: "#84CC16", opacity: 0.10, width: 288, height: 288, right: -60, bottom: -60, filter: "blur(200px)"}} />

        <div style={{position: "relative", maxWidth: 1200, margin: "0 auto", padding: "0 32px"}}>
          <div style={{textAlign: "center"}}>
            <h2 style={{fontWeight: 800, fontSize: "clamp(30px,4vw,40px)", color: "#fff"}}>
              {active.heading}
            </h2>
            <p style={{marginTop: 14, maxWidth: 720, marginLeft: "auto", marginRight: "auto", fontSize: 16, fontWeight: 600, lineHeight: 1.35, color: "var(--fg-2)"}}>
              {active.description}
            </p>
          </div>

          <div style={{marginTop: 40, display: "flex", justifyContent: "center"}}>
            <div style={{display: "inline-flex", gap: 8, padding: 8, borderRadius: 12, border: "1px solid var(--border-faint)", background: "rgba(24,24,32,0.95)", backdropFilter: "blur(10px)"}}>
              {RATE_CATEGORIES.map(c => (
                <button
                  key={c.id}
                  onClick={() => setActiveId(c.id)}
                  style={{
                    padding: "8px 18px",
                    borderRadius: 12,
                    fontSize: 13,
                    background: activeId === c.id ? "#2c2d34" : "transparent",
                    color: activeId === c.id ? "#fff" : "var(--fg-3)",
                    border: 0,
                    cursor: "pointer",
                    boxShadow: activeId === c.id ? "inset 0 1px 2px rgba(0,0,0,0.4)" : "none",
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{marginTop: 48, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "start"}}>
            {active.plans.map(p => <PricingCard key={p.id} plan={p} />)}
          </div>

          <div style={{marginTop: 48, display: "flex", flexDirection: "column", alignItems: "center", gap: 12}}>
            <button style={{padding: "12px 40px", borderRadius: 16, background: "linear-gradient(to bottom,#343747,#1d1f27)", color: "#fff", fontWeight: 600, fontSize: 14, border: 0, cursor: "pointer", boxShadow: "0 18px 70px rgba(0,0,0,0.9)"}}>
              Compare Plans
            </button>
            <a style={{fontSize: 13, color: "var(--fg-3)", textDecoration: "underline", textUnderlineOffset: 4, cursor: "pointer"}}>
              Click to view samples
            </a>
          </div>
        </div>
      </section>

      <RateForm />
    </div>
  );
}

window.RateCard = RateCard;
