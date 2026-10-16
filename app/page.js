"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { D } from "../lib/data";

const Split = ({ text }) =>
  text.split(" ").map((w, i) => (
    <span key={i} className="w">
      <span>{w}</span>{" "}
    </span>
  ));

function Img({ src, alt }) {
  const [bad, setBad] = useState(false);
  return bad ? <div className="fallback" style={{ height: "100%" }} /> : <img src={src} alt={alt} onError={() => setBad(true)} />;
}

function Stack() {
  const [i, setI] = useState(0);
  const g = D.toolGroups[i];
  return (
    <div className="stk tools-wrap">
      <ul className="cats">
        {D.toolGroups.map((x, k) => (
          <li key={x.cat}>
            <button className={k === i ? "on" : ""} onMouseEnter={() => setI(k)} onFocus={() => setI(k)} onClick={() => setI(k)}>{x.cat}</button>
          </li>
        ))}
      </ul>
      <div className="tools" key={g.cat}>
        <p className="lead">{g.line}</p>
        {g.items.map((t, k) => (
          <div className="tool" key={t.n} style={{ "--k": k }}><b>{t.n}</b><span>{t.u}</span></div>
        ))}
      </div>
    </div>
  );
}

function Testimonial({ t }) {
  const [open, setOpen] = useState(false);
  const [first, ...rest] = t.q.split("\n\n");
  const toggle = () => {
    setOpen(!open);
    setTimeout(() => ScrollTrigger.refresh(), 800);
  };
  return (
    <article className={`tcard${open ? " open" : ""}`}>
      <div className="thl">
        <span className="qm" aria-hidden="true">“</span>
        <p className="d">{t.hl}</p>
      </div>
      <div className="tbody">
        <p className="t1">{first}</p>
        {rest.length > 0 && (
          <>
            <div className="more"><div>{rest.map((r, i) => <p key={i}>{r}</p>)}</div></div>
            <button className="tog" onClick={toggle} aria-expanded={open}>
              {open ? "Show less" : "Read full review"}
            </button>
          </>
        )}
        <div className="by">
          <span className="av">{t.by[0]}</span>
          <div><b>{t.by}</b><small>{t.role}</small></div>
          <span className="stars" aria-label="5 out of 5 stars">★★★★★</span>
        </div>
      </div>
    </article>
  );
}

export default function Page() {
  const root = useRef(null);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({ lerp: reduce ? 1 : 0.085 });
    lenis.stop();
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(root);

      // --- preloader -> hero intro (the one orchestrated moment)
      const counter = { v: 0 };
      const intro = gsap.timeline();
      intro
        .to(counter, { v: 100, duration: reduce ? 0.1 : 1.8, ease: "power2.inOut", onUpdate: () => setPct(Math.round(counter.v)) })
        .to(".pre", { yPercent: -100, duration: 1, ease: "expo.inOut" })
        .from(".hero h1 .w>span", { yPercent: 120, rotate: 6, duration: 1.3, stagger: 0.07, ease: "expo.out" }, "-=.4")
        .from(".hero-foot > *, .nav > *", { opacity: 0, y: 30, duration: 1, stagger: 0.1, ease: "power3.out", onComplete: () => lenis.start() }, "-=.9");

      // --- split-text reveals
      q("[data-split]").forEach((el) =>
        gsap.from(el.querySelectorAll(".w>span"), {
          yPercent: 115, duration: 1.1, stagger: 0.035, ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 88%" },
        })
      );

      // --- hero: blob follows mouse, headline drifts on scroll, role rotator
      const bx = gsap.quickTo(".blob", "x", { duration: 1.2, ease: "power3" });
      const by = gsap.quickTo(".blob", "y", { duration: 1.2, ease: "power3" });
      const move = (e) => { bx(e.clientX); by(e.clientY); };
      window.addEventListener("mousemove", move);
      gsap.to(".hero h1", { yPercent: -18, scale: 0.94, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      const n = D.roles.length;
      const rt = gsap.timeline({ repeat: -1 });
      D.roles.forEach((_, i) => rt.to(".role div", { yPercent: (-100 * (i + 1)) / (n + 1), duration: 0.8, ease: "expo.inOut" }, "+=1.6"));
      rt.set(".role div", { yPercent: 0 });

      // --- parallax images + about photo reveal
      q(".px").forEach((el) =>
        gsap.fromTo(el.querySelector("img,.fallback"), { yPercent: -10 }, { yPercent: 10, ease: "none", scrollTrigger: { trigger: el, scrub: true } })
      );
      gsap.from(".photo", { clipPath: "inset(30% 20% 30% 20% round 999px)", duration: 1.6, ease: "expo.out", scrollTrigger: { trigger: ".photo", start: "top 85%" } });

      // --- facts: rule draws, text rises
      q(".fact").forEach((el) => {
        gsap.from(el.querySelector(".ln"), { scaleX: 0, transformOrigin: "left", duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
        gsap.from(el.querySelectorAll(".fk,.fv"), { y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 88%" } });
      });

      // --- services rows slide in
      q(".row").forEach((el) => gsap.from(el, { opacity: 0, x: -60, duration: 1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%" } }));

      // --- work: sticky stacking panels, previous panel recedes
      const pjs = q(".pj");
      pjs.forEach((el, i) => {
        const shot = el.querySelector(".pshot");
        gsap.from(shot, { clipPath: "inset(0 0 100% 0 round 20px)", duration: 1.4, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 70%" } });
        gsap.fromTo(shot.querySelector("img,.fallback"), { yPercent: -8 }, { yPercent: 8, ease: "none", scrollTrigger: { trigger: el, scrub: true } });
        if (pjs[i + 1]) gsap.to(el.querySelector(".pin"), { scale: 0.9, opacity: 0.3, ease: "none", scrollTrigger: { trigger: pjs[i + 1], start: "top bottom", end: "top top", scrub: true } });
      });

      // --- milestones: line fills with scroll, each node lights up when reached
      gsap.fromTo(".ms-fill", { scaleY: 0, transformOrigin: "top" }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".ms", start: "top 60%", end: "bottom 60%", scrub: true } });
      q(".node").forEach((el) => {
        ScrollTrigger.create({ trigger: el, start: "top 60%", toggleClass: { targets: el, className: "on" } });
        gsap.from(el.querySelector(".ms-body"), { x: 90, opacity: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 80%" } });
      });
      gsap.from(".tools-wrap", { y: 80, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: ".tools-wrap", start: "top 85%" } });

      q(".tcard").forEach((el) => {
        gsap.from(el, { y: 90, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } });
        gsap.from(el.querySelector(".qm"), { rotate: -25, scale: 0.4, transformOrigin: "left bottom", duration: 1.2, ease: "back.out(2)", scrollTrigger: { trigger: el, start: "top 85%" } });
      });

      // --- section colour handoff: dark section grows as it enters
      gsap.from(".contact", { borderTopLeftRadius: "50% 120px", borderTopRightRadius: "50% 120px", ease: "none", scrollTrigger: { trigger: ".contact", start: "top bottom", end: "top 30%", scrub: true } });

      // --- magnetic buttons
      q(".mag").forEach((b) => {
        const mx = gsap.quickTo(b, "x", { duration: 0.5, ease: "power3" });
        const my = gsap.quickTo(b, "y", { duration: 0.5, ease: "power3" });
        b.addEventListener("mousemove", (e) => { const r = b.getBoundingClientRect(); mx((e.clientX - r.left - r.width / 2) * 0.35); my((e.clientY - r.top - r.height / 2) * 0.5); });
        b.addEventListener("mouseleave", () => { mx(0); my(0); });
      });

      // --- cursor
      const cx = gsap.quickTo(".cur", "x", { duration: 0.25, ease: "power3" });
      const cy = gsap.quickTo(".cur", "y", { duration: 0.25, ease: "power3" });
      const cm = (e) => { cx(e.clientX); cy(e.clientY); };
      window.addEventListener("mousemove", cm);
      q("a,button,.card,.row").forEach((el) => {
        el.addEventListener("mouseenter", () => q(".cur")[0].classList.add("big"));
        el.addEventListener("mouseleave", () => q(".cur")[0].classList.remove("big"));
      });
    }, root);

    // --- page-transition curtain for in-page links
    const go = (e) => {
      const a = e.target.closest("a[href^='#']");
      if (!a || a.getAttribute("href") === "#" || a.target) return;
      e.preventDefault();
      const target = document.querySelector(a.getAttribute("href"));
      if (!target) return;
      gsap.timeline()
        .to(".curtain", { y: 0, yPercent: -100, duration: 0.7, ease: "expo.inOut", startAt: { yPercent: 0 } })
        .add(() => { lenis.scrollTo(target, { immediate: true, force: true }); ScrollTrigger.refresh(); })
        .to(".curtain", { yPercent: -200, duration: 0.7, ease: "expo.inOut" })
        .set(".curtain", { yPercent: 0 });
    };
    document.addEventListener("click", go);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      document.removeEventListener("click", go);
    };
  }, []);

  const wa = `https://wa.me/${D.whatsapp}?text=${encodeURIComponent("Hi, I saw your portfolio and want to build a project.")}`;

  return (
    <main ref={root}>
      <div className="cur" />
      <div className="curtain" />
      <div className="pre"><span>{D.brand}</span><b>{pct}</b></div>

      <nav className="nav">
        <a href="#top" className="logo">{D.brand}</a>
        <div><a className="h" href="#about">About</a><a className="h" href="#work">Work</a><a className="h" href="#services">Services</a><a href="#contact">Contact</a></div>
      </nav>

      <section className="hero" id="top">
        <div className="blob" />
        <h1 className="d">
          {D.headline.map((l, i) => <span key={i} className="l"><Split text={l} /></span>)}
        </h1>
        <div className="hero-foot">
          <p>{D.intro}</p>
          <div className="role"><div>{[...D.roles, D.roles[0]].map((r, i) => <span key={i}>{r}</span>)}</div></div>
          <a href="#work" className="scroll-cue">Scroll</a>
        </div>
      </section>

      <div className="mq"><div>{[...D.skills, ...D.skills].map((s, i) => <span key={i}>{s}<i>*</i></span>)}</div></div>

      <section className="sec light" id="about">
        <div className="about">
          <div>
            <h2 className="d" data-split><Split text="One developer. Idea to launch." /></h2>
            <p>{D.about}</p>
          </div>
          <div className="photo px"><Img src={D.images.about} alt="Developer workspace with code on screen" /></div>
        </div>
        <div className="facts">
          {D.facts.map((f) => (
            <div className="fact" key={f.k}><i className="ln" /><span className="fk">{f.k}</span><span className="fv">{f.v}</span></div>
          ))}
        </div>
      </section>

      <section className="sec dark svc" id="services">
        <h2 className="d" data-split><Split text="What I can build for you" /></h2>
        {D.services.map((s) => (
          <div className="row" key={s.t}><h3>{s.t}</h3><p>{s.d}</p></div>
        ))}
      </section>

      <section className="sec dark" id="work" style={{ paddingBottom: "clamp(50px,7vw,100px)" }}>
        <h2 className="d big" data-split><Split text="Selected work" /></h2>
      </section>
      {D.projects.map((p, i) => (
        <article className={`pj ${i % 2 ? "b" : "a"}`} key={p.title}>
          <div className="pin">
            <div className="ptxt">
              <div className="pk">{p.kind}, {p.year}</div>
              <h3 className="d">{p.title}</h3>
              <p>{p.blurb}</p>
              <div className="tags">{p.stack.map((s) => <span key={s}>{s}</span>)}</div>
              <div style={{ marginTop: 32 }}><a className="mag" href={p.link} target="_blank" rel="noreferrer">View project</a></div>
            </div>
            <a className="pshot" href={p.link} target="_blank" rel="noreferrer" aria-label={`View ${p.title}`}>
              <Img src={p.img} alt={p.title} /><span className="vb">View</span>
            </a>
          </div>
        </article>
      ))}

      <section className="sec dark" style={{ borderTop: "1px solid rgba(243,241,255,.15)" }}>
        <h2 className="d big" data-split><Split text="Tools I work with" /></h2>
        <Stack />
      </section>

      <section className="sec light">
        <h2 className="d big" data-split><Split text="How a project runs" /></h2>
        <div className="ms">
          <div className="ms-line"><i className="ms-fill" /></div>
          {D.process.map((s, k) => (
            <div className="node" key={s.t}>
              <span className="dot">{k + 1}</span>
              <div className="ms-body"><span className="when">{s.when}</span><h3 className="d">{s.t}</h3><p>{s.d}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="sec dark">
        <h2 className="d big" data-split><Split text="Kind words" /></h2>
        <div className="tlist">
          {D.testimonials.map((t, i) => <Testimonial key={i} t={t} />)}
        </div>
      </section>

      <section className="sec contact" id="contact">
        <div>
          <h2 className="d" data-split><Split text="Have a project in mind?" /></h2>
          <div className="cta-row">
            <a className="mag" href={wa} target="_blank" rel="noreferrer">Chat on WhatsApp</a>
            <a className="mag alt" href={`mailto:${D.email}`}>{D.email}</a>
          </div>
        </div>
        <div className="foot"><span>{D.brand}</span><span>Available for freelance projects</span><a href="#top">Back to top</a></div>
      </section>
    </main>
  );
}
