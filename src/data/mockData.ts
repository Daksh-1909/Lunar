import { Photo, Photographer, Collection } from "../types";

export const photographers: Photographer[] = [
  {
    id: "p1",
    name: "Aria Sterling",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    bio: "Astrophotographer and celestial tracker specializing in long-exposure lunar phases and solar eclipses. Over a decade capturing the silence of the night sky.",
    location: "Reykjavik, Iceland",
    instagram: "@aria_stellar",
    website: "ariasterling.com"
  },
  {
    id: "p2",
    name: "Marcus Vance",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Adventure photographer documenting Earth's most extreme landscapes and atmospheric phenomena, from supercell storms to active volcanoes at dusk.",
    location: "Colorado, USA",
    instagram: "@marcus_vance",
    website: "marcusvancephoto.com"
  },
  {
    id: "p3",
    name: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    bio: "Fine art nature photographer whose work explores the intricate relationships between light, shadow, and organic structures in ancient forests.",
    location: "Kyoto, Japan",
    instagram: "@elena_forests",
    website: "elenarostova.co.jp"
  },
  {
    id: "p4",
    name: "Devon Alistair",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    bio: "Deep-sky imager and visual astronomer focusing on nebulas, distant galaxies, and the majestic sweep of the Milky Way over high-altitude peaks.",
    location: "Atacama, Chile",
    instagram: "@devon_deepsky",
    website: "alistaircosmic.org"
  }
];

export const collections: Collection[] = [
  {
    id: "c1",
    slug: "blood-moon-chronicles",
    title: "Blood Moon Chronicles",
    description: "A dark, breathtaking study of total lunar eclipses captured from various continents, highlighting the deep crimson glow of the Earth's shadow.",
    coverImage: "https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?w=1200&auto=format&fit=crop&q=80",
    photoIds: [],
    tags: ["Moon", "Eclipse", "Night Sky", "Red"],
    createdAt: "2025-10-15",
    featured: true
  },
  {
    id: "c2",
    slug: "total-eclipse-2024",
    title: "Total Eclipse 2024",
    description: "The Great American Solar Eclipse in high detail, tracking the stunning corona flares, Baily's beads, and the eerie twilight of totality.",
    coverImage: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=1200&auto=format&fit=crop&q=80",
    photoIds: [],
    tags: ["Eclipse", "Solar", "Corona", "Rare"],
    createdAt: "2024-04-10",
    featured: true
  },
  {
    id: "c3",
    slug: "lunar-phases-complete-year",
    title: "Lunar Phases: A Complete Year",
    description: "A meticulous 12-month study documenting the waxing, waning, crescent, and gibbous phases of our moon in extreme resolution.",
    coverImage: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=1200&auto=format&fit=crop&q=80",
    photoIds: [],
    tags: ["Moon", "Phases", "Lunar Cycle", "Monochrome"],
    createdAt: "2025-12-20",
    featured: false
  },
  {
    id: "c4",
    slug: "midnight-forests",
    title: "Midnight Forests",
    description: "Ancient woodlands illuminated solely by moonlight, starlight, and the bioluminescent whispers of the nocturnal forest floor.",
    coverImage: "https://images.unsplash.com/photo-1511497584788-876760111969?w=1200&auto=format&fit=crop&q=80",
    photoIds: [],
    tags: ["Forests", "Nature", "Night", "Moody"],
    createdAt: "2025-08-05",
    featured: true
  },
  {
    id: "c5",
    slug: "ocean-meets-sky",
    title: "Ocean Meets Sky",
    description: "Minimalist seascapes where the horizon dissolves under starlit nights, dramatic twilight hours, and bioluminescent ocean waves.",
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80",
    photoIds: [],
    tags: ["Oceans", "Nature", "Horizon", "Reflections"],
    createdAt: "2025-11-01",
    featured: false
  },
  {
    id: "c6",
    slug: "aurora-borealis-iceland",
    title: "Aurora Borealis: Iceland",
    description: "The cosmic dance of the Northern Lights over cascading waterfalls, black sand beaches, and deep blue glacial lagoons.",
    coverImage: "https://images.unsplash.com/photo-1483168527879-c66136b56105?w=1200&auto=format&fit=crop&q=80",
    photoIds: [],
    tags: ["Auroras", "Iceland", "Glaciers", "Green"],
    createdAt: "2025-02-14",
    featured: true
  },
  {
    id: "c7",
    slug: "desert-moonrise",
    title: "Desert Moonrise",
    description: "The surreal landscape of the Atacama and Sahara deserts as the full moon rises over windswept dunes and silent rock monoliths.",
    coverImage: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=1200&auto=format&fit=crop&q=80",
    photoIds: [],
    tags: ["Moon", "Desert", "Dunes", "Warm"],
    createdAt: "2025-06-30",
    featured: false
  },
  {
    id: "c8",
    slug: "thunderstorm-gallery",
    title: "Thunderstorm Gallery",
    description: "Stunning displays of atmospheric power, showcasing branching lightning strikes, ominous shelf clouds, and electric storms worldwide.",
    coverImage: "https://images.unsplash.com/photo-1492011221367-f47e3ccd77a0?w=1200&auto=format&fit=crop&q=80",
    photoIds: [],
    tags: ["Storms", "Lightning", "Atmosphere", "Power"],
    createdAt: "2025-07-22",
    featured: false
  },
  {
    id: "c9",
    slug: "mountain-silhouettes",
    title: "Mountain Silhouettes",
    description: "High altitude peaks towering above the clouds, backlit by the setting sun, rising moons, and remote, star-studded horizons.",
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&auto=format&fit=crop&q=80",
    photoIds: [],
    tags: ["Mountains", "Nature", "Silhouettes", "Peaks"],
    createdAt: "2025-09-18",
    featured: false
  }
];

// Helper to generate photo structures
const categoriesMap = {
  moon: { keyword: "moon", tags: ["Lunar", "Moon", "Sky", "Cosmos"] },
  eclipse: { keyword: "solar-eclipse", tags: ["Eclipse", "Solar", "Corona", "Alignment"] },
  nature: { keyword: "nature", tags: ["Earth", "Landscape", "Wilderness", "Scenic"] },
  "night-sky": { keyword: "milky-way", tags: ["Stars", "Milky Way", "Galaxy", "Universe"] },
  "sunrise-sunset": { keyword: "sunset", tags: ["Twilight", "Golden Hour", "Dusk", "Colors"] },
  storms: { keyword: "lightning", tags: ["Storm", "Electricity", "Thunder", "Atmosphere"] },
  forests: { keyword: "forest-night", tags: ["Trees", "Wildwood", "Nature", "Foggy"] },
  oceans: { keyword: "ocean-night", tags: ["Sea", "Waves", "Seascape", "Horizon"] },
  mountains: { keyword: "mountain-night", tags: ["Summit", "Peaks", "Highlands", "Elevation"] },
  auroras: { keyword: "aurora", tags: ["Northern Lights", "Aurora", "Green", "Cosmic"] }
};

// Generates 60 unique mock photos
export const photos: Photo[] = Array.from({ length: 60 }).map((_, idx) => {
  const categoriesList = Object.keys(categoriesMap) as Array<keyof typeof categoriesMap>;
  const category = categoriesList[idx % categoriesList.length];
  const config = categoriesMap[category];
  const photographer = photographers[idx % photographers.length];
  const collectionIndex = idx % collections.length;
  const collection = collections[collectionIndex];
  
  // Custom camera parameters
  const isoValues = [100, 200, 400, 800, 1600, 3200, 6400];
  const apertureValues = ["f/1.4", "f/1.8", "f/2.8", "f/4.0", "f/5.6", "f/8.0"];
  const shutterSpeedValues = ["1/8000s", "1/2000s", "1/500s", "1/30s", "2s", "15s", "30s"];
  const focalLengthValues = ["14mm", "24mm", "35mm", "50mm", "85mm", "200mm", "600mm"];
  
  const cameraSettings = {
    camera: idx % 2 === 0 ? "Sony Alpha 7R V" : "Nikon Z9",
    lens: idx % 2 === 0 ? "FE 24-70mm f/2.8 GM II" : "NIKKOR Z 70-200mm f/2.8 VR S",
    iso: isoValues[idx % isoValues.length],
    aperture: apertureValues[idx % apertureValues.length],
    shutterSpeed: shutterSpeedValues[idx % shutterSpeedValues.length],
    focalLength: focalLengthValues[idx % focalLengthValues.length]
  };

  const id = `photo-${idx + 1}`;
  
  // Update collection mapping
  collection.photoIds.push(id);

  // Unsplash URLs with seed for determinism
  const src = `https://images.unsplash.com/photo-${1500000000000 + (idx * 147530)}?w=1600&auto=format&fit=crop&q=85&sig=${idx}`;
  const thumbnailSrc = `https://images.unsplash.com/photo-${1500000000000 + (idx * 147530)}?w=600&auto=format&fit=crop&q=75&sig=${idx}`;

  const locations = [
    "Mauna Kea, Hawaii",
    "Atacama Desert, Chile",
    "Jokulsarlon, Iceland",
    "Lofoten Islands, Norway",
    "Yosemite Valley, USA",
    "Mount Fuji, Japan",
    "Banff National Park, Canada",
    "Dolomites, Italy",
    "Sahara Desert, Morocco",
    "Himalayas, Nepal"
  ];

  // Capitalize category names for nice display
  const titleCategory = category.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const titles = [
    `Mystic ${titleCategory}`,
    `Whispering ${titleCategory}`,
    `Eternal ${titleCategory}`,
    `Infinite ${titleCategory}`,
    `Symphony of ${titleCategory}`,
    `Guardians of ${titleCategory}`
  ];

  const title = `${titles[idx % titles.length]} II`;
  const description = `An ethereal, high-fidelity capture of ${category.replace("-", " ")} displaying the intricate textures and magnificent color balance only seen in the untamed outdoors. Captured during prime atmospheric clarity.`;

  return {
    id,
    title,
    description,
    src,
    thumbnailSrc,
    category,
    tags: [...config.tags, collection.tags[0], photographer.name.split(" ")[0]],
    photographer,
    location: locations[idx % locations.length],
    dateTaken: `2025-0${(idx % 9) + 1}-1${idx % 9}`,
    likes: 120 + (idx * 27) - (idx * idx * 2),
    views: 1240 + (idx * 143),
    width: idx % 3 === 0 ? 1920 : idx % 3 === 1 ? 1440 : 1080,
    height: idx % 3 === 0 ? 1280 : idx % 3 === 1 ? 1920 : 1080,
    cameraSettings,
    collectionIds: [collection.id]
  };
});

// Update the photoIds collections one final time
photos.forEach(photo => {
  const collection = collections.find(c => c.id === photo.collectionIds[0]);
  if (collection && !collection.photoIds.includes(photo.id)) {
    collection.photoIds.push(photo.id);
  }
});
