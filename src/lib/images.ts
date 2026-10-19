// Centralised mapping of farm assets to local files under /public.
// Breeds/products use descriptive, named photos; anonymous ranch
// shots are reserved for slideshows and background imagery.

export const LOGO = "/logo.png"

const img = (p: string) => `/images/${p}`

// ── Background / hero / section imagery (authentic ranch shots) ──
export const HERO_IMAGE = img("brahmangreen.jpeg")
export const RANCH_WIDE = img("brahmangreen.jpeg")
export const RANCH_PANO = img("WhatsApp Image 2026-08-10 at 11.55.26 (1).jpeg")
export const FIELD_DAY = img("WhatsApp Image 2026-08-10 at 11.56.50.jpeg")
export const HERD_FIELD = img("WhatsApp Image 2026-08-10 at 11.55.21.jpeg")

// Authentic ranch photos — used in slideshows/galleries.
export const RANCH_GALLERY: string[] = [
  img("WhatsApp Image 2026-08-10 at 11.55.21.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.22.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.23.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.42.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.43.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.44 (1).jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.24.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.24 (1).jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.25.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.26.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.26 (1).jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.27.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.28.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.28 (1).jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.29.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.29 (1).jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.30 (1).jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.31 (1).jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.32.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.32 (1).jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.33.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.34.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.34 (1).jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.42 (1).jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.43 (1).jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.45.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.45 (1).jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.48.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.49.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.50 (1).jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.51.jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.51 (2).jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.56.52 (1).jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.12 (1).jpeg"),
  img("WhatsApp Image 2026-08-10 at 11.55.13.jpeg"),
]

// ── Per-breed photos (matched by breed name, case-insensitive) ──
// Uses descriptive filenames so each breed is unmistakable.
export const BREED_IMAGES: Record<string, string> = {
  boran: img("boran bulls.jpg"),
  bonsmara: img("bonsamara bull.jpg"),
  brahman: img("brahman cows.jpg"),
  "brahman cow": img("brahman cow and calf.jpg"),
  "brahman herd": img("brahman cows 2.jpg"),
  angus: img("angus bull.jpg"),
  nelore: img("nelore bull.jpg"),
  brafford: img("brafford bull.jpg"),
  simmental: img("simentel.jpeg"),
  "simmental cross": img("simtel calf.jpeg"),
  friesian: img("74cc74d0d4167756df44a664aa89a11d.jpg"),
  sahiwal: img("Sahiwal-Cattle-Breed.jpg"),
  "sahiwal cow": img("Sahiwal-Cow.webp"),
  "sahiwal bull": img("sahiwal-bull-500x500.webp"),
  "sahiwal calves": img("sahiwal calves.jpeg"),
  "sahiwal calves 2": img("sahiwal calves 2.jpeg"),
  boer: img("boer goat.jpg"),
  galla: img("somali-goats.jpg"),
  somali: img("re_goats_waskosims_rock_0.jpg"),
  "somali goat": img("re_goats_waskosims_rock_0.jpg"),
  "boer x galla": img("goats.jpg"),
  dorper: img("Dorper-sheep-800x534.jpg"),
  "dorper herd": img("dorper-herd-sire.webp"),
  "red maasai": img("Sheep1-1jyf79s.jpg"),
  "red maasai x dorper": img("dorper lambs.jpg"),
  "dorper ram": img("dorper ram.jpg"),
  "dorper ewe": img("beautiful-female-dorper-sheep-on-600nw-2455116755.webp"),
  poultry: img("chicken 1.jpg"),
  chicken: img("chicken 1.jpg"),
  chickens: img("chicken 4.jpg"),
  kienyeji: img("chicken 2.jpg"),
  kuroiler: img("Chicken 7.jpg"),
  "kuroiler / improved kienyeji": img("chicken 1.jpg"),
  "improved kienyeji": img("chicken 3.jpg"),
  "indigenous kienyeji rooster": img("Chicken 7.jpg"),
  "free-range layer flock": img("chicken 4.jpg"),
  rooster: img("chicken 5.jpg"),
  layer: img("chicken 6.jpg"),
  broiler: img("chicken 1.jpg"),
}

// ── Species fallbacks (by species.name) ─────────────────────
export const SPECIES_IMAGES: Record<string, string> = {
  "Beef Cattle": img("boran bulls.jpg"),
  "Dairy Cattle": img("sahiwal cow.jpg"),
  Goats: img("boer goat.jpg"),
  Sheep: img("dorper ram.jpg"),
  Poultry: img("chicken 1.jpg"),
  Chickens: img("chicken 1.jpg"),
  Apiary: img("Bee Hive 2.jpg"),
  Bees: img("Bee Hive 2.jpg"),
}

// ── Product category fallbacks (by ProductCategory.name) ───
export const CATEGORY_IMAGES: Record<string, string> = {
  "Beef Cuts": img("beef cuts.jpg"),
  "Dairy Products": img("Milk 1.jpg"),
  Milk: img("Milk 2.jpg"),
  "Whole Milk": img("Milk 3.jpg"),
  "Sahiwal Milk": img("Milk 4.jpg"),
  "Gir Milk": img("Gir Milk.jpg"),
  "Calf Milk": img("Calve Milk.jpg"),
  "Milk and Calf": img("Milk and Calf.jpg"),
  Ghee: img("Ghee 1.jpg"),
  "Clarified Butter": img("Ghee 2.jpg"),
  "Grass-Fed Ghee": img("Ghee 3.jpg"),
  Tallow: img("Tallow 1.jpg"),
  "Beef Tallow": img("Beef Tallow 1.jpg"),
  "Grass-Fed Tallow": img("Tallow 2.jpg"),
  "Goat Meat": img("boer goat.jpg"),
  "Sheep Meat": img("dorper lambs.jpg"),
  "Lamb Chops": img("lamb chops.jpg"),
  "Lamb Chops 2": img("lamb chops 2.jpg"),
  Vegetables: img("cabbages.jpeg"),
  Fruits: img("pineapples.jpg"),
  "Poultry & Eggs": img("chicken 1.jpg"),
  Poultry: img("chicken 1.jpg"),
  Eggs: img("eggs.jpg"),
  "Honey & Apiary": img("Honey 1.jpg"),
  Apiary: img("Honey 1.jpg"),
  Honey: img("Honey 4.jpg"),
  "Raw Honey": img("Honey 2.jpg"),
  "Acacia Honey": img("Honey 3.jpg"),
  "Ranch Box": img("vegetables.jpg"),
}

// ── Named produce photos, for slideshow tiles on the barn ──
export const PRODUCE_SLIDESHOW: { src: string; label: string }[] = [
  { src: img("chicken 1.jpg"), label: "Free-Range Pasture Chicken" },
  { src: img("eggs.jpg"), label: "Farm Fresh Free-Range Eggs" },
  { src: img("Honey 1.jpg"), label: "Pure Acacia Honey" },
  { src: img("Honey 2.jpg"), label: "Seasonal Harvest Honey" },
  { src: img("Honey 3.jpg"), label: "Raw Acacia Honey" },
  { src: img("Honey 4.jpg"), label: "Raw Rangeland Honey" },
  { src: img("Milk 1.jpg"), label: "Fresh Sahiwal Whole Milk" },
  { src: img("Milk 2.jpg"), label: "Farm-Fresh Bottled Milk" },
  { src: img("Milk 3.jpg"), label: "Full-Cream Whole Milk" },
  { src: img("Milk 4.jpg"), label: "Sahiwal A2 Milk" },
  { src: img("Milk 5.jpg"), label: "Chilled Fresh Milk" },
  { src: img("Milk and Calf.jpg"), label: "Milk & Calf — Lactating Herd" },
  { src: img("Gir Milk.jpg"), label: "Gir Breed A2 Milk" },
  { src: img("Calve Milk.jpg"), label: "Calf-Share Raw Milk" },
  { src: img("Ghee 1.jpg"), label: "Grass-Fed Sahiwal Ghee" },
  { src: img("Ghee 2.jpg"), label: "Artisan Clarified Butter" },
  { src: img("Ghee 3.jpg"), label: "Pure Bilona Ghee" },
  { src: img("Ghee 4.jpg"), label: "Golden Ranch Ghee" },
  { src: img("Ghee 5.jpg"), label: "Small-Batch Ghee" },
  { src: img("Tallow 1.jpg"), label: "Grass-Fed Beef Tallow" },
  { src: img("Tallow 2.jpg"), label: "Raw Beef Tallow" },
  { src: img("Tallow 3.jpg"), label: "Rendered Ranch Tallow" },
  { src: img("Beef Tallow 1.jpg"), label: "Pasture-Raised Beef Tallow" },
  { src: img("Beef Tallow 2.jpg"), label: "Cold-Pressed Beef Tallow" },
  { src: img("Chicken 7.jpg"), label: "Indigenous Kienyeji Rooster" },
  { src: img("cabbages.jpeg"), label: "Organic Cabbages" },
  { src: img("carrots.jpg"), label: "Sweet Farm Carrots" },
  { src: img("red onions.jpg"), label: "Red Creole Onions" },
  { src: img("garlic.jpg"), label: "Heritage Garlic" },
  { src: img("tomatoes.jpg"), label: "Vine-Ripened Tomatoes" },
  { src: img("ripe tomatoes.jpg"), label: "Ripe Plum Tomatoes" },
  { src: img("cucumber.jpg"), label: "Crisp Cucumbers" },
  { src: img("bell pepper.jpg"), label: "Green Bell Peppers" },
  { src: img("green chillies.jpg"), label: "Green Chillies" },
  { src: img("chillies.jpg"), label: "Bird's Eye Chillies" },
  { src: img("beetroots'.jpg"), label: "Organic Beetroots" },
  { src: img("maize.jpeg"), label: "Sun-Dried Maize" },
  { src: img("maize fields.jpeg"), label: "Maize Fields" },
  { src: img("maize hill.jpeg"), label: "Maize Harvest Hill" },
  { src: img("maize sprinkled.jpeg"), label: "Drying Maize" },
  { src: img("pickup maize.jpeg"), label: "Maize Collection" },
  { src: img("apples.jpg"), label: "Crisp Orchard Apples" },
  { src: img("pineapples.jpg"), label: "Sweet Pineapples" },
  { src: img("watermelon.jpg"), label: "Sweet Crimson Watermelon" },
  { src: img("grapes.jpg"), label: "Vineyard Grapes" },
  { src: img("cherries.jpg"), label: "Sweet Cherries" },
  { src: img("strawberry.jpg"), label: "Highland Strawberries" },
  { src: img("pixies.jpg"), label: "Seedless Pixie Oranges" },
  { src: img("plams.jpg"), label: "Sweet Plums" },
  { src: img("grass fed beef.jpg"), label: "Grass-Fed Beef" },
  { src: img("prime beef.jpg"), label: "Prime Aged Beef" },
  { src: img("lamb chops.jpg"), label: "Dorper Lamb Chops" },
  { src: img("lamb chops 2.jpg"), label: "Rack of Lamb" },
  { src: img("grilled lamb chops.jpg"), label: "Grilled Lamb Chops" },
]

// ── Named livestock photos, for breed-page slideshow ──────
export const LIVESTOCK_SLIDESHOW: { src: string; label: string }[] = [
  { src: img("boran bulls.jpg"), label: "Boran Bulls" },
  { src: img("boran cow.jpg"), label: "Boran Cow" },
  { src: img("boran heifers.jpg"), label: "Boran Heifers" },
  { src: img("bonsamara bull.jpg"), label: "Bonsmara Bull" },
  { src: img("brahman cows.jpg"), label: "Brahman Cows" },
  { src: img("brahman cows 2.jpg"), label: "Brahman Cow Herd" },
  { src: img("brahman cow and calf.jpg"), label: "Brahman Cow & Calf" },
  { src: img("brahmangreen.jpeg"), label: "Pastoral Brahman Herd" },
  { src: img("angus bull.jpg"), label: "Angus Bull" },
  { src: img("nelore bull.jpg"), label: "Nelore Bull" },
  { src: img("brafford bull.jpg"), label: "Brafford Bull" },
  { src: img("simentel.jpeg"), label: "Simmental Cattle" },
  { src: img("sahiwal-bull-500x500.webp"), label: "Sahiwal Stud Bull" },
  { src: img("Sahiwal-Cattle-Breed.jpg"), label: "Sahiwal Breed Herd" },
  { src: img("Sahiwal-Cow.webp"), label: "Sahiwal Cow" },
  { src: img("sahiwal calves.jpeg"), label: "Sahiwal Calves" },
  { src: img("sahiwal calves 2.jpeg"), label: "Sahiwal Calves at Pasture" },
  { src: img("boer goat.jpg"), label: "Boer Goat" },
  { src: img("boer.jpg"), label: "Boer Buck" },
  { src: img("somali-goats.jpg"), label: "Galla Goats" },
  { src: img("re_goats_waskosims_rock_0.jpg"), label: "Waskosims Goat Herd" },
  { src: img("goats.jpg"), label: "The Goat Herd" },
  { src: img("Dorper-sheep-800x534.jpg"), label: "Dorper Sheep Flock" },
  { src: img("dorper-herd-sire.webp"), label: "Dorper Herd Sire" },
  { src: img("dorper ram.jpg"), label: "Dorper Ram" },
  { src: img("dorper lambs.jpg"), label: "Dorper Lambs" },
  { src: img("Sheep1-1jyf79s.jpg"), label: "Red Maasai Sheep" },
  { src: img("chicken 1.jpg"), label: "Free-Range Poultry Flock" },
  { src: img("Chicken 7.jpg"), label: "Improved Kienyeji Rooster" },
  { src: img("chicken 4.jpg"), label: "Pasture-Raised Chickens" },
  { src: img("Bee Hive 2.jpg"), label: "Rangeland Langstroth Apiary" },
  { src: img("Bee Hive 3.jpg"), label: "Ranch Meadow Hives" },
  { src: img("Bee Hive 4.jpg"), label: "Meadow Bee Hives" },
  { src: img("Bee Hive 5.jpg"), label: "Apiary Harvest Setup" },
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
