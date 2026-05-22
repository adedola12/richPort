import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/* ─── Data ─── */
const TESTIMONIALS = [
  { id:1, name:"Emeka Ihejirika",  title:"Product Manager, YDPay",          tag:"UI / UX Design",    tagColor:"#01BA4B", stars:5, text:"The redesign Richard led for YDPay was transformational. He managed the complexity of 96 screens with clarity and precision — the final product exceeded every expectation we set." },
  { id:2, name:"Amaka Eze",        title:"Creative Director, BookRion",      tag:"Brand Design",      tagColor:"#818cf8", stars:5, text:"From the logo to the full brand system, Richard delivered a consistent, bold identity that our readers immediately connected with. Truly world-class work." },
  { id:3, name:"Sarah Mitchell",   title:"Founder, Lumio Studio",            tag:"Brand Design",      tagColor:"#818cf8", stars:5, text:"Richard brought our brand to life in ways we didn't even know were possible. His attention to detail and ability to translate vision into a cohesive identity is exceptional." },
  { id:4, name:"David Okonkwo",    title:"CEO, Tradeflow Africa",            tag:"Graphic Design",    tagColor:"#f59e0b", stars:5, text:"Working with Richard was one of the best decisions for our product. The UI was not just beautiful — it was intuitive, and our conversion rate doubled after the redesign." },
  { id:5, name:"Ngozi Adeyemi",    title:"Founder, Whitespace Creatorverse", tag:"Creative Direction",tagColor:"#84cc16", stars:5, text:"Richard is one of those rare designers who thinks strategically and executes beautifully. He understands business context and delivers design that actually drives results." },
];

/*
  Cards fill the full scroll range — last card ends at 1.0 so the section
  releases the instant card 5 finishes stacking. Zero dead space.
*/
const CARD_RANGES = [
  [0.05, 0.24],
  [0.24, 0.43],
  [0.43, 0.62],
  [0.62, 0.81],
  [0.81, 1.00],
];

const RESTING = [
  { y: 9,  rotate: -1.8, x: -5 },
  { y: 6,  rotate:  1.2, x:  4 },
  { y: 4,  rotate: -0.9, x: -3 },
  { y: 2,  rotate:  0.5, x:  2 },
  { y: 0,  rotate:  0,   x:  0 },
];

/* ─── Starfield ─── */
const mkLCG = (s) => { s = s>>>0; return () => { s=(Math.imul(s,1664525)+1013904223)>>>0; return s/0x100000000; }; };
const rng   = mkLCG(0xdeadbeef);
const STARS = Array.from({length:90}, () => ({
  x: rng()*100, y: rng()*100, r: 0.5+rng()*1.5,
  op: 0.07+rng()*0.2, dur: 2+rng()*5, delay: rng()*4,
}));

const Starfield = () => (
  <svg aria-hidden="true" className="pointer-events-none absolute inset-0 hidden lg:block"
    style={{width:"100%",height:"100%",zIndex:0}}>
    {STARS.map((s,i) => (
      <motion.circle key={i} cx={`${s.x}%`} cy={`${s.y}%`} r={s.r} fill="white"
        animate={{opacity:[s.op, s.op*3.5, s.op]}}
        transition={{duration:s.dur, delay:s.delay, repeat:Infinity, ease:"easeInOut"}} />
    ))}
  </svg>
);

/* ─── Glass icons ─── */
const GLASS_ICONS = [
  { src:"/flower-glass-spectrum.png", size:165, pos:{top:"6%",left:"8%"},      dx:[0,10,-7,12,-4,6,0],  dy:[0,-8,12,-13,7,-5,0], ddur:42, ps:[1,1.06,0.96,1.05,0.97,1.04,1], pdur:12, sdeg:360,  sdur:60 },
  { src:"/torus-glass.png",           size:95,  pos:{bottom:"8%",right:"5%"},  dx:[0,-12,8,-5,11,-8,0], dy:[0,11,-10,9,-7,10,0], ddur:36, ps:[1,0.95,1.07,0.96,1.06,0.97,1],pdur:10, sdeg:-360, sdur:50 },
  { src:"/spiral-glass.png",          size:140, pos:{bottom:"5%",left:"22%"},  dx:[0,8,-11,6,-9,5,0],   dy:[0,-10,6,-14,8,-4,0], ddur:48, ps:[1,1.05,0.94,1.07,0.96,1.04,1],pdur:14, sdeg:360,  sdur:70 },
  { src:"/abstract-glass.png",        size:115, pos:{top:"18%",right:"10%"},   dx:[0,-9,13,-6,10,-11,0],dy:[0,12,-7,11,-10,6,0], ddur:38, ps:[1,0.96,1.06,0.94,1.07,0.97,1],pdur:11, sdeg:-360, sdur:55 },
];

const SpaceIcon = ({ icon, scrollProgress }) => {
  const opacity   = useTransform(scrollProgress, [0, 0.08], [0, 1]);
  const baseScale = useTransform(scrollProgress, [0, 0.08], [0.65, 1]);
  return (
    <motion.div className="pointer-events-none absolute hidden lg:block"
      style={{...icon.pos, width:icon.size, height:icon.size, opacity, scale:baseScale}}>
      <motion.div style={{width:"100%",height:"100%"}}
        animate={{x:icon.dx, y:icon.dy}}
        transition={{duration:icon.ddur, repeat:Infinity, ease:"easeInOut", repeatType:"loop"}}>
        <motion.img src={icon.src} alt="" aria-hidden="true"
          animate={{scale:icon.ps, rotate:[0,icon.sdeg]}}
          transition={{
            scale:  {duration:icon.pdur, repeat:Infinity, ease:"easeInOut", repeatType:"loop"},
            rotate: {duration:icon.sdur, repeat:Infinity, ease:"linear"},
          }}
          style={{width:"100%",height:"100%",objectFit:"contain",filter:"drop-shadow(0 20px 40px rgba(0,0,0,0.5))"}} />
      </motion.div>
    </motion.div>
  );
};

/* ─── Star ─── */
const Star = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled?"#84cc16":"rgba(255,255,255,0.15)"}>
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>
  </svg>
);

/* ─── Single testimonial card ─── */
const TCard = ({ data, range, resting, zIndex, scrollProgress }) => {
  const scale   = useTransform(scrollProgress, range, [0.12, 1]);
  const opacity = useTransform(scrollProgress, [range[0], range[0] + 0.06], [0, 1]);
  const y       = useTransform(scrollProgress, range, [0, resting.y]);
  const x       = useTransform(scrollProgress, range, [0, resting.x]);
  const rotate  = useTransform(scrollProgress, range, [0, resting.rotate]);

  const initials = data.name.split(" ").map(n => n[0]).join("");

  return (
    <motion.div style={{position:"absolute", inset:0, zIndex, scale, opacity, y, x, rotate}}>
      <div style={{
        width:"100%", height:"100%",
        background:"linear-gradient(145deg, rgba(22,22,22,0.97) 0%, rgba(10,10,10,0.99) 100%)",
        border:"1px solid rgba(255,255,255,0.07)",
        borderRadius:22,
        padding:"32px 40px",
        backdropFilter:"blur(24px)",
        boxShadow:"0 28px 70px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.03) inset",
        display:"flex", flexDirection:"column", justifyContent:"space-between",
      }}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
          <div style={{display:"flex",gap:3}}>
            {Array.from({length:5}).map((_,i) => <Star key={i} filled={i<data.stars}/>)}
          </div>
          <span style={{
            fontSize:9, letterSpacing:"0.18em", textTransform:"uppercase", fontWeight:700,
            color:data.tagColor, background:`${data.tagColor}15`, border:`1px solid ${data.tagColor}30`,
            borderRadius:99, padding:"3px 10px",
          }}>{data.tag}</span>
        </div>

        <p style={{fontSize:16,lineHeight:1.75,color:"rgba(255,255,255,0.72)",fontStyle:"italic",flexGrow:1}}>
          &ldquo;{data.text}&rdquo;
        </p>

        <div style={{height:1,background:"rgba(255,255,255,0.06)",margin:"22px 0"}}/>

        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <div style={{
            width:46, height:46, borderRadius:"50%",
            background:`linear-gradient(135deg, ${data.tagColor}30 0%, ${data.tagColor}08 100%)`,
            border:`1px solid ${data.tagColor}30`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:14, fontWeight:700, color:data.tagColor, flexShrink:0,
          }}>{initials}</div>
          <div>
            <p style={{fontSize:14,fontWeight:600,color:"white",lineHeight:1.2}}>{data.name}</p>
            <p style={{fontSize:11,color:"rgba(255,255,255,0.38)",marginTop:3}}>{data.title}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ════════════════════════════════════════════════════════
   Testimonials — sticky scroll-driven section
   ════════════════════════════════════════════════════════ */
const Testimonials = () => {
  const wrapperRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const headingOpacity = useTransform(scrollYProgress, [0, 0.05, 0.80, 0.95], [0, 1, 1, 0]);
  const headingY       = useTransform(scrollYProgress, [0, 0.05], [24, 0]);
  const pillOpacity    = useTransform(scrollYProgress, [0, 0.04], [0, 1]);
  const nudgeOpacity   = useTransform(scrollYProgress, [0, 0.04, 0.12], [0, 1, 0]);

  return (
    <section ref={wrapperRef} className="relative bg-[#050505]" style={{height:"320vh"}}>

      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center gap-10">

        <Starfield />

        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{width:700,height:500,background:"radial-gradient(ellipse,rgba(132,204,22,0.04) 0%,transparent 68%)",filter:"blur(40px)"}}/>

        {GLASS_ICONS.map((icon,i) => (
          <SpaceIcon key={i} icon={icon} scrollProgress={scrollYProgress}/>
        ))}

        <motion.div className="text-center px-6 pointer-events-none relative z-10"
          style={{opacity:headingOpacity, y:headingY}}>
          <motion.div
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 mb-5 backdrop-blur"
            style={{opacity:pillOpacity}}>
            <span className="text-[11px] font-semibold tracking-widest uppercase text-neutral-50/80">
              Testimonials
            </span>
          </motion.div>
          <h2 className="text-[34px] sm:text-[46px] lg:text-[58px] font-['Outfit'] font-semibold leading-[0.92] tracking-[-0.04em]"
            style={{background:"linear-gradient(180deg,#ffffff 0%,#7a7a7a 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
            Hear the Voice<br/>of the People
          </h2>
          <p className="mt-3 text-[15px] sm:text-[16px] text-neutral-400 max-w-sm mx-auto">
            Real words from real people who trusted the process.
          </p>
        </motion.div>

        <div className="relative z-10"
          style={{width:640, maxWidth:"calc(100vw - 32px)", height:380}}>
          {TESTIMONIALS.map((t, i) => (
            <TCard
              key={t.id}
              data={t}
              range={CARD_RANGES[i]}
              resting={RESTING[i]}
              zIndex={i + 1}
              scrollProgress={scrollYProgress}
            />
          ))}
        </div>

        <motion.p
          className="absolute bottom-10 text-[10px] tracking-[0.2em] uppercase text-neutral-600 pointer-events-none"
          style={{opacity: nudgeOpacity}}
        >
          Scroll to reveal
        </motion.p>

      </div>
    </section>
  );
};

export default Testimonials;
