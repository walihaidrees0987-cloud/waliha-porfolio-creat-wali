import artwork from "./artwork.json";
import { portfolioMediaUrl } from "../../lib/portfolio-media";

const fromGroup = group => artwork.filter(item => item.group === group);
const named = (group, names) => names.map(name => {
  const item = fromGroup(group).find(image => image.name === name);
  if (!item) throw new Error(`Missing curated artwork: ${group}/${name}`);
  return item;
});
const section = (title, images) => ({ title, images });
const greenPosts = fromGroup("posters").filter(image => image.name.startsWith("coursel post-"));
const chessPosters = fromGroup("posters").filter(image => !image.name.startsWith("coursel post-") && !["cyberpunk", "poster", "rise of the legend", "ronaldo"].includes(image.name));
const bluePosts = named("social-media", ["445736251_768376412147142_2387087664596222001_n", "445805849_772487298402720_6719713094733848178_n", "447450271_775169864801130_5749085366782115006_n", "447741147_776501041334679_4364801354485719404_n", "448225610_780606800924103_6544870662485800534_n", "448226502_780599604258156_4307330182003416026_n"]);
const definitions = [
  {
    slug: "pure-leaf", title: "Brand Identity & Guidelines", category: "Branding", coverStyle: "boards",
    description: "Seven brand identities, from logo systems and colour palettes to guidelines and applications.",
    sections: [
      ...[["Pure Leaf", "pure-leaf"], ["Velouria", "velouria"], ["Nova Glow", "nova-glow"], ["Pustimate", "pustimate"], ["Babies Pal", "babies-pal"], ["Buraq", "buraq"], ["Breeze", "web-design"]].map(([title, group]) => section(title, fromGroup(group))),
    ],
    preview: [fromGroup("pure-leaf")[0], fromGroup("nova-glow")[0], ...named("velouria", ["Untitled-1-01.jpg"])],
  },
  {
    slug: "black-crown", title: "Black Crown — Tea, Told Creatively", category: "Social Media", clientLabel: "Featured client work", coverStyle: "posters",
    description: "Tea campaign creatives designed for Black Crown, a company I work with.", images: fromGroup("black-crown"),
    preview: named("black-crown", ["Artboard 1 copy 2", "Artboard 1 copy", "Artboard 1"]),
  },
  {
    slug: "posters", title: "Chess Posters", category: "Posters", coverStyle: "posters",
    description: "Chess tournament, event and promotional posters created for international clients.", images: chessPosters,
    preview: named("posters", ["RISING STAR GRAND PRIX", "rising star-01", "weekly"]),
  },
  {
    slug: "social-media", title: "Social Media Creatives", category: "Social Media", coverStyle: "posts",
    description: "Original social posts organised by brand and campaign, with matching designs presented together.",
    sections: [
      section("Waliha Graphics — Creative Series", greenPosts),
      section("Quick Bite — Food Campaign", named("social-media", ["5", "6", "7", "8", "9", "10"])),
      section("Quick Bite — Nuggets Offer", named("social-media", ["4"])),
      section("Big Bite — Blue Campaign", bluePosts),
      section("Pain Off — Product Campaign", named("social-media", ["product-01", "product-02", "product-03", "product-04", "product-06"])),
      section("Education — Open House & Baking", named("social-media", ["13", "2 - Copy"])),
      section("Food Workshop", named("social-media", ["14"])),
      section("King Food", named("social-media", ["1 - Copy"])),
      section("Pizza Campaign", named("social-media", ["11"])),
      section("Azadi Food Offer", named("social-media", ["12"])),
      section("Food Menu", named("social-media", ["15"])),
      section("Restaurant Opening", named("social-media", ["16"])),
      section("Eid Food Special", named("social-media", ["3 - Copy"])),
    ],
    preview: [...bluePosts.slice(0, 3), ...greenPosts.slice(0, 3)],
  },
  {
    slug: "product-creatives", title: "Product Creatives", category: "Product Design", mockup: "product-creatives",
    description: "Product-focused compositions featuring skincare, cosmetics and personal care.", images: fromGroup("product-creatives"),
  },
  {
    slug: "logo-design", title: "Logo Collection", category: "Logos", coverStyle: "sequence",
    description: "Bhola King, Bin Noor and more: individual logo designs and their original presentations.", images: fromGroup("logo-design"),
  },
  {
    slug: "banners", title: "Banner Collection", category: "Banners", coverStyle: "banners",
    description: "Campaign banners for events, education, retail and promotional communication.", images: fromGroup("banners"),
  },
  {
    slug: "thumbnails", title: "YouTube Thumbnails", category: "Thumbnails", coverStyle: "laptop", mockup: "thumbnails", coverAsset: "/images/thumbnail-laptop-v2.webp",
    description: "Thumbnail designs with bold type, expressive subjects and clear visual hierarchy.",
    images: fromGroup("thumbnails").filter(image => !["1010", "111", "222", "666", "777", "888", "999"].includes(image.name)),
    preview: named("thumbnails", ["333"]),
  },
];

const resolveImage = image => ({ ...image, src: portfolioMediaUrl(image.src), original: portfolioMediaUrl(image.src) });
export const PORTFOLIO = definitions.map(definition => {
  const sections = definition.sections?.map(group => ({ ...group, images: group.images.map(resolveImage) }));
  const images = sections ? sections.flatMap(group => group.images) : definition.images.map(resolveImage);
  const preview = definition.preview?.map(resolveImage) || images.slice(0, 3);
  return { ...definition, sections, images, preview, cover: definition.coverAsset || (definition.mockup ? portfolioMediaUrl(`/assets/mockups/${definition.mockup}.webp`) : preview[0].src), generatedMockup: Boolean(definition.mockup) };
});
export const ARTWORK_COUNT = new Set(PORTFOLIO.flatMap(project => project.images.map(image => image.src))).size;
