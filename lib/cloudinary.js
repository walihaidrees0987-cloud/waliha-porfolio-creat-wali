// lib/cloudinary.js
// Cloudinary configuration, dynamic URL generator, and portfolio media mapping

export const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "sergteqh";

/**
 * Builds an optimized Cloudinary delivery URL
 */
export function getCloudinaryUrl(
  publicId,
  { resourceType = "image", transform = "f_webp,q_auto", format = "webp" } = {}
) {
  const cloud = CLOUDINARY_CLOUD_NAME;
  const t = transform ? `${transform}/` : "";
  const ext = format ? `.${format}` : "";
  return `https://res.cloudinary.com/${cloud}/${resourceType}/upload/${t}${publicId}${ext}`;
}

/**
 * Generates an instant, highly optimized WebP poster thumbnail for videos (first frame at 0.5s)
 */
export function getVideoPosterUrl(
  publicId,
  { time = 0.5, transform = "w_800,c_limit,f_webp,q_auto", format = "webp" } = {}
) {
  const cloud = CLOUDINARY_CLOUD_NAME;
  const t = `so_${time},${transform}`;
  return `https://res.cloudinary.com/${cloud}/video/upload/${t}/${publicId}.${format}`;
}

// Pre-configured URLs for all uploaded portfolio assets in lightweight WebP format (100-200KB)
export const CLOUDINARY_ASSETS = {
  // Hero Section Video & Instant WebP Poster
  heroVideo: getCloudinaryUrl("waliha-portfolio/hero/hero_video", {
    resourceType: "video",
    transform: "f_auto,q_auto",
    format: "mp4",
  }),
  heroVideoPoster: getVideoPosterUrl("waliha-portfolio/hero/hero_video", { time: 0 }),

  // Profile & Character Avatars (~130KB WebP)
  walihaAvatar: getCloudinaryUrl("waliha-portfolio/profile/waliha_avatar", {
    transform: "w_800,c_limit,f_webp,q_auto",
    format: "webp",
  }),
  spider: getCloudinaryUrl("waliha-portfolio/elements/spider", {
    transform: "f_webp,q_auto",
    format: "webp",
  }),

  // Software & Tool Icons (crisp & tiny 4-15KB WebP)
  icons: {
    pr: getCloudinaryUrl("waliha-portfolio/icons/icon_premiere_pro", { format: "webp" }),
    ae: getCloudinaryUrl("waliha-portfolio/icons/icon_after_effects", { format: "webp" }),
    ps: getCloudinaryUrl("waliha-portfolio/icons/icon_photoshop", { format: "webp" }),
    ai: getCloudinaryUrl("waliha-portfolio/icons/icon_illustrator", { format: "webp" }),
    davinci: getCloudinaryUrl("waliha-portfolio/icons/icon_davinci_resolve", { format: "webp" }),
    figma: getCloudinaryUrl("waliha-portfolio/icons/icon_figma", { format: "webp" }),
  },

  // Section Artworks & Illustrations (Optimized to ~100-200KB WebP)
  artworks: {
    creative1: getCloudinaryUrl("waliha-portfolio/artworks/artwork_creative_1", {
      transform: "w_900,c_limit,f_webp,q_auto",
      format: "webp",
    }),
    aboutDetailsVisual: getCloudinaryUrl("waliha-portfolio/artworks/about_details_visual", {
      transform: "w_900,c_limit,f_webp,q_auto",
      format: "webp",
    }),
    motionCharacter: getCloudinaryUrl("waliha-portfolio/artworks/motion_character", {
      transform: "w_900,c_limit,f_webp,q_auto",
      format: "webp",
    }),
    productDesignArtwork: "https://res.cloudinary.com/sergteqh/image/upload/v1793098444/waliha-portfolio/artworks/tea-jar-doodh-patti-2768812e96.png",
  },

  // Background Textures
  textures: {
    brush: getCloudinaryUrl("waliha-portfolio/textures/brush_texture", {
      transform: "f_webp,q_auto",
      format: "webp",
    }),
    pencil: getCloudinaryUrl("waliha-portfolio/textures/pencil_texture", {
      transform: "f_webp,q_auto",
      format: "webp",
    }),
  },
};

// All 21 Portfolio showcase videos and product gallery images hosted on Cloudinary
export const PORTFOLIO_VIDEOS = {
  editing: [
    {
      id: "editing_01",
      src: getCloudinaryUrl("waliha-portfolio/videos/editing/editing_01", { resourceType: "video", transform: "f_auto,q_auto", format: "mp4" }),
      poster: getVideoPosterUrl("waliha-portfolio/videos/editing/editing_01"),
      label: "AI video editing project",
      className: "portrait-video",
    },
    {
      id: "editing_02",
      src: getCloudinaryUrl("waliha-portfolio/videos/editing/editing_02", { resourceType: "video", transform: "f_auto,q_auto", format: "mp4" }),
      poster: getVideoPosterUrl("waliha-portfolio/videos/editing/editing_02"),
      label: "AI cinematic video project",
      className: "portrait-video",
    },
    {
      id: "editing_03",
      src: getCloudinaryUrl("waliha-portfolio/videos/editing/editing_03", { resourceType: "video", transform: "f_auto,q_auto", format: "mp4" }),
      poster: getVideoPosterUrl("waliha-portfolio/videos/editing/editing_03"),
      label: "Motion design video project",
      className: "landscape-video",
    },
    {
      id: "editing_04",
      src: getCloudinaryUrl("waliha-portfolio/videos/editing/editing_04", { resourceType: "video", transform: "f_auto,q_auto", format: "mp4" }),
      poster: getVideoPosterUrl("waliha-portfolio/videos/editing/editing_04"),
      label: "Cinematic editing project",
      className: "landscape-video",
    },
    {
      id: "editing_05",
      src: getCloudinaryUrl("waliha-portfolio/videos/editing/editing_05", { resourceType: "video", transform: "f_auto,q_auto", format: "mp4" }),
      poster: getVideoPosterUrl("waliha-portfolio/videos/editing/editing_05"),
      label: "Social media video project",
      className: "portrait-video",
    },
    {
      id: "editing_06",
      src: getCloudinaryUrl("waliha-portfolio/videos/editing/editing_06", { resourceType: "video", transform: "f_auto,q_auto", format: "mp4" }),
      poster: getVideoPosterUrl("waliha-portfolio/videos/editing/editing_06"),
      label: "Promotional video project",
      className: "portrait-video",
    },
    {
      id: "editing_07",
      src: getCloudinaryUrl("waliha-portfolio/videos/editing/editing_07", { resourceType: "video", transform: "f_auto,q_auto", format: "mp4" }),
      poster: getVideoPosterUrl("waliha-portfolio/videos/editing/editing_07"),
      label: "Creative editing project",
      className: "portrait-video",
    },
  ],
  motion: [
    {
      id: "motion_01",
      src: "https://res.cloudinary.com/sergteqh/video/upload/v1793098436/waliha-portfolio/videos/motion/vlog-cinematic-a7ca544caf.mp4",
      label: "Vlog cinematic edit",
      controls: true,
      cardClass: "motion-video-portrait",
    },
    {
      id: "motion_02",
      src: "https://res.cloudinary.com/sergteqh/video/upload/v1793098437/waliha-portfolio/videos/motion/bmw-car-edit-0aca844db6.mp4",
      label: "BMW car edit",
      controls: true,
      cardClass: "motion-video-portrait",
    },
    {
      id: "motion_03",
      src: "https://res.cloudinary.com/sergteqh/video/upload/v1793098450/waliha-portfolio/videos/motion/bmw-car-edit-2-a56cb65518.mp4",
      label: "Second BMW car edit",
      controls: true,
      cardClass: "motion-video-poster",
    },
    {
      id: "motion_04",
      src: "https://res.cloudinary.com/sergteqh/video/upload/v1793098453/waliha-portfolio/videos/motion/waliha-travel-edit-f13f983d20.mp4",
      label: "Waliha travel edit",
      controls: true,
      cardClass: "motion-video-wide",
    },
    {
      id: "motion_05",
      src: "https://res.cloudinary.com/sergteqh/video/upload/v1793098521/waliha-portfolio/videos/motion/waliha-intro-7423fcfb09.mp4",
      label: "Waliha introduction — motion graphics",
      controls: true,
      cardClass: "motion-video-wide",
    },
    {
      id: "motion_06",
      src: "https://res.cloudinary.com/sergteqh/video/upload/v1793098462/waliha-portfolio/videos/motion/gang-video-2-8cfa1dbca3.mp4",
      label: "Gang video — motion graphics",
      controls: true,
      cardClass: "motion-video-wide",
    },
  ],
  social: [
    {
      id: "social_01",
      src: getCloudinaryUrl("waliha-portfolio/videos/social/social_01", { resourceType: "video", transform: "f_auto,q_auto", format: "mp4" }),
      poster: getVideoPosterUrl("waliha-portfolio/videos/social/social_01"),
      label: "Social media creative one",
    },
    {
      id: "social_02",
      src: getCloudinaryUrl("waliha-portfolio/videos/social/social_02", { resourceType: "video", transform: "f_auto,q_auto", format: "mp4" }),
      poster: getVideoPosterUrl("waliha-portfolio/videos/social/social_02"),
      label: "Social media creative two",
    },
    {
      id: "social_03",
      src: getCloudinaryUrl("waliha-portfolio/videos/social/social_03", { resourceType: "video", transform: "f_auto,q_auto", format: "mp4" }),
      poster: getVideoPosterUrl("waliha-portfolio/videos/social/social_03"),
      label: "Social media creative three",
    },
    {
      id: "social_04",
      src: getCloudinaryUrl("waliha-portfolio/videos/social/social_04", { resourceType: "video", transform: "f_auto,q_auto", format: "mp4" }),
      poster: getVideoPosterUrl("waliha-portfolio/videos/social/social_04"),
      label: "Social media creative four",
    },
    {
      id: "social_05",
      src: getCloudinaryUrl("waliha-portfolio/videos/social/social_05", { resourceType: "video", transform: "f_auto,q_auto", format: "mp4" }),
      poster: getVideoPosterUrl("waliha-portfolio/videos/social/social_05"),
      label: "Social media creative five",
    },
    {
      id: "social_06",
      src: getCloudinaryUrl("waliha-portfolio/videos/social/social_06", { resourceType: "video", transform: "f_auto,q_auto", format: "mp4" }),
      poster: getVideoPosterUrl("waliha-portfolio/videos/social/social_06"),
      label: "Social media creative six",
    },
    {
      id: "social_07",
      src: getCloudinaryUrl("waliha-portfolio/videos/social/social_07", { resourceType: "video", transform: "f_auto,q_auto", format: "mp4" }),
      poster: getVideoPosterUrl("waliha-portfolio/videos/social/social_07"),
      label: "Social media creative seven",
    },
    {
      id: "social_08",
      src: getCloudinaryUrl("waliha-portfolio/videos/social/social_08", { resourceType: "video", transform: "f_auto,q_auto", format: "mp4" }),
      poster: getVideoPosterUrl("waliha-portfolio/videos/social/social_08"),
      label: "Social media creative eight",
    },
  ],
  products: [
    {
      id: "product_01",
      src: "https://res.cloudinary.com/sergteqh/image/upload/v1793098462/waliha-portfolio/products/jar-big-dfa7019803.png",
      alt: "Big Black Crown tea jar packaging",
    },
    {
      id: "product_02",
      src: "https://res.cloudinary.com/sergteqh/image/upload/v1793098466/waliha-portfolio/products/jar-medium-fb760e84bf.png",
      alt: "Medium Black Crown tea jar packaging",
    },
    {
      id: "product_03",
      src: "https://res.cloudinary.com/sergteqh/image/upload/v1793098465/waliha-portfolio/products/jar-small-d6654f2afd.png",
      alt: "Small Black Crown tea jar packaging",
    },
  ],
};
