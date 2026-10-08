const CDN = "https://www.lg.com/content/dam/channel/wcms/hk_en/images/puricare-air-care/air-purifier/as60glsg0"
const shot = (name) => `${CDN}/feature/${name}`
const gallery = Array.from({ length: 15 }, (_, index) => `${CDN}/gallery/large${String(index + 1).padStart(2, "0")}.jpg`)

const detail = {
  tagline: "Enjoy fresh air with front-intake purification and dual airflow, removing 99.9% of mold, 99% of bacteria, and 98% of viruses.",
  quickFeatures: [
    {
      title: "Dual Airflow",
      copy: "Enjoy fresh air with front-intake purification and dual airflow, removing 99.9% of mold, 99% of bacteria, and 98% of viruses.",
    },
    {
      title: "Slim & Flat Design",
      copy: "The wall-fit design keeps your space clean and usable, available in both stand and wall-mount types.",
    },
    {
      title: "AI Mode",
      copy: "Automatically adjusts fan power based on real time air quality, saving up to 30.5% in cumulative energy consumption.",
    },
    {
      title: "Smart Air Control",
      copy: "Control power and modes, monitor air quality, and get filter replacement alerts through the LG ThinQ app.",
    },
    {
      title: "V Filter",
      copy: "The V Filter’s 3 stage system captures hair, pet fur, and larger dust, while filtering 99.999% of ultra fine particles down to 0.01㎛.",
    },
    {
      title: "Sleep Mode",
      copy: "Turns off the display and runs quietly at 23dB to avoid disturbing rest or focus.",
    },
  ],
  stories: [
    {
      title: "Dual Airflow",
      copy: "Enjoy fresh air with front-intake purification and dual airflow, removing 99.9% of mold, 99% of bacteria, and 98% of viruses.",
      poster: shot("lg-air-purifier-wallfit-2026-as60glsg0-feature-stand-and-wall-type-03-dual-air-flow-d.jpg"),
      video: null,
    },
    {
      title: "Clean air with 3-stage filtration",
      copy: "The V Filter’s 3 stage system captures hair, pet fur, and larger dust, while filtering 99.999% of ultra fine particles down to 0.01㎛. It also helps reduce indoor noxious gases such as toluene, ammonia, and formaldehyde.",
      poster: shot("lg-air-purifier-wallfit-2026-as60glsg0-feature-stand-and-wall-type-04-v-filter.jpg"),
      video: null,
    },
    {
      title: "Two fit options, space-saving by design",
      copy: "The wall-fit design keeps your space clean and usable, available in both stand and wall-mount types.",
      poster: shot("lg-air-purifier-wallfit-2026-as60glsg0-feature-stand-and-wall-type-06-slim-flat-design-d.jpg"),
      video: null,
    },
    {
      title: "AI Mode",
      copy: "Automatically adjusts fan power based on real time air quality, saving up to 30.5% in cumulative energy consumption.",
      poster: shot("lg-air-purifier-wallfit-2026-as60glsg0-feature-stand-and-wall-type-08-1-ai-mode-d.jpg"),
      video: null,
    },
    {
      title: "Purify Mode",
      copy: "Choose your preferred purification level and check air quality at a glance through 4 color-coded stages on the display.",
      poster: shot("lg-air-purifier-wallfit-2026-as60glsg0-feature-stand-and-wall-type-08-2-purify-mode-d.jpg"),
      video: null,
    },
    {
      title: "Sleep Mode",
      copy: "Turns off the display and runs quietly at 23dB to avoid disturbing rest or focus.",
      poster: shot("lg-air-purifier-wallfit-2026-as60glsg0-feature-stand-and-wall-type-08-3-sleep-mode-d.jpg"),
      video: null,
    },
    {
      title: "Detachable Cover",
      copy: "Front access for easy filter maintenance and replacement.",
      poster: shot("lg-air-purifier-wallfit-2026-as60glsg0-feature-stand-and-wall-type-09-2-detachable-cover-d.jpg"),
      video: null,
    },
    {
      title: "LG ThinQ",
      copy: "Stay connected wherever you are. Control power and modes, monitor air quality, and get filter replacement alerts through the LG ThinQ app.",
      poster: shot("lg-air-purifier-wallfit-2026-as60glsg0-feature-stand-and-wall-type-10-thinq-d.jpg"),
      video: null,
    },
  ],
  facts: [
    { label: "Recommended area (㎡)", value: "59.4" },
    { label: "Power input (W)", value: "43" },
    { label: "Power Supply (V/Hz)", value: "220~240V / 50/60Hz" },
    { label: "CADR (CMH)", value: "463" },
    { label: "CADR (CMM)", value: "7.7" },
    { label: "Color", value: "Calming Beige" },
    { label: "Display(Method)", value: "LED + Touch Button" },
    { label: "Noise (High / Low, dB)", value: "49 / 23" },
    { label: "Product Weight (kg)", value: "10.1" },
    { label: "Weight_Shipping (kg)", value: "12.3" },
    { label: "Product Dimensions -WxHxD (mm)", value: "560 x 540 x 180" },
    { label: "Packing Dimensions -WxHxD (mm)", value: "637 x 622 x 253" },
    { label: "Filter Grade", value: "H13" },
    { label: "Air Purifier Filter", value: "V Filter X 1 EA" },
  ],
}

export const AS60GLSG0 = {
  id: "puricare-wallfit-air-purifier-as60glsg0",
  type: "air",
  sku: "AS60GLSG0.AHK",
  name: "LG PuriCare WallFit Air Purifier",
  baseName: "LG PuriCare WallFit Air Purifier",
  shortName: "PuriCare WallFit",
  model: "AS60GLSG0",
  tagline: detail.tagline,
  category: "Air Purifiers",
  waters: [],
  hasCare: true,
  specLabel: "Specification",
  colors: [
    {
      id: "calming-beige",
      name: "Calming Beige",
      hex: "#E6D3BE",
      image: gallery[0],
      gallery,
      model: "AS60GLSG0",
      specIds: ["standard"],
      variants: {
        standard: {
          model: "AS60GLSG0",
          image: gallery[0],
          gallery,
          url: "https://www.lg.com/hk_en/puricare-air-care/air-purifier/as60glsg0/",
          detail,
        },
      },
    },
  ],
  specs: [
    {
      id: "standard",
      label: "PuriCare WallFit",
      available: true,
      waters: [],
      pricing: {
        outright: 2500,
        subscribe: {
          60: { self: 90, visit: { 6: null, 12: 110, 24: null } },
          84: { self: 60, visit: { 6: null, 12: 80, 24: null } },
        },
      },
    },
  ],
  copyFeaturesFrom: null,
  quickFeatures: detail.quickFeatures,
  stories: detail.stories,
  facts: detail.facts,
}
