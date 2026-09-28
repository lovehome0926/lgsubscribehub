// Generated from sheet/careship.csv.
// Edit sheet/careship.csv (or an Excel CareShip tab), then run npm run import:xlsx
// See HOW-TO-CARESHIP.md in the project root.

export const CARESHIP_CATEGORIES = [
  {
    "id": "Water Purifier",
    "name": "Water Purifier"
  },
  {
    "id": "Air Purifier",
    "name": "Air Purifier"
  },
  {
    "id": "Dehumidifier",
    "name": "Dehumidifier"
  },
  {
    "id": "Styler",
    "name": "Styler"
  }
]

export const PLAN_META = {
  "visit-q": { name: "Regular Visit", hint: "Technician every 3 months" },
  "visit-6": { name: "Regular Visit", hint: "Technician every 6 months" },
  visit: { name: "Regular Visit", hint: "1 technician visit per year" },
  self: { name: "Self-Service", hint: "Genuine filters delivered" },
  combine: { name: "Combine Maintenance", hint: "1 delivery + 1 visit each year" },
}

export const CARESHIP_PRODUCTS = [
  {
    "id": "wd112an",
    "category": "Water Purifier",
    "models": [
      "WD112AN"
    ],
    "name": "PuriCare Tankless Water Purifier",
    "colors": [
      "White"
    ],
    "plans": [
      {
        "kind": "visit-q",
        "label": "Regular Visit (Quarterly/3mth)",
        "year1": 500,
        "year2": 950,
        "details": "1x Visit every 3mth; Includes 12-mth Internal Pipe Change"
      }
    ]
  },
  {
    "id": "wd210an",
    "category": "Water Purifier",
    "models": [
      "WD210AN"
    ],
    "name": "PuriCare Tankless Water Purifier",
    "colors": [
      "Silver",
      "White"
    ],
    "plans": [
      {
        "kind": "visit-q",
        "label": "Regular Visit (Quarterly/3mth)",
        "year1": 500,
        "year2": 950,
        "details": "1x Visit every 3mth; Includes 12-mth Internal Pipe Change"
      }
    ]
  },
  {
    "id": "wd512an",
    "category": "Water Purifier",
    "models": [
      "WD512AN"
    ],
    "name": "PuriCare Tankless Water Purifier",
    "colors": [
      "Silver",
      "White"
    ],
    "plans": [
      {
        "kind": "visit-q",
        "label": "Regular Visit (Quarterly/3mth)",
        "year1": 500,
        "year2": 950,
        "details": "1x Visit every 3mth; Includes 12-mth Internal Pipe Change"
      }
    ]
  },
  {
    "id": "wd515an",
    "category": "Water Purifier",
    "models": [
      "WD515AN"
    ],
    "name": "PuriCare Tankless Water Purifier",
    "colors": [
      "Shiny Rose",
      "Silver",
      "White"
    ],
    "plans": [
      {
        "kind": "visit-q",
        "label": "Regular Visit (Quarterly/3mth)",
        "year1": 500,
        "year2": 950,
        "details": "1x Visit every 3mth; Includes 12-mth Internal Pipe Change"
      }
    ]
  },
  {
    "id": "ws410gn",
    "category": "Water Purifier",
    "models": [
      "WS410GN",
      "WS510SN"
    ],
    "name": "Floor Standing Water Purifier",
    "colors": [
      "White"
    ],
    "plans": [
      {
        "kind": "visit-q",
        "label": "Regular Visit (Quarterly/3mth)",
        "year1": 500,
        "year2": 950,
        "details": "1x Visit every 3mth; Includes 12-mth Internal Pipe Change (WS410)"
      }
    ]
  },
  {
    "id": "wd217an",
    "category": "Water Purifier",
    "models": [
      "WD217AN",
      "WD517AN"
    ],
    "name": "PuriCare Tankless Water Purifier",
    "colors": [
      "Grey",
      "White"
    ],
    "plans": [
      {
        "kind": "visit-q",
        "label": "Regular Visit (Quarterly/3mth)",
        "year1": 500,
        "year2": 950,
        "details": "1x Visit every 3mth"
      }
    ]
  },
  {
    "id": "wd216an",
    "category": "Water Purifier",
    "models": [
      "WD216AN",
      "WD516AN"
    ],
    "name": "PuriCare Tankless Water Purifier",
    "colors": [
      "Navy Blue",
      "Silver",
      "White"
    ],
    "plans": [
      {
        "kind": "self",
        "label": "Self-Service",
        "year1": 250,
        "year2": 475,
        "details": "2x Filter deliveries per year"
      },
      {
        "kind": "combine",
        "label": "Combine Maintenance",
        "year1": 300,
        "year2": 570,
        "details": "1x Filter delivery + 1x Regular Visit annually"
      },
      {
        "kind": "visit-6",
        "label": "Regular Visit (6mth)",
        "year1": 350,
        "year2": 665,
        "details": "1x Regular visit every 6mth"
      }
    ]
  },
  {
    "id": "wd210mn",
    "category": "Water Purifier",
    "models": [
      "WD210MN"
    ],
    "name": "PuriCare Tankless Water Purifier",
    "colors": [
      "Calming Beige",
      "Calming Clay Brown"
    ],
    "plans": [
      {
        "kind": "self",
        "label": "Self-Service",
        "year1": 250,
        "year2": 475,
        "details": "2x Filter deliveries per year"
      },
      {
        "kind": "combine",
        "label": "Combine Maintenance",
        "year1": 300,
        "year2": 570,
        "details": "1x Filter delivery + 1x Regular Visit annually"
      },
      {
        "kind": "visit-6",
        "label": "Regular Visit (6mth)",
        "year1": 350,
        "year2": 665,
        "details": "1x Regular visit every 6mth"
      }
    ]
  },
  {
    "id": "wd518an",
    "category": "Water Purifier",
    "models": [
      "WD518AN"
    ],
    "name": "PuriCare Tankless Water Purifier",
    "colors": [
      "Beige",
      "Pebble Grey",
      "Cream White",
      "Pink",
      "Cream Sky",
      "Clay Mint"
    ],
    "plans": [
      {
        "kind": "self",
        "label": "Self-Service",
        "year1": 250,
        "year2": 475,
        "details": "2x Filter deliveries per year"
      },
      {
        "kind": "combine",
        "label": "Combine Maintenance",
        "year1": 300,
        "year2": 570,
        "details": "1x Filter delivery + 1x Regular Visit annually"
      },
      {
        "kind": "visit-6",
        "label": "Regular Visit (6mth)",
        "year1": 350,
        "year2": 665,
        "details": "1x Regular visit every 6mth"
      }
    ]
  },
  {
    "id": "wu525bs",
    "category": "Water Purifier",
    "models": [
      "WU525BS"
    ],
    "name": "PuriCare Under-Sink Water Purifier",
    "colors": [
      "Silver",
      "Black"
    ],
    "plans": [
      {
        "kind": "self",
        "label": "Self-Service",
        "year1": 250,
        "year2": 475,
        "details": "2x Filter deliveries per year"
      },
      {
        "kind": "combine",
        "label": "Combine Maintenance",
        "year1": 300,
        "year2": 570,
        "details": "1x Filter delivery + 1x Regular Visit annually"
      },
      {
        "kind": "visit-6",
        "label": "Regular Visit (6mth)",
        "year1": 350,
        "year2": 665,
        "details": "1x Regular visit every 6mth"
      }
    ]
  },
  {
    "id": "as20gphk0",
    "category": "Air Purifier",
    "models": [
      "AS20GPHK0",
      "AS20GPBK0",
      "AS20GPKK0"
    ],
    "name": "PuriCare 360 Double Tower",
    "colors": [
      "Essence White",
      "Clay Brown",
      "Graphite"
    ],
    "plans": [
      {
        "kind": "self",
        "label": "Self-Service",
        "year1": 300,
        "year2": 570,
        "details": "1x Filter delivery/yr"
      },
      {
        "kind": "visit",
        "label": "Regular Visit",
        "year1": 400,
        "year2": 760,
        "details": "1x Visit/yr; Pre-Filter + HEPA Filter"
      }
    ]
  },
  {
    "id": "as10gdby0",
    "category": "Air Purifier",
    "models": [
      "AS10GDBY0",
      "AS10GDPB0",
      "AS10GDWB0"
    ],
    "name": "PuriCare 360 Double Booster",
    "colors": [
      "Beige",
      "Romantic Rose",
      "White"
    ],
    "plans": [
      {
        "kind": "self",
        "label": "Self-Service",
        "year1": 500,
        "year2": 950,
        "details": "1x Filter delivery/yr"
      },
      {
        "kind": "visit",
        "label": "Regular Visit",
        "year1": 600,
        "year2": 1140,
        "details": "1x Visit/yr; Pre-Filter + HEPA Filter"
      }
    ]
  },
  {
    "id": "as65gdby0",
    "category": "Air Purifier",
    "models": [
      "AS65GDBY0",
      "AS65GDPB0",
      "AS65GDWB0"
    ],
    "name": "PuriCare 360 Single Booster",
    "colors": [
      "Beige",
      "Romantic Rose",
      "White"
    ],
    "plans": [
      {
        "kind": "self",
        "label": "Self-Service",
        "year1": 300,
        "year2": 570,
        "details": "1x Filter delivery/yr"
      },
      {
        "kind": "visit",
        "label": "Regular Visit",
        "year1": 400,
        "year2": 760,
        "details": "1x Visit/yr; Pre-Filter + HEPA Filter"
      }
    ]
  },
  {
    "id": "as60ghwg0",
    "category": "Air Purifier",
    "models": [
      "AS60GHWG0",
      "AS60GHCG0",
      "AS60GHBT0"
    ],
    "name": "PuriCare 360 Hit / Pet Version",
    "colors": [
      "White",
      "Brown",
      "Blue"
    ],
    "plans": [
      {
        "kind": "self",
        "label": "Self-Service",
        "year1": 300,
        "year2": 570,
        "details": "1x Filter delivery/yr"
      },
      {
        "kind": "visit",
        "label": "Regular Visit",
        "year1": 400,
        "year2": 760,
        "details": "1x Visit/yr; Pre-Filter + HEPA Filter"
      }
    ]
  },
  {
    "id": "as55ggwx0",
    "category": "Air Purifier",
    "models": [
      "AS55GGWX0",
      "AS55GGSY0"
    ],
    "name": "PuriCare AeroBooster / Pet",
    "colors": [
      "White",
      "Beige"
    ],
    "plans": [
      {
        "kind": "self",
        "label": "Self-Service",
        "year1": 500,
        "year2": 950,
        "details": "1x Filter delivery/yr"
      },
      {
        "kind": "visit",
        "label": "Regular Visit",
        "year1": 600,
        "year2": 1140,
        "details": "1x Visit/yr; Pre-Filter + HEPA Filter"
      }
    ]
  },
  {
    "id": "as25gcbz0",
    "category": "Air Purifier",
    "models": [
      "AS25GCBZ0"
    ],
    "name": "PuriCare AeroCatTower",
    "colors": [
      "Clay Brown"
    ],
    "plans": [
      {
        "kind": "self",
        "label": "Self-Service",
        "year1": 300,
        "year2": 570,
        "details": "1x Filter delivery/yr"
      },
      {
        "kind": "visit",
        "label": "Regular Visit",
        "year1": 400,
        "year2": 760,
        "details": "1x Visit/yr; Pre-Filter + HEPA Filter"
      }
    ]
  },
  {
    "id": "as35ggw10",
    "category": "Air Purifier",
    "models": [
      "AS35GGW10"
    ],
    "name": "PuriCare AeroFurniture",
    "colors": [
      "Essence White",
      "Dark Gray"
    ],
    "plans": [
      {
        "kind": "self",
        "label": "Self-Service",
        "year1": 300,
        "year2": 570,
        "details": "1x Filter delivery/yr"
      },
      {
        "kind": "visit",
        "label": "Regular Visit",
        "year1": 400,
        "year2": 760,
        "details": "1x Visit/yr; Pre-Filter + HEPA Filter"
      }
    ]
  },
  {
    "id": "as30ggw10",
    "category": "Air Purifier",
    "models": [
      "AS30GGW10"
    ],
    "name": "PuriCare AeroMini",
    "colors": [
      "White"
    ],
    "plans": [
      {
        "kind": "self",
        "label": "Self-Service",
        "year1": 180,
        "year2": 340,
        "details": "1x Filter delivery/yr"
      },
      {
        "kind": "visit",
        "label": "Regular Visit",
        "year1": 240,
        "year2": 430,
        "details": "1x Visit/yr; Pre-Filter + HEPA Filter"
      }
    ]
  },
  {
    "id": "dd16gmwe1",
    "category": "Dehumidifier",
    "models": [
      "DD16GMWE1",
      "DD16GMEE1"
    ],
    "name": "PuriCare Dehumidifier 16L",
    "colors": [
      "Essence White",
      "Calming Beige"
    ],
    "plans": [
      {
        "kind": "self",
        "label": "Self-Service",
        "year1": 150,
        "year2": 285,
        "details": "1x Filter delivery/yr"
      },
      {
        "kind": "visit",
        "label": "Regular Visit",
        "year1": 250,
        "year2": 475,
        "details": "1x Visit/yr; Accessory Assembly (Cover + HEPA Filter)"
      }
    ]
  },
  {
    "id": "s3wf",
    "category": "Styler",
    "models": [
      "S3WF",
      "S3GHM"
    ],
    "name": "LG Styler Steam Clothing Care",
    "colors": [
      "White",
      "Essence Win Mirror"
    ],
    "plans": [
      {
        "kind": "self",
        "label": "Self-Service",
        "year1": null,
        "year2": 400,
        "details": "2x Filter accessories delivery/yr; Aroma Sheet + Tanks"
      },
      {
        "kind": "visit",
        "label": "Regular Visit",
        "year1": null,
        "year2": 550,
        "details": "2x Filter accessories delivery/yr; Aroma Sheet + Tanks"
      }
    ]
  }
]

export function productsInCategory(category) {
  return CARESHIP_PRODUCTS.filter((item) => item.category === category)
}

export function yearsForPlan(plan) {
  return [1, 2].filter((year) => (year === 1 ? plan.year1 : plan.year2) != null)
}

export function planPrice(plan, years) {
  return years === 2 ? plan.year2 : plan.year1
}

export function compactModel(value) {
  return String(value || "")
    .toUpperCase()
    .replace(/O/g, "0")
    .replace(/[^A-Z0-9]/g, "")
}

export function matchCatalogProduct(product, catalog = []) {
  const codes = product.models.map(compactModel)
  return catalog.find((item) => {
    const keys = [item.model, item.sku, ...(item.colors || []).map((color) => color.model)]
    return keys.some((key) => {
      const compact = compactModel(key)
      return codes.some((code) => compact === code || compact.startsWith(code))
    })
  })
}
