export default function CollectionCover({ project, activeIndex = 0 }) {
  if (project.coverStyle === "laptop") {
    return <img src={project.cover} alt="YouTube thumbnail displayed on a laptop" loading="lazy" width={1536} height={1024}/>;
  }
  if (project.coverStyle === "sequence") {
    const images = project.images.slice(activeIndex, activeIndex + 4);
    return <div className="collection-sequence"><div className="logo-preview-grid">{images.map(image => <div className="logo-preview-tile" key={image.src}><img src={image.src} alt={image.name} loading="lazy" width={image.width} height={image.height}/></div>)}</div><span className="sequence-count">{activeIndex + 1}–{activeIndex + images.length} / {project.images.length}</span></div>;
  }
  if (project.coverStyle === "posts") {
    return <div className="collection-preview collection-preview-posts">{project.preview.map(image => <img key={image.src} src={image.src} alt={`Social campaign: ${image.name}`} loading="lazy" width={image.width} height={image.height}/>)}</div>;
  }
  if (["boards", "posters"].includes(project.coverStyle)) {
    const proportions = project.preview.map(image => image.width / image.height);
    return <div className={`collection-preview collection-preview-${project.coverStyle}`} style={{ aspectRatio: proportions.reduce((sum, ratio) => sum + ratio, 0), gridTemplateColumns: proportions.map(ratio => `${ratio}fr`).join(" ") }}>{project.preview.map(image => <img key={image.src} src={image.src} alt={`${project.title}: ${image.name}`} loading="lazy" width={image.width} height={image.height}/>)}</div>;
  }
  if (project.coverStyle === "banners") {
    return <div className="collection-banner-preview">{project.preview.map(image => <img key={image.src} src={image.src} alt={`Original banner: ${image.name}`} loading="lazy" width={image.width} height={image.height}/>)}</div>;
  }
  return <img src={project.cover} alt={`${project.title} design presentation`} loading="lazy" width={1200} height={900}/>;
}
