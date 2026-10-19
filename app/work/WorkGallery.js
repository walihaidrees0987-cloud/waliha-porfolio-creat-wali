"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Arrow from "../components/Arrow";
import CategoryDropdown from "../components/CategoryDropdown";
import { PORTFOLIO, ARTWORK_COUNT } from "../data/portfolio";
import CollectionCover from "./CollectionCover";

function CollectionCard({ project }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const card = useRef(null);
  useEffect(() => {
    if (project.coverStyle !== "sequence" || paused) return;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    let timer;
    let visible = false;
    const update = () => {
      clearInterval(timer);
      if (visible && !motion.matches && !document.hidden) timer = setInterval(() => setActiveIndex(index => index >= project.images.length - 4 ? 0 : Math.min(index + 4, project.images.length - 4)), 4000);
    };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); });
    observer.observe(card.current);
    motion.addEventListener("change", update);
    document.addEventListener("visibilitychange", update);
    return () => { clearInterval(timer); observer.disconnect(); motion.removeEventListener("change", update); document.removeEventListener("visibilitychange", update); };
  }, [project, paused]);
  return <article className={`portfolio-card ${project.coverStyle ? "portfolio-card-originals" : ""}`} ref={card}>
    <Link className="portfolio-card-link" href={`/work/${project.slug}`}>
      <div className="portfolio-cover"><CollectionCover project={project} activeIndex={activeIndex}/></div>
      {project.clientLabel && <span className="portfolio-client-label">{project.clientLabel}</span>}
      <div className="portfolio-caption"><div><h3>{project.title}</h3><p>{project.category} · {project.images.length} designs</p></div><span className="portfolio-arrow"><Arrow/></span></div>
    </Link>
    {project.coverStyle === "sequence" && <button className="sequence-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(value => !value)}>{paused ? "Play sequence" : "Pause sequence"}</button>}
  </article>;
}

export default function WorkGallery() {
  const [category,setCategory] = useState("All Projects");
  const [search,setSearch] = useState("");
  const grid = useRef(null);
  const projects = PORTFOLIO.filter(p => (category === "All Projects" || p.category === category) && `${p.title} ${p.category} ${p.description} ${p.sections?.map(section => section.title).join(" ") || ""}`.toLowerCase().includes(search.trim().toLowerCase()));
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {entry.target.classList.add("is-visible");observer.unobserve(entry.target);}
    }), {threshold:0.08});
    grid.current?.querySelectorAll(".portfolio-card").forEach(card => observer.observe(card));
    return () => observer.disconnect();
  }, [category,search]);
  return <section className="real-work" aria-labelledby="work-gallery-title">
    <div className="real-work-heading"><div><p className="portfolio-eyebrow">Waliha Idrees / Selected work</p><h2 id="work-gallery-title">Ideas made visible.</h2></div><p>{PORTFOLIO.length} collections. {ARTWORK_COUNT} original designs.<br/>Brand identities, campaigns and visual stories.</p></div>
    <div className="portfolio-toolbar"><CategoryDropdown value={category} onChange={setCategory} options={["All Projects",...new Set(PORTFOLIO.map(p=>p.category))]}/><label className="portfolio-search">Search<input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Find a project..."/></label></div>
    <div className="real-work-grid" ref={grid}>{projects.map(project => <CollectionCard key={project.slug} project={project}/>)}</div>
    {!projects.length&&<p className="portfolio-empty">No projects match your search. Try another category.</p>}
  </section>;
}
