import { img } from "./assets"

export const categories = [
  { id: "water", label: "净水器", en: "Water Purifiers" },
  { id: "air", label: "空气净化器", en: "Air Purifiers" },
  { id: "ac", label: "空调", en: "Air Conditioners" },
  { id: "laundry", label: "洗衣干衣", en: "Laundry" },
]

export const products = [
  {
    id: "wd518an",
    category: "water",
    name: "LG PuriCare Objet Collection",
    model: "WD518AN.ALBRLML",
    tag: "热销订阅",
    highlight: "无水箱 · 热/冷/常温 · 自动杀菌",
    image: img.waterHero,
    gallery: [img.waterGallery1, img.waterGallery2, img.waterGallery3],
    outright: 4000,
    plans: {
      36: { self: 99, visit: 129 },
      48: { self: 85, visit: 109 },
      60: { self: 69, visit: 89 },
    },
  },
  {
    id: "as60ghcg0",
    category: "air",
    name: "LG PuriCare 360° 空气净化器",
    model: "AS60GHCG0",
    tag: "雾霾季推荐",
    highlight: "360° 净化 · 适用约 61㎡ · ThinQ",
    image: img.airHero,
    gallery: [img.airGallery1, img.airGallery2, img.airGallery3],
    outright: 3200,
    plans: {
      36: { self: 89, visit: 119 },
      48: { self: 75, visit: 99 },
      60: { self: 59, visit: 79 },
    },
  },
  {
    id: "as30ggw10",
    category: "air",
    name: "LG PuriCare AeroHit 2",
    model: "AS30GGW10",
    tag: "小户型精选",
    highlight: "紧凑高效 · 卧室/书房 · 低噪音",
    image: img.aeroHit,
    gallery: [img.aeroHit, img.cardAir],
    outright: 900,
    plans: {
      36: { self: 39, visit: 55 },
      48: { self: 32, visit: 45 },
      60: { self: 25, visit: 39 },
    },
  },
  {
    id: "as25gcbz0",
    category: "air",
    name: "LG PuriCare AeroCat Tower",
    model: "AS25GCBZ0",
    tag: "宠物家庭",
    highlight: "宠物毛发过滤 · 塔式设计 · 智能感应",
    image: img.aeroCat,
    gallery: [img.aeroCat, img.airGallery3],
    outright: 3200,
    plans: {
      36: { self: 95, visit: 125 },
      48: { self: 79, visit: 105 },
      60: { self: 65, visit: 89 },
    },
  },
]
