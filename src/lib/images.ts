// Centralised mapping of farm assets to local files under /public.
// Breeds/products use descriptive, named photos; anonymous ranch
// shots are reserved for slideshows and background imagery.

export const LOGO = "/logos/Rooted in Tradition, Growing with Nature (1).png"

const img = (p: string) => `/images/${p}`

// ── Background / hero / section imagery (anonymous ranch shots) ──
export const HERO_IMAGE = img("WhatsApp Image 2026-08-10 at 11.56.51.jpeg")
export const RANCH_WIDE = img("R.jpg")
export const RANCH_PANO = img("2400x0.jpg")
export const FIELD_DAY = img("WhatsApp Image 2026-08-10 at 11.56.50.jpeg")
export const HERD_FIELD = img("WhatsApp Image 2026-08-10 at 11.55.21.jpeg")
export const RANGELANDS_HERD = img("osotua-rangelands-herd.jpg")

// Anonymous WhatsApp ranch photos — used only in slideshows/galleries.
export const RANCH_GALLERY: string[] = [
  img("WhatsApp Image 2026-08-10 at 11.55.21.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.22.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.23.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.42.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.43.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.44.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.24.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.25.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.26.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.28.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.30.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.32.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.34.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.45.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.48.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.49.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.52.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.12.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.13.jpeg"),
]

// ── Per-breed photos (matched by breed name, case-insensitive) ──
// Uses descriptive filenames so each breed is unmistakable.
export const BREED_IMAGES: Record<string, string> = {
  boran: img("boran bulls.jpg"),
  bonsmara: img("bonsamara bull.jpg"),
  brahman: img("brahman cows.jpg"),
  "brahman cow": img("brahman cow and calf.jpg"),
  simmental: img("simentel.jpeg"),
  "simmental cross": img("simtel calf.jpeg"),
  friesian: img("74cc74d0d4167756df44a664aa89a11d.jpg"),
  sahiwal: img("sahiwal cow.jpg"),
  "sahiwal cow": img("sahiwal cow.jpg"),
  "sahiwal bull": img("sahiwal bull.jpg"),
  boer: img("boer goat.jpg"),
  galla: img("somali-goats.jpg"),
  "boer x galla": img("goats.jpg"),
  dorper: img("dorper ram.jpg"),
  "red maasai": img("Sheep1-1jyf79s.jpg"),
  "red maasai x dorper": img("dorper lambs.jpg"),
  "dorper ram": img("dorper ram.jpg"),
  "dorper ewe": img("beautiful-female-dorper-sheep-on-600nw-2455116755.webp"),
}

// ── Species fallbacks (by species.name) ─────────────────────
export const SPECIES_IMAGES: Record<string, string> = {
  "Beef Cattle": img("boran bulls.jpg"),
  "Dairy Cattle": img("sahiwal cow.jpg"),
  Goats: img("boer goat.jpg"),
  Sheep: img("dorper ram.jpg"),
}

// ── Product category fallbacks (by ProductCategory.name) ───
export const CATEGORY_IMAGES: Record<string, string> = {
  "Beef Cuts": img("beef cuts.jpg"),
  "Dairy Products": img("Sahiwal-Cow.webp"),
  "Goat Meat": img("boer goat.jpg"),
  "Sheep Meat": img("dorper lambs.jpg"),
  Vegetables: img("cabbages.jpeg"),
  Fruits: img("pineapples.jpg"),
  "Ranch Box": img("vegetables.jpg"),
}

// ── Named produce photos, for slideshow tiles on the barn ──
export const PRODUCE_SLIDESHOW: { src: string; label: string }[] = [
  { src: img("cabbages.jpeg"), label: "Cabbages" },
  { src: img("carrots.jpg"), label: "Carrots" },
  { src: img("red onions.jpg"), label: "Red Onions" },
  { src: img("garlic.jpg"), label: "Garlic" },
  { src: img("tomatoes.jpg"), label: "Tomatoes" },
  { src: img("ripe tomatoes.jpg"), label: "Ripe Tomatoes" },
  { src: img("cucumber.jpg"), label: "Cucumber" },
  { src: img("bell pepper.jpg"), label: "Bell Pepper" },
  { src: img("green chillies.jpg"), label: "Green Chillies" },
  { src: img("chillies.jpg"), label: "Chillies" },
  { src: img("maize.jpeg"), label: "Maize" },
  { src: img("maize fields.jpeg"), label: "Maize Fields" },
  { src: img("apples.jpg"), label: "Apples" },
  { src: img("pineapples.jpg"), label: "Pineapples" },
  { src: img("watermelon.jpg"), label: "Watermelon" },
  { src: img("grapes.jpg"), label: "Grapes" },
  { src: img("cherries.jpg"), label: "Cherries" },
  { src: img("strawberry.jpg"), label: "Strawberry" },
  { src: img("pixies.jpg"), label: "Pixies" },
  { src: img("plams.jpg"), label: "Plums" },
  { src: img("grass fed beef.jpg"), label: "Grass-Fed Beef" },
  { src: img("prime beef.jpg"), label: "Prime Beef" },
  { src: img("lamb chops.jpg"), label: "Lamb Chops" },
  { src: img("grilled lamb chops.jpg"), label: "Grilled Lamb Chops" },
  { src: img("eggs.jpg"), label: "Free-Range Eggs" },
]

// ── Named livestock photos, for breed-page slideshow ──────
export const LIVESTOCK_SLIDESHOW: { src: string; label: string }[] = [
  { src: img("boran bulls.jpg"), label: "Boran Bulls" },
  { src: img("boran cow.jpg"), label: "Boran Cow" },
  { src: img("boran heifers.jpg"), label: "Boran Heifers" },
  { src: img("bonsamara bull.jpg"), label: "Bonsmara Bull" },
  { src: img("brahman cows.jpg"), label: "Brahman Cows" },
  { src: img("brahman cow and calf.jpg"), label: "Brahman Cow & Calf" },
  { src: img("brahaman cow.jpg"), label: "Brahman Cow" },
  { src: img("angus bull.jpg"), label: "Angus Bull" },
  { src: img("nelore bull.jpg"), label: "Nelore Bull" },
  { src: img("brafford bull.jpg"), label: "Brafford Bull" },
  { src: img("sahiwal bull.jpg"), label: "Sahiwal Bull" },
  { src: img("sahiwal cow.jpg"), label: "Sahiwal Cow" },
  { src: img("sahiwal calves.jpeg"), label: "Sahiwal Calves" },
  { src: img("boer goat.jpg"), label: "Boer Goat" },
  { src: img("boer.jpg"), label: "Boer Buck" },
  { src: img("goats.jpg"), label: "The Herd" },
  { src: img("dorper ram.jpg"), label: "Dorper Ram" },
  { src: img("dorper lambs.jpg"), label: "Dorper Lambs" },
  { src: img("Sheep1-1jyf79s.jpg"), label: "Red Maasai Sheep" },
]

export function imageForBreed(name: string, species?: string): string | null {
  const key = name.toLowerCase()
  if (BREED_IMAGES[key]) return BREED_IMAGES[key]
  if (species && SPECIES_IMAGES[species]) return SPECIES_IMAGES[species]
  return null
}

export function imageForCategory(name: string): string | null {
  return CATEGORY_IMAGES[name] ?? null
}
