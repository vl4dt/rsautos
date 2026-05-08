import { groq } from "next-sanity";

export const importStatusOptions = [
  "auctionWon",
  "inTransit",
  "customsClearance",
  "atWorkshop",
  "readyForSale"
] as const;

export type ImportStatus = (typeof importStatusOptions)[number];

export const sortOptions = [
  "newest",
  "priceAsc",
  "priceDesc",
  "mileageAsc"
] as const;

export type InventorySort = (typeof sortOptions)[number];

export type InventorySearchParams = {
  make?: string;
  minYear?: number;
  maxYear?: number;
  minPrice?: number;
  maxPrice?: number;
  status?: ImportStatus;
  sort?: InventorySort;
};

export type VehicleImage = {
  _key?: string;
  alt: string;
  asset: {
    _ref: string;
    _type: "reference";
  };
};

export type SiteVisualSettings = {
  homeHeroImage?: VehicleImage;
  homeCtaImage?: VehicleImage;
  homeCta?: HomeCtaContent;
  aboutHeroImage?: VehicleImage;
  socialLinks?: SocialLink[];
  testimonials?: Testimonial[];
};

export type HomeCtaContent = {
  eyebrow?: string;
  title?: string;
  body?: string;
  buttonLabel?: string;
  buttonHref?: string;
};

export type SocialPlatform = "facebook" | "instagram" | "youtube" | "tiktok";

export type SocialLink = {
  _key?: string;
  platform: SocialPlatform;
  url: string;
};

export type Testimonial = {
  _key?: string;
  quote: string;
  name: string;
  city?: string;
  vehicle?: string;
  rating?: number;
};

export type PublicVehicleCard = {
  _id: string;
  title: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  priceUsd: number;
  mileage: number;
  vin?: string;
  importStatus: ImportStatus;
  heroImage?: VehicleImage;
  transmission?: string;
  drivetrain?: string;
  fuelType?: string;
  publishedAt: string;
};

export type InspectionStatus = "verified" | "needsService" | "pending";

export type PublicVehicleInspectionItem = {
  _key: string;
  label: string;
  status: InspectionStatus;
};

export type PublicVehicleRepairLog = {
  _key: string;
  date?: string;
  summary?: string;
  details?: string;
};

export type PublicVehicleDocument = {
  _key: string;
  title: string;
  description?: string;
  url?: string;
  status?: "available" | "pending" | "notApplicable";
};

export type PublicVehicleDetail = PublicVehicleCard & {
  titleStatus?: string;
  location?: string;
  auctionState?: {
    conditionSummary?: string;
    images?: VehicleImage[];
  };
  currentState?: {
    conditionSummary?: string;
    images?: VehicleImage[];
    repairLogs?: PublicVehicleRepairLog[];
  };
  inspection?: PublicVehicleInspectionItem[];
  documents?: PublicVehicleDocument[];
};

export type InventoryFiltersData = {
  makes: string[];
  bounds: {
    minYear?: number;
    maxYear?: number;
    minPrice?: number;
    maxPrice?: number;
  };
};

export const publicVehicleProjection = groq`
  _id,
  title,
  "slug": slug.current,
  make,
  model,
  year,
  priceUsd,
  mileage,
  vin,
  importStatus,
  "heroImage": coalesce(currentState.images[0], auctionState.images[0]),
  transmission,
  drivetrain,
  fuelType,
  publishedAt
`;

export const siteVisualSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    homeHeroImage{alt, asset},
    homeCtaImage{alt, asset},
    homeCta{eyebrow, title, body, buttonLabel, buttonHref},
    aboutHeroImage{alt, asset},
    socialLinks[]{_key, platform, url},
    testimonials[]{_key, quote, name, city, vehicle, rating}
  }
`;

export function buildInventoryQuery(params: InventorySearchParams): string {
  const filters = [
    `_type == "carListing"`,
    `defined(slug.current)`,
    `isPublic == true`
  ];

  if (params.make) {
    filters.push(`make == $make`);
  }

  if (typeof params.minYear === "number") {
    filters.push(`year >= $minYear`);
  }

  if (typeof params.maxYear === "number") {
    filters.push(`year <= $maxYear`);
  }

  if (typeof params.minPrice === "number") {
    filters.push(`priceUsd >= $minPrice`);
  }

  if (typeof params.maxPrice === "number") {
    filters.push(`priceUsd <= $maxPrice`);
  }

  if (params.status) {
    filters.push(`importStatus == $status`);
  }

  return groq`*[${filters.join(" && ")}] | ${orderForSort(
    params.sort
  )} { ${publicVehicleProjection} }`;
}

export const inventoryFiltersQuery = groq`{
  "makes": array::unique(*[_type == "carListing" && isPublic == true && defined(make)].make) | order(@ asc),
  "bounds": {
    "minYear": math::min(*[_type == "carListing" && isPublic == true].year),
    "maxYear": math::max(*[_type == "carListing" && isPublic == true].year),
    "minPrice": math::min(*[_type == "carListing" && isPublic == true].priceUsd),
    "maxPrice": math::max(*[_type == "carListing" && isPublic == true].priceUsd)
  }
}`;

export const vehicleSlugsQuery = groq`
  *[_type == "carListing" && isPublic == true && defined(slug.current)][]{
    "slug": slug.current
  }
`;

export const publicVehicleDetailQuery = groq`
  *[_type == "carListing" && isPublic == true && slug.current == $slug][0]{
    ${publicVehicleProjection},
    titleStatus,
    location,
    auctionState{
      conditionSummary,
      images[]{_key, alt, asset}
    },
    currentState{
      conditionSummary,
      images[]{_key, alt, asset},
      repairLogs[]{_key, date, summary, details}
    },
    inspection[]{_key, label, status},
    documents[]{_key, title, description, url, status}
  }
`;

function orderForSort(sort: InventorySearchParams["sort"]): string {
  switch (sort) {
    case "priceAsc":
      return "order(priceUsd asc)";
    case "priceDesc":
      return "order(priceUsd desc)";
    case "mileageAsc":
      return "order(mileage asc)";
    case "newest":
    default:
      return "order(publishedAt desc)";
  }
}
