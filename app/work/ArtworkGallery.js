"use client";

import { useEffect, useRef, useState } from "react";
import Arrow from "../components/Arrow";

export default function ArtworkGallery({project,story}) {
  const [selected,setSelected] = useState(null);
  const [zoom,setZoom] = useState(false);
  const viewer=useRef(null);
  useEffect(()=>{
    if(selected===null)return;
    const dialog=viewer.current;
    if(!dialog.open)dialog.showModal();
    const previous=document.body.style.overflow;
    document.body.style.overflow="hidden";
    const keys=e=>{
      if(e.key==="ArrowRight"){setSelected(i=>(i+1)%project.images.length);setZoom(false);}
      if(e.key==="ArrowLeft"){setSelected(i=>(i-1+project.images.length)%project.images.length);setZoom(false);}
    };
    document.addEventListener("keydown",keys);
    return ()=>{document.body.style.overflow=previous;document.removeEventListener("keydown",keys);};
  },[selected,project.images.length]);
  const close=()=>{viewer.current.close();setSelected(null);setZoom(false);};
  const move=delta=>{setSelected(i=>(i+delta+project.images.length)%project.images.length);setZoom(false);};
  const image=selected===null?null:project.images[selected];
  const renderArtwork = (im, title = project.title) => {
    const i = project.images.findIndex(item => item.src === im.src);
    return <button type="button" key={im.src} onClick={()=>{setSelected(i);setZoom(false);}} className="artwork-card" aria-label={`View ${title}: ${im.name}`}><img src={im.src} alt={`${title}: ${im.name}`} loading="lazy" width={im.width} height={im.height}/><span>{project.category === "Branding" ? title : String(i+1).padStart(2,"0")} / View artwork <Arrow size={16}/></span></button>;
  };
  return <><div className={`artwork-layout ${project.sections?"grouped-artwork":""} ${project.slug === "logo-design"?"individual-logos":""} ${project.images.length===1?"single-artwork":""}`}>
    {project.sections && project.category === "Branding" ? <div className="project-images identity-gallery">{project.sections.flatMap(group => group.images.map(im => renderArtwork(im, group.title)))}</div> : project.sections ? <div className="artwork-sections">{project.sections.map((group, index) => <section className="artwork-section campaign-section" key={group.title} aria-labelledby={`collection-section-${index}`}>
      <div className="artwork-section-heading"><span>{String(index + 1).padStart(2, "0")}</span><h3 id={`collection-section-${index}`}>{group.title}</h3><p>{group.images.length} {group.images.length === 1 ? "design" : "designs"}</p></div>
      <div className="project-images">{group.images.map(im => renderArtwork(im, group.title))}</div>
    </section>)}</div> : <div className="project-images">{project.images.map(im => renderArtwork(im))}</div>}
    {project.images.length===1&&<aside className="artwork-notes"><p className="portfolio-eyebrow">Inside the design</p><h3>One identity.<br/>Different expressions.</h3><p>{project.description}</p><div>{story.focus.map((focus,i)=><div className="artwork-note" key={focus}><span>0{i+1}</span><h4>{focus}</h4></div>)}</div><p className="artwork-view-tip">Select the artwork for a closer look. The viewer stays right here on the page.</p></aside>}
  </div><dialog ref={viewer} className="artwork-viewer" aria-label={`${project.title} artwork viewer`} onClose={()=>{setSelected(null);setZoom(false);}} onClick={e=>{if(e.target===e.currentTarget)close();}}>
    <div className="viewer-toolbar"><div><strong>{project.title}</strong><span>{selected===null?0:selected+1} / {project.images.length}</span></div><div><button type="button" onClick={()=>setZoom(z=>!z)} aria-label={zoom?"Fit artwork":"Enlarge artwork"}>{zoom?"Fit view":"Enlarge"}</button><button type="button" onClick={close} aria-label="Close artwork viewer"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round"/></svg></button></div></div>
    <div className={`viewer-stage ${zoom?"is-enlarged":""}`}>{image&&<img src={image.src} alt={`${project.title} artwork ${(selected??0)+1}`} width={image.width} height={image.height}/>}</div>
    {project.images.length>1&&<div className="viewer-navigation"><button type="button" onClick={()=>move(-1)} aria-label="Previous artwork"><Arrow direction="left"/>Previous</button><button type="button" onClick={()=>move(1)} aria-label="Next artwork">Next<Arrow direction="right"/></button></div>}
  </dialog></>;
}
