// Centralised mapping of farm assets to local files under /public.
// Lets cards and sections stay visual even when the DB has no image URL yet.

export const LOGO = "/logos/Rooted in Tradition, Growing with Nature (1).png";

const img = (p: string) => `/images/${p}`;

// ── Hero / section backgrounds ─────────────────────────────
export const HERO_IMAGE = img("WhatsApp Image 2026-08-10 at 11.56.51.jpeg");
export const RANCH_WIDE = img("2400x0.jpg");
export const RANCH_PANO = img("R.jpg");
export const FIELD_DAY = img("WhatsApp Image 2026-08-10 at 11.56.50.jpeg");
export const HERD_FIELD = img("WhatsApp Image 2026-08-10 at 11.55.21.jpeg");

// ── Per-breed fallbacks (matched by breed name, case-insensitive) ──
export const BREED_IMAGES: Record<string, string> = {
  boran: img("100_2367-940x705.jpg"),
  sahiwal: img("Sahiwal-Cattle-Breed.jpg"),
  "sahiwal cow": img("Sahiwal-Cow.webp"),
  "sahiwal bull": img("sahiwal-bull-500x500.webp"),
  bonsmara: img("22.jpg"),
  brahman: img("08.jpg"),
  simmental: img("1000_F_249788840_dOC7EK7xLZ1jFJbhy2mHlax32Pj0ZDL2.jpg"),
  friesian: img("74cc74d0d4167756df44a664aa89a11d.jpg"),
  boer: img("re_goats_waskosims_rock_0.jpg"),
  galla: img("somali-goats.jpg"),
  "boer x galla": img("1709725021-goat-farming-disease-management-and-its-benefits-know.jpg"),
  dorper: img("Dorper-sheep-800x534.jpg"),
  "red maasai": img("Sheep1-1jyf79s.jpg"),
  "red maasai x dorper": img("dorper-sheep-1024x538.jpg"),
  "dorper herd sire": img("dorper-herd-sire.webp"),
  "dorper ewe": img("beautiful-female-dorper-sheep-on-600nw-2455116755.webp"),
};

// ── Species fallbacks (by species.name) ─────────────────────
export const SPECIES_IMAGES: Record<string, string> = {
  Cattle: img("100_2367-940x705.jpg"),
  "Beef Cattle": img("100_2367-940x705.jpg"),
  "Dairy Cattle": img("Sahiwal-Cow.webp"),
  Goats: img("re_goats_waskosims_rock_0.jpg"),
  Sheep: img("Dorper-sheep-800x534.jpg"),
};

// ── Product category fallbacks (by ProductCategory.name) ───
export const CATEGORY_IMAGES: Record<string, string> = {
  "Beef Cuts": img("08.jpg"),
  Dairy: img("Sahiwal-Cow.webp"),
  "Dairy Products": img("Sahiwal-Cow.webp"),
  "Goat Meat": img("somali-goats.jpg"),
  "Sheep Meat": img("dorper-sheep-1024x538.jpg"),
  Vegetables: img("WhatsApp Image 2026-08-10 at 11.56.41.jpeg"),
  Fruits: img("WhatsApp Image 2026-08-10 at 11.56.40.jpeg"),
  "Ranch Box": img("WhatsApp Image 2026-08-10 at 11.55.21.jpeg"),
};

// ── Visit / ranch gallery ───────────────────────────────────
export const RANCH_GALLERY: string[] = [
  img("WhatsApp Image 2026-08-10 at 11.55.21.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.22.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.23.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.42.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.43.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.44.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.45.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.46.jpeg"),
];

export function imageForBreed(name: string, species?: string): string | null {
  const key = name.toLowerCase();
  if (BREED_IMAGES[key]) return BREED_IMAGES[key];
  if (species && SPECIES_IMAGES[species]) return SPECIES_IMAGES[species];
  return null;
}

export function imageForCategory(name: string): string | null {
  return CATEGORY_IMAGES[name] ?? null;
}
