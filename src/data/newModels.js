const WASHER = "https://www.lg.com/content/dam/channel/wcms/my/image-update/washing-machine"
const FRIDGE = "https://www.lg.com/content/dam/channel/wcms/my/image-update/refrigerators/gxjb18jbqrc-aeprlmz"

const washerShot = (name) =>
  `${WASHER}/fx1411r5wr-agwreml/gp1/gallery/1044x1334/front-loading-washing-machine-gvx-2026-fx1411r5wr-id-essencewhite-${name}.jpg`
const washerFeature = (folder, file) => `${WASHER}/${folder}/gp1/feature/desktop/${file}`
const fridgeFeature = (file) => `${FRIDGE}/feature/desktop/${file}`

const washerGallery = [
  "01-11kg-front",
  "02-11kg-frontopen",
  "03-11kg-fronthighangle",
  "04-11kg-knobdisplaydetail",
  "05-11kg-detergent",
  "06-11kg-drum",
  "07-11kg-topdraweropen",
  "08-11kg-left",
].map(washerShot)

const washerDetail = {
  tagline: "11/7kg washer and dryer in one Essence White body, with AI Wash, TurboWash™ 360 and Steam™.",
  quickFeatures: [
    { title: "Washer and dryer in one", copy: "Wash and dry in a single 11/7kg unit, so the laundry routine takes less floor space." },
    { title: "AI Wash", copy: "AI Wash, powered by AI DD™, adjusts the motion for the fabric and soil level." },
    { title: "TurboWash™ 360", copy: "A multi-nozzle spray washes in four directions and can finish a load in 39 minutes." },
    { title: "Steam™", copy: "Steam helps loosen fibres and reduce allergens such as pollen and dust mites." },
    { title: "Microplastic Care", copy: "Swing and tumble motions reduce friction and can cut microplastic emissions during the wash." },
  ],
  stories: [
    {
      title: "Washer and dryer in one",
      copy: "Load, set and go. Washing and drying sit in one unit.",
      poster: washerFeature("fx1411r5wr-agwreml", "front-loading-washing-machine-gvx-2026-f4x5ryvy5n-feature-intro-d.jpg"),
      video: null,
    },
    {
      title: "Thorough wash in 39 minutes",
      copy: "TurboWash™ 360 sprays water and detergent from four directions.",
      poster: washerFeature("fx1411r5wr-agwreml", "front-loading-washing-machine-gvx-2026-f4x5ryvy5n-feature-steam.jpg"),
      video: null,
    },
    {
      title: "Room for a larger load",
      copy: "The drum capacity is larger while the body stays a standard 600mm wide.",
      poster: washerFeature("fx1411s5w-agwreml", "front-loading-washing-machine-gvx-2026-f4x5ryvy5n-feature-spacious-drum.jpg"),
      video: null,
    },
  ],
  facts: [
    { label: "Capacity", value: "11/7kg" },
    { label: "Color", value: "White" },
    { label: "Product Dimensions (W x H x D, mm)", value: "600 x 850 x 565" },
  ],
}

const fridgeGallery = [
  `${FRIDGE}/gallery/basic/multi-door-vn5-2026-gxjb18jbqtd-gmbs30sdep-matteblack-gallery-large.jpg`,
  fridgeFeature("multi-door-vn5-2026-gxjb18jbqtd-gmbs30sdep-matteblack-feature0-keyvisual-d.jpg"),
  fridgeFeature("multi-door-vn5-2026-gxjb18jbqtd-gmbs30sdep-matteblack-feature4-premium-flatdoor-d.jpg"),
  fridgeFeature("multi-door-vn5-2026-gxjb18jbqtd-gmbs30sdep-matteblack-feature5-design-d.jpg"),
  fridgeFeature("multi-door-vn5-2026-gxjb18jbqtd-gmbs30sdep-matteblack-feature7-doorcooling-d.jpg"),
]
const fridgeDetail = {
  tagline: "Multi-door refrigerator in Black Glass, with zero-clearance doors, DoorCooling+™ and ThinQ™.",
  quickFeatures: [
    { title: "Zero clearance", copy: "The door opens wide beside a wall. LG recommends at least 4mm of side clearance." },
    { title: "Thin door", copy: "A thinner door sits closer to the cabinet line and opens with less protrusion." },
    { title: "DoorCooling+™", copy: "Cooling reaches the door baskets, so drinks and food chill more evenly." },
    { title: "AI Fresh", copy: "Through the LG ThinQ app, cooling can adapt when the door is opened often." },
    { title: "Large capacity", copy: "580 litres in an 835 x 1860 x 696mm body." },
  ],
  stories: [
    {
      title: "Open wide next to the wall",
      copy: "Zero clearance lets the door open in a tight kitchen.",
      poster: fridgeFeature("multi-door-vn5-2026-gxjb18jbqtd-gmbs30sdep-matteblack-feature2-2-zero-clearance-lifestyle-d-thumbnail.jpg"),
      video: null,
    },
    {
      title: "DoorCooling+™",
      copy: "Cold air reaches the door, so items in the baskets stay fresh.",
      poster: fridgeFeature("multi-door-vn5-2026-gxjb18jbqtd-gmbs30sdep-matteblack-feature7-doorcooling-d.jpg"),
      video: null,
    },
    {
      title: "Room for a bigger shop",
      copy: "The multi-door layout keeps a large load without crowding the kitchen.",
      poster: fridgeFeature("multi-door-vn5-2026-gxjb18jbqtd-gmbs30sdep-matteblack-feature9-large-capacity-d.jpg"),
      video: null,
    },
  ],
  facts: [
    { label: "Capacity", value: "580L" },
    { label: "Finish", value: "Black Glass" },
    { label: "Product Dimensions (W x H x D, mm)", value: "835 x 1860 x 696" },
    { label: "Product Weight (kg)", value: "93" },
    { label: "ThinQ (Wi-Fi)", value: "Yes" },
  ],
}

function model({ id, type, sku, name, shortName, model, category, specId, specLabel, color, detail, pricing, url }) {
  return {
    id,
    type,
    sku,
    name,
    baseName: name,
    shortName,
    model,
    isNew: true,
    tagline: detail.tagline,
    category,
    waters: [],
    hasCare: true,
    specLabel: "Specification",
    colors: [
      {
        ...color,
        image: color.gallery[0],
        model,
        specIds: [specId],
        variants: {
          [specId]: { model, image: color.gallery[0], gallery: color.gallery, url, detail },
        },
      },
    ],
    specs: [
      {
        id: specId,
        label: specLabel,
        available: true,
        waters: [],
        pricing: { outright: null, subscribe: pricing },
      },
    ],
    copyFeaturesFrom: null,
    quickFeatures: detail.quickFeatures,
    stories: detail.stories,
    facts: detail.facts,
  }
}

export const FX1411R5WR = model({
  id: "washer-dryer-fx1411r5wr",
  type: "washer",
  sku: "FX1411R5WR",
  name: "LG Washer Dryer",
  shortName: "Washer Dryer",
  model: "FX1411R5WR",
  category: "Washer Dryers",
  specId: "11-7kg",
  specLabel: "11/7kg",
  color: { id: "white", name: "White", hex: "#F4F4F4", gallery: washerGallery },
  detail: washerDetail,
  url: "https://www.lg.com/my/lg-subscribe/washer-dryers/fx1411r5wr/lgsubscribe/",
  pricing: {
    60: { combined: 95, visit: { 6: 115, 12: null, 24: null } },
    84: { combined: 75, visit: { 6: 95, 12: null, 24: null } },
  },
})

export const GXJB18JBQRC = model({
  id: "multi-door-gxjb18jbqrc",
  type: "fridge",
  sku: "GXJB18JBQRC",
  name: "LG Multi-Door",
  shortName: "LG Multi-Door",
  model: "GXJB18JBQRC",
  category: "Refrigerators",
  specId: "580l",
  specLabel: "580L",
  color: { id: "black-glass", name: "Black Glass", hex: "#1A1A1A", gallery: fridgeGallery },
  detail: fridgeDetail,
  url: "https://www.lg.com/my/lg-subscribe/refrigerators/gxjb18jbqrc/",
  pricing: {
    60: { visit: { 6: null, 12: 140, 24: 120 } },
    84: { visit: { 6: null, 12: 120, 24: 100 } },
  },
})
