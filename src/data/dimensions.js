// Official Product Dimensions (W x H x D, mm) copied from lg.com spec tables.
// Models whose official page did not print a dimension line are omitted.

const indoor = (value) => ({ label: "Indoor Unit Dimension (W x H x D, mm)", value })
const outdoor = (value) => ({ label: "Outdoor Unit Dimension (W x H x D, mm)", value })
const product = (value) => ({ label: "Product Dimensions (W x H x D, mm)", value })
const packing = (value) => ({ label: "Packing Dimensions (W x H x D, mm)", value })

export const DIMENSION_FACTS = {
  AS30GGW10: [product("250 x 360 x 250"), packing("305 x 420 x 305")],
  "S3-Q120AGZB": [indoor("799 x 307 x 235"), outdoor("717 x 495 x 230")],
  "S3-Q09JAYPP": [indoor("837 x 308 x 189"), outdoor("717 x 495 x 230")],
  "S3-Q12JAYPP": [indoor("837 x 308 x 189"), outdoor("717 x 495 x 230")],
  "S3-Q12JARPA": [indoor("837 x 308 x 192"), outdoor("717 x 495 x 230")],
  "S3-Q24K2RPA": [indoor("998 x 345 x 212"), outdoor("870 x 650 x 330")],
  "S3-Q18KAYPA": [indoor("1068 x 425 x 279"), outdoor("839 x 532 x 324")],
  "S3-Q24KLYPA": [indoor("1068 x 425 x 279"), outdoor("839 x 532 x 324")],
  DFC335HM: [product("600 x 850 x 600"), packing("680 x 890 x 665")],
  FX1411R5WR: [product("600 x 850 x 565")],
  FX1412S5GR: [product("600 x 850 x 565")],
  F2515RNTKAR: [product("650 x 950 x 645")],
  WT2520NHEGR: [product("700 x 1890 x 830")],
  "S3-Q2412GZC": [product("967 x 383 x 296")],
  GXJB18JBQRC: [product("835 x 1860 x 696")],
}

// Leaflet DST-102026 is the source for models whose LG page had no dimension line.
// 50NU865BPSA and 55NU865BPSA share the NANO TV product, which already has a size line.
