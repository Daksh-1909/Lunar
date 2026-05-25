import { Photo, Photographer, Collection } from "../types";

export const photographers: Photographer[] = [
  {
    id: "p1",
    name: "Daksh Patel",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80",
    bio: "Astrophotographer and celestial tracker specializing in long-exposure lunar phases and solar eclipses. Over a decade capturing the silence of the night sky.",
    location: "Vadodara, Gujarat",
    instagram: "@daksh_patel199",
    website: "dakshpatel.pages.dev"
  },
  {
    id: "p2",
    name: "Daksh Patel",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    bio: "Adventure photographer documenting Earth's most extreme landscapes and atmospheric phenomena, from supercell storms to active volcanoes at dusk.",
    location: "Vadodara, Gujarat",
    instagram: "@daksh_patel199",
    website: "dakshpatel.pages.dev"
  },
  {
    id: "p3",
    name: "Daksh Patel",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&auto=format&fit=crop&q=80",
    bio: "Fine art nature photographer whose work explores the intricate relationships between light, shadow, and organic structures in ancient forests.",
    location: "Vadodara, Gujarat",
    instagram: "@daksh_patel199",
    website: "dakshpatel.pages.dev"
  },
  {
    id: "p4",
    name: "Daksh Patel",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    bio: "Deep-sky imager and visual astronomer focusing on nebulas, distant galaxies, and the majestic sweep of the Milky Way over high-altitude peaks.",
    location: "Vadodara, Gujarat",
    instagram: "@daksh_patel199",
    website: "dakshpatel.pages.dev"
  }
];

export const collections: Collection[] = [
  {
    id: "c1",
    slug: "blood-moon-chronicles",
    title: "Blood Moon Chronicles",
    description: "A dark, breathtaking study of total lunar eclipses captured from various continents, highlighting the deep crimson glow of the Earth's shadow.",
    coverImage: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725300/A_breathtaking_close-up_astrophotography_image_202605252118_gpadv7.jpg",
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
    coverImage: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725205/A_spectacular_total_solar_eclipse_202605252120_g2too0.jpg",
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
    coverImage: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725242/An_ultra_detailed_monochrome_full_202605252121_pzwamn.jpg",
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
    coverImage: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725216/Ancient_pine_forest_illuminated_by_202605252122_qkglba.jpg",
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
    coverImage: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725264/A_classic_lighthouse_on_rocky_202605252123_alnrgm.jpg",
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
    coverImage: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725187/A_vibrant_green_and_purple_202605252124_ns32of.jpg",
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
    coverImage: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725196/A_giant_orange_full_moon_202605252125_fvlmmq.jpg",
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
    coverImage: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725296/A_giant_tornado_vortex_under_202605252126_vlwkka.jpg",
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
    coverImage: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725262/A_glass-like_alpine_lake_reflecting_202605252125_erwgsg.jpg",
    photoIds: [],
    tags: ["Mountains", "Nature", "Silhouettes", "Peaks"],
    createdAt: "2025-09-18",
    featured: false
  }
];

export const photos: Photo[] = [
  // Collection 1: Blood Moon Chronicles (c1)
  {
    id: "photo-red-moon-1",
    title: "Ethereal Eclipse Alignment",
    description: "A breathtaking close-up astrophotography image detailing the Earth's shadow sliding across the craters of the moon during eclipse totality.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725300/A_breathtaking_close-up_astrophotography_image_202605252118_gpadv7.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725300/A_breathtaking_close-up_astrophotography_image_202605252118_gpadv7.jpg",
    category: "moon",
    tags: ["Lunar", "Moon", "Eclipse", "Astrophotography", "p1"],
    photographer: photographers[0],
    location: "Vadodara, Gujarat",
    dateTaken: "2025-10-15",
    likes: 342,
    views: 2450,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Sony Alpha 7R V",
      lens: "FE 600mm f/4 GM OSS",
      iso: 400,
      aperture: "f/4.0",
      shutterSpeed: "2s",
      focalLength: "600mm"
    },
    collectionIds: ["c1"]
  },
  {
    id: "photo-red-moon-2",
    title: "Blood Moon Rising",
    description: "A giant crimson blood moon captured suspended in the dark sky directly above silhouetted pine tree branches.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725292/A_giant_crimson_blood_moon_202605252118_ghzgfw.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725292/A_giant_crimson_blood_moon_202605252118_ghzgfw.jpg",
    category: "moon",
    tags: ["Lunar", "Moon", "Eclipse", "Red", "p1"],
    photographer: photographers[0],
    location: "Vadodara, Gujarat",
    dateTaken: "2025-10-15",
    likes: 512,
    views: 4120,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Sony Alpha 7R V",
      lens: "FE 200-600mm f/5.6-6.3 G OSS",
      iso: 800,
      aperture: "f/6.3",
      shutterSpeed: "1.5s",
      focalLength: "400mm"
    },
    collectionIds: ["c1"]
  },
  {
    id: "photo-red-moon-3",
    title: "Crimson Totality",
    description: "A massive, detailed red blood moon resting inside a pitch-black cosmic space, showcasing high contrast lunar features.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725297/A_massive_red_blood_moon_202605252118_nmfvce.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725297/A_massive_red_blood_moon_202605252118_nmfvce.jpg",
    category: "moon",
    tags: ["Lunar", "Moon", "Eclipse", "Crimson", "p1"],
    photographer: photographers[0],
    location: "Vadodara, Gujarat",
    dateTaken: "2025-10-15",
    likes: 489,
    views: 3820,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Sony Alpha 7R V",
      lens: "Celestron EdgeHD 11\"",
      iso: 1600,
      aperture: "f/10.0",
      shutterSpeed: "4s",
      focalLength: "2800mm"
    },
    collectionIds: ["c1"]
  },

  // Collection 2: Total Eclipse 2024 (c2)
  {
    id: "photo-eclipse-1",
    title: "Corona of Totality",
    description: "A spectacular total solar eclipse displaying the brilliant, glowing white corona flares looping around the dark moon disk.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725205/A_spectacular_total_solar_eclipse_202605252120_g2too0.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725205/A_spectacular_total_solar_eclipse_202605252120_g2too0.jpg",
    category: "eclipse",
    tags: ["Eclipse", "Solar", "Corona", "Alignment", "p2"],
    photographer: photographers[1],
    location: "Vadodara, Gujarat",
    dateTaken: "2024-04-10",
    likes: 678,
    views: 5290,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Nikon Z9",
      lens: "NIKKOR Z 400mm f/4.5 VR S",
      iso: 100,
      aperture: "f/4.5",
      shutterSpeed: "1/250s",
      focalLength: "400mm"
    },
    collectionIds: ["c2"]
  },
  {
    id: "photo-eclipse-2",
    title: "Diamond Ring Flare",
    description: "The diamond ring effect captured during totality, showcasing a singular brilliant flash of white sun rays on the moon's rim.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725208/The_diamond_ring_effect_during_202605252120_dxpfdi.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725208/The_diamond_ring_effect_during_202605252120_dxpfdi.jpg",
    category: "eclipse",
    tags: ["Eclipse", "Solar", "Diamond Ring", "Flares", "p2"],
    photographer: photographers[1],
    location: "Vadodara, Gujarat",
    dateTaken: "2024-04-10",
    likes: 720,
    views: 6110,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Nikon Z9",
      lens: "NIKKOR Z 800mm f/6.3 VR S",
      iso: 200,
      aperture: "f/6.3",
      shutterSpeed: "1/4000s",
      focalLength: "800mm"
    },
    collectionIds: ["c2"]
  },

  // Collection 3: Lunar Phases: A Complete Year (c3)
  {
    id: "photo-full-moon-1",
    title: "Monochrome Moon Details",
    description: "An ultra-detailed monochrome full moon, displaying sharp impact craters, Tycho rays, and realistic lunar mountain textures.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725242/An_ultra_detailed_monochrome_full_202605252121_pzwamn.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725242/An_ultra_detailed_monochrome_full_202605252121_pzwamn.jpg",
    category: "moon",
    tags: ["Lunar", "Moon", "Monochrome", "High-Resolution", "p1"],
    photographer: photographers[0],
    location: "Vadodara, Gujarat",
    dateTaken: "2025-12-20",
    likes: 412,
    views: 3100,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Sony Alpha 7R V",
      lens: "FE 600mm f/4 GM OSS",
      iso: 100,
      aperture: "f/8.0",
      shutterSpeed: "1/125s",
      focalLength: "600mm"
    },
    collectionIds: ["c3"]
  },
  {
    id: "photo-full-moon-2",
    title: "Supermoon Over Summit",
    description: "A giant, glowing luminous supermoon rising grandly behind a dark, sharp mountain summit silhouette in the freezing cold night.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725240/A_giant_luminous_supermoon_rising_202605252121_f2rzkb.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725240/A_giant_luminous_supermoon_rising_202605252121_f2rzkb.jpg",
    category: "moon",
    tags: ["Lunar", "Moon", "Supermoon", "Summit", "p1"],
    photographer: photographers[0],
    location: "Vadodara, Gujarat",
    dateTaken: "2025-12-20",
    likes: 560,
    views: 4500,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Sony Alpha 7R V",
      lens: "FE 200-600mm f/5.6-6.3 G OSS",
      iso: 400,
      aperture: "f/6.3",
      shutterSpeed: "1/30s",
      focalLength: "600mm"
    },
    collectionIds: ["c3"]
  },
  {
    id: "photo-full-moon-3",
    title: "Silver Crescent Hanging",
    description: "A gorgeous glowing silver crescent moon hanging low in the dark indigo twilight sky with warm ambient gradients.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725235/A_glowing_silver_crescent_moon_202605252121_l9mabr.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725235/A_glowing_silver_crescent_moon_202605252121_l9mabr.jpg",
    category: "moon",
    tags: ["Lunar", "Moon", "Crescent", "Twilight", "p1"],
    photographer: photographers[0],
    location: "Vadodara, Gujarat",
    dateTaken: "2025-12-20",
    likes: 389,
    views: 2900,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Sony Alpha 7R V",
      lens: "FE 85mm f/1.4 GM",
      iso: 200,
      aperture: "f/1.8",
      shutterSpeed: "1/4s",
      focalLength: "85mm"
    },
    collectionIds: ["c3"]
  },

  // Collection 4: Midnight Forests (c4)
  {
    id: "photo-forest-1",
    title: "Ancient Canopy Glow",
    description: "An ancient pine forest illuminated softly by moonlight filtering through high, foggy branches, creating an ethereal green atmosphere.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725216/Ancient_pine_forest_illuminated_by_202605252122_qkglba.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725216/Ancient_pine_forest_illuminated_by_202605252122_qkglba.jpg",
    category: "forests",
    tags: ["Forests", "Nature", "Moonlight", "Ethereal", "p3"],
    photographer: photographers[2],
    location: "Vadodara, Gujarat",
    dateTaken: "2025-08-05",
    likes: 298,
    views: 1890,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Nikon Z9",
      lens: "NIKKOR Z 24-70mm f/2.8 S",
      iso: 3200,
      aperture: "f/2.8",
      shutterSpeed: "15s",
      focalLength: "28mm"
    },
    collectionIds: ["c4"]
  },
  {
    id: "photo-forest-2",
    title: "Redwood Twilight",
    description: "Tall redwood trees looking straight up into the starry sky canopy as soft moonlight washes down through the misty branches.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725223/Tall_redwood_trees_under_a_202605252122_odqsb3.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725223/Tall_redwood_trees_under_a_202605252122_odqsb3.jpg",
    category: "forests",
    tags: ["Forests", "Nature", "Redwoods", "Stars", "p3"],
    photographer: photographers[2],
    location: "Vadodara, Gujarat",
    dateTaken: "2025-08-05",
    likes: 315,
    views: 2010,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Nikon Z9",
      lens: "NIKKOR Z 14-24mm f/2.8 S",
      iso: 6400,
      aperture: "f/2.8",
      shutterSpeed: "20s",
      focalLength: "14mm"
    },
    collectionIds: ["c4"]
  },

  // Collection 5: Ocean Meets Sky (c5)
  {
    id: "photo-ocean-1",
    title: "Sentinel of Starry Horizon",
    description: "A classic lighthouse on a rocky cliff under full starlight, throwing its intense beam of light across the starry night horizon.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725264/A_classic_lighthouse_on_rocky_202605252123_alnrgm.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725264/A_classic_lighthouse_on_rocky_202605252123_alnrgm.jpg",
    category: "oceans",
    tags: ["Oceans", "Lighthouse", "Stars", "Reflections", "p3"],
    photographer: photographers[2],
    location: "Vadodara, Gujarat",
    dateTaken: "2025-11-01",
    likes: 387,
    views: 2780,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Sony Alpha 7R V",
      lens: "FE 24mm f/1.4 GM",
      iso: 1600,
      aperture: "f/1.4",
      shutterSpeed: "8s",
      focalLength: "24mm"
    },
    collectionIds: ["c5"]
  },
  {
    id: "photo-ocean-2",
    title: "Bioluminescent Wavebreaks",
    description: "Glowing blue bioluminescent ocean waves crashing softly on dark sand beaches under a sparkling starry night sky.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725266/Glowing_blue_bioluminescent_ocean_waves_202605252123_vdzehp.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725266/Glowing_blue_bioluminescent_ocean_waves_202605252123_vdzehp.jpg",
    category: "oceans",
    tags: ["Oceans", "Bioluminescence", "Waves", "Night", "p3"],
    photographer: photographers[2],
    location: "Vadodara, Gujarat",
    dateTaken: "2025-11-01",
    likes: 495,
    views: 3900,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Sony Alpha 7R V",
      lens: "FE 16-35mm f/2.8 GM II",
      iso: 3200,
      aperture: "f/2.8",
      shutterSpeed: "10s",
      focalLength: "16mm"
    },
    collectionIds: ["c5"]
  },

  // Collection 6: Aurora Borealis: Iceland (c6)
  {
    id: "photo-aurora-1",
    title: "Vibrant Auroral Arc",
    description: "A gorgeous green and purple aurora borealis displaying glowing curtains dancing over cascades and Icelandic geological formations.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725187/A_vibrant_green_and_purple_202605252124_ns32of.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725187/A_vibrant_green_and_purple_202605252124_ns32of.jpg",
    category: "auroras",
    tags: ["Auroras", "Iceland", "Green", "Northern Lights", "p1"],
    photographer: photographers[0],
    location: "Vadodara, Gujarat",
    dateTaken: "2025-02-14",
    likes: 620,
    views: 4890,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Sony Alpha 7R V",
      lens: "FE 14mm f/1.8 GM",
      iso: 1600,
      aperture: "f/1.8",
      shutterSpeed: "4s",
      focalLength: "14mm"
    },
    collectionIds: ["c6"]
  },
  {
    id: "photo-aurora-2",
    title: "Celestial Northern Lights",
    description: "Massive green northern lights arching directly over snowy mountains and glowing glacial caves in remote Iceland landscapes.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725184/Massive_northern_lights_over_snowy_202605252124_uc1pi9.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725184/Massive_northern_lights_over_snowy_202605252124_uc1pi9.jpg",
    category: "auroras",
    tags: ["Auroras", "Iceland", "Glaciers", "Cosmic", "p1"],
    photographer: photographers[0],
    location: "Vadodara, Gujarat",
    dateTaken: "2025-02-14",
    likes: 580,
    views: 4400,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Sony Alpha 7R V",
      lens: "FE 24mm f/1.4 GM",
      iso: 3200,
      aperture: "f/1.6",
      shutterSpeed: "3s",
      focalLength: "24mm"
    },
    collectionIds: ["c6"]
  },

  // Collection 7: Desert Moonrise (c7)
  {
    id: "photo-desert-1",
    title: "Atacama Desert Moonrise",
    description: "A giant warm orange full moon rising low on the horizon over clean rippled sand dunes in the absolute silent desert.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725196/A_giant_orange_full_moon_202605252125_fvlmmq.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725196/A_giant_orange_full_moon_202605252125_fvlmmq.jpg",
    category: "night-sky",
    tags: ["Moon", "Desert", "Dunes", "Warm", "p4"],
    photographer: photographers[3],
    location: "Vadodara, Gujarat",
    dateTaken: "2025-06-30",
    likes: 390,
    views: 2890,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Sony Alpha 7R V",
      lens: "FE 70-200mm f/2.8 GM II",
      iso: 200,
      aperture: "f/5.6",
      shutterSpeed: "1/15s",
      focalLength: "200mm"
    },
    collectionIds: ["c7"]
  },
  {
    id: "photo-desert-2",
    title: "Galaxy Over Sentinel Tent",
    description: "A small explorer tent glowing orange under the sparkling sweep of the Milky Way core in the Atacama sand wastes.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725206/A_glowing_explorer_tent_under_202605252125_dowsga.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725206/A_glowing_explorer_tent_under_202605252125_dowsga.jpg",
    category: "night-sky",
    tags: ["Stars", "Milky Way", "Tent", "Desert", "p4"],
    photographer: photographers[3],
    location: "Vadodara, Gujarat",
    dateTaken: "2025-06-30",
    likes: 454,
    views: 3200,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Sony Alpha 7R V",
      lens: "FE 16-35mm f/2.8 GM II",
      iso: 3200,
      aperture: "f/2.8",
      shutterSpeed: "25s",
      focalLength: "16mm"
    },
    collectionIds: ["c7"]
  },

  // Collection 8: Thunderstorm Gallery (c8)
  {
    id: "photo-storm-1",
    title: "Tornado Vortex Silhouette",
    description: "A towering, dramatic storm tornado vortex touching down against an ominous orange and purple twilight sky.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725296/A_giant_tornado_vortex_under_202605252126_vlwkka.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725296/A_giant_tornado_vortex_under_202605252126_vlwkka.jpg",
    category: "storms",
    tags: ["Storms", "Tornado", "Atmosphere", "Danger", "p2"],
    photographer: photographers[1],
    location: "Vadodara, Gujarat",
    dateTaken: "2025-07-22",
    likes: 498,
    views: 3790,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Nikon Z9",
      lens: "NIKKOR Z 24-70mm f/2.8 S",
      iso: 400,
      aperture: "f/4.0",
      shutterSpeed: "1/60s",
      focalLength: "35mm"
    },
    collectionIds: ["c8"]
  },
  {
    id: "photo-storm-2",
    title: "Electric Lightning Strikes",
    description: "Branching purple and white lightning bolts striking the open fields under giant severe shelf storm clouds.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725296/Massive_branching_lightning_bolt_striking_202605252126_zxouq8.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725296/Massive_branching_lightning_bolt_striking_202605252126_zxouq8.jpg",
    category: "storms",
    tags: ["Storms", "Lightning", "Atmosphere", "Power", "p2"],
    photographer: photographers[1],
    location: "Vadodara, Gujarat",
    dateTaken: "2025-07-22",
    likes: 520,
    views: 4100,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Nikon Z9",
      lens: "NIKKOR Z 14-24mm f/2.8 S",
      iso: 800,
      aperture: "f/2.8",
      shutterSpeed: "8s",
      focalLength: "18mm"
    },
    collectionIds: ["c8"]
  },

  // Collection 9: Mountain Silhouettes (c9)
  {
    id: "photo-mountain-1",
    title: "Alpine Mirror Skies",
    description: "A gorgeous glass-like alpine lake reflecting snowy mountains and stars under a pitch-black night sky.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725262/A_glass-like_alpine_lake_reflecting_202605252125_erwgsg.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725262/A_glass-like_alpine_lake_reflecting_202605252125_erwgsg.jpg",
    category: "mountains",
    tags: ["Mountains", "Nature", "Reflections", "Summit", "p4"],
    photographer: photographers[3],
    location: "Vadodara, Gujarat",
    dateTaken: "2025-09-18",
    likes: 412,
    views: 2980,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Sony Alpha 7R V",
      lens: "FE 24mm f/1.4 GM",
      iso: 3200,
      aperture: "f/1.4",
      shutterSpeed: "12s",
      focalLength: "24mm"
    },
    collectionIds: ["c9"]
  },
  {
    id: "photo-mountain-2",
    title: "Jagged Summit Totality",
    description: "Jagged snow-covered mountains towering above a soft sea of clouds under a star-studded sky, clean and serene.",
    src: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725270/Jagged_snow-covered_mountains_above_clouds_202605252125_uhdalf.jpg",
    thumbnailSrc: "https://res.cloudinary.com/di17osvrd/image/upload/v1779725270/Jagged_snow-covered_mountains_above_clouds_202605252125_uhdalf.jpg",
    category: "mountains",
    tags: ["Mountains", "Nature", "Silhouettes", "Peaks", "p4"],
    photographer: photographers[3],
    location: "Vadodara, Gujarat",
    dateTaken: "2025-09-18",
    likes: 580,
    views: 4500,
    width: 1920,
    height: 1280,
    cameraSettings: {
      camera: "Sony Alpha 7R V",
      lens: "FE 16-35mm f/2.8 GM II",
      iso: 1600,
      aperture: "f/4.0",
      shutterSpeed: "15s",
      focalLength: "16mm"
    },
    collectionIds: ["c9"]
  }
];

// Update the photoIds collections one final time dynamically
photos.forEach(photo => {
  const collection = collections.find(c => c.id === photo.collectionIds[0]);
  if (collection && !collection.photoIds.includes(photo.id)) {
    collection.photoIds.push(photo.id);
  }
});
