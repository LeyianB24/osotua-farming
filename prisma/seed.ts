/* eslint-disable no-console */
import { PrismaClient, UserRole } from "@prisma/client"
import { hashPassword } from "../src/lib/password"

const prisma = new PrismaClient()

// All image values are paths served from /public. Descriptive, named
// photos so each breed/product is unmistakable.
const img = (p: string) => `/images/${p}`

const LOGO_URL = "/logos/Rooted in Tradition, Growing with Nature (1).png"

// ── Species ────────────────────────────────────────────────
const SPECIES = [
  { name: "Beef Cattle", description: "Beef breeds raised for premium meat production on the Kajiado rangelands." },
  { name: "Dairy Cattle", description: "Dairy breeds selected for milk yield and climate resilience." },
  { name: "Goats", description: "Meat and dual-purpose goats thrives in semi-arid conditions." },
  { name: "Sheep", description: "Fat-tailed and meat sheep bred for the East African market." },
  { name: "Poultry", description: "Free-range indigenous and dual-purpose improved poultry flock." },
]


// ── Breeds keyed by species name ───────────────────────────
const BREEDS: Record<string, Array<{
  name: string
  purpose: string
  description: string
  origin: string
  maleWeight: string
  femaleWeight: string
  image: string
  pricePerHead: number
  inStock: number
  featured: boolean
}>> = {
  "Beef Cattle": [
    {
      name: "Boran",
      purpose: "Beef",
      description:
        "A hardy indigenous African zebu breed evolved over centuries on the rangelands. Bos indicus genetics give it heat tolerance, tick resistance, and excellent forage conversion. Boran beef is finely marbled, tender, and uniquely flavoured — the cornerstone of our beef enterprise.",
      origin: "East Africa (Kenya)",
      maleWeight: "700–850 kg",
      femaleWeight: "450–550 kg",
      image: img("boran bulls.jpg"),
      pricePerHead: 45000,
      inStock: 12,
      featured: true,
    },
    {
      name: "Bonsmara",
      purpose: "Beef",
      description:
        "A South African composite of Afrikaner, Hereford, and Shorthorn — the only breed worldwide scientifically developed and authenticated at a research station. Exceptional beef quality, calm temperament, and excellent adaptability to African conditions.",
      origin: "South Africa",
      maleWeight: "750–900 kg",
      femaleWeight: "500–620 kg",
      image: img("bonsamara bull.jpg"),
      pricePerHead: 52000,
      inStock: 8,
      featured: true,
    },
    {
      name: "Brahman",
      purpose: "Beef",
      description:
        "An American composite of Indian Gir, Guzerat, and Nellore genetics, Brahman cattle thrive in hot, humid conditions and are prized for hybrid vigour when crossed with indigenous breeds.",
      origin: "United States (Indian origin)",
      maleWeight: "800–1,100 kg",
      femaleWeight: "500–700 kg",
      image: img("brahman cows.jpg"),
      pricePerHead: 48000,
      inStock: 6,
      featured: false,
    },
    {
      name: "Simmental Cross",
      purpose: "Beef",
      description:
        "A crossbred beef animal from Swiss Simmental genetics paired with indigenous zebu for fast growth, high carcass yield, and excellent maternal traits. Ideal for commercial beef production in mixed pasture systems.",
      origin: "Switzerland × Kenya",
      maleWeight: "900–1,200 kg",
      femaleWeight: "600–750 kg",
      image: img("simentel.jpeg"),
      pricePerHead: 55000,
      inStock: 4,
      featured: false,
    },
  ],
  "Dairy Cattle": [
    {
      name: "Sahiwal",
      purpose: "Dual-purpose (milk & beef)",
      description:
        "One of the finest indigenous dairy zebu breeds. Resistant to ticks and heat, producing 2,000–3,000 kg of rich milk per lactation on forage alone. Sahiwal bulls are also sought after for beef crossings across East Africa.",
      origin: "Pakistan / India (now widespread in Kenya)",
      maleWeight: "500–600 kg",
      femaleWeight: "350–450 kg",
      image: img("sahiwal cow.jpg"),
      pricePerHead: 60000,
      inStock: 10,
      featured: true,
    },
    {
      name: "Friesian × Sahiwal",
      purpose: "Dairy",
      description:
        "A crossbred dairy animal combining Friesian milk yield with Sahiwal hardiness. Well-suited to Kajiado's climate and the backbone of our commercial dairy herd.",
      origin: "Kenyan crossbred",
      maleWeight: "600–750 kg",
      femaleWeight: "450–550 kg",
      image: img("74cc74d0d4167756df44a664aa89a11d.jpg"),
      pricePerHead: 58000,
      inStock: 7,
      featured: false,
    },
  ],
  Goats: [
    {
      name: "Boer",
      purpose: "Meat",
      description:
        "The world's premier meat goat — muscular, fast-growing, and docile. Our Boers are bred from South African genetics and thrive on the Kajiado browse.",
      origin: "South Africa",
      maleWeight: "90–150 kg",
      femaleWeight: "60–90 kg",
      image: img("boer goat.jpg"),
      pricePerHead: 18000,
      inStock: 20,
      featured: true,
    },
    {
      name: "Galla",
      purpose: "Meat",
      description:
        "An indigenous Kenyan goat perfectly adapted to arid conditions. Hardy, drought-resistant, and central to the Maasai pastoral economy.",
      origin: "Northern Kenya",
      maleWeight: "60–80 kg",
      femaleWeight: "40–55 kg",
      image: img("somali-goats.jpg"),
      pricePerHead: 12000,
      inStock: 25,
      featured: false,
    },
    {
      name: "Boer × Galla",
      purpose: "Meat",
      description:
        "A crossbred meat goat offering the size and growth of Boer with the hardiness of the indigenous Galla. Ideal for smallholder outgrowers and commercial ranches alike.",
      origin: "Kenyan crossbred",
      maleWeight: "80–110 kg",
      femaleWeight: "55–70 kg",
      image: img("boer.jpg"),
      pricePerHead: 15000,
      inStock: 15,
      featured: true,
    },
  ],
  Sheep: [
    {
      name: "Dorper",
      purpose: "Meat",
      description:
        "A South African composite of Dorset Horn and Persian Blackhead — a fast-growing, fat-tailed sheep prized for premium, lean meat. Dorpers lamb easily and adapt well to Kajiado's savannah.",
      origin: "South Africa",
      maleWeight: "90–110 kg",
      femaleWeight: "60–80 kg",
      image: img("Dorper-sheep-800x534.jpg"),
      pricePerHead: 22000,
      inStock: 14,
      featured: true,
    },
    {
      name: "Red Maasai × Dorper",
      purpose: "Meat",
      description:
        "A resilient cross preserving the indigenous Red Maasai's worm-resistance with the Dorper's growth. A practical choice for disease-prone rangeland.",
      origin: "Kenyan crossbred",
      maleWeight: "70–95 kg",
      femaleWeight: "50–65 kg",
      image: img("dorper lambs.jpg"),
      pricePerHead: 20000,
      inStock: 18,
      featured: false,
    },
  ],
  Poultry: [
    {
      name: "Kuroiler / Improved Kienyeji",
      purpose: "Dual-purpose (meat & eggs)",
      description:
        "Resilient, free-ranging dual-purpose poultry adapted to Kajiado rangelands. Fast-maturing with high egg production and rich, indigenous meat flavour.",
      origin: "Kenya / East Africa",
      maleWeight: "3.5–4.5 kg",
      femaleWeight: "2.5–3.2 kg",
      image: img("chickens.jpg"),
      pricePerHead: 1500,
      inStock: 80,
      featured: true,
    },
  ],
}


// ── Product categories ─────────────────────────────────────
const CATEGORIES: Array<{
  name: string
  slug: string
  image: string | null
}> = [
  { name: "Beef Cuts", slug: "beef-cuts", image: img("beef cuts.jpg") },
  { name: "Dairy Products", slug: "dairy-products", image: img("sahiwal cow.jpg") },
  { name: "Goat Meat", slug: "goat-meat", image: img("boer goat.jpg") },
  { name: "Sheep Meat", slug: "sheep-meat", image: img("dorper lambs.jpg") },
  { name: "Vegetables", slug: "vegetables", image: img("cabbages.jpeg") },
  { name: "Fruits", slug: "fruits", image: img("pineapples.jpg") },
  { name: "Ranch Box", slug: "ranch-box", image: img("vegetables.jpg") },
]

// ── Products keyed by category name ────────────────────────
const PRODUCTS: Record<string, Array<{
  name: string
  slug: string
  description: string
  price: number
  unit: string
  image: string
  inStock: boolean
  stockQty: number
  featured: boolean
}>> = {
  "Beef Cuts": [
    {
      name: "Boran Sirloin Steak",
      slug: "boran-sirloin-steak",
      description:
        "Dry-aged Boran sirloin, fully trimmed and portioned. Two steaks per pack. Distinctive, lightly marbled, pasture-raised beef from the Osotua rangelands.",
      price: 1250,
      unit: "500g pack",
      image: img("prime beef.jpg"),
      inStock: true,
      stockQty: 40,
      featured: true,
    },
    {
      name: "Braising Beef Cubes",
      slug: "braising-beef-cubes",
      description:
        "Lean beef cubes cut for stews and curries. Aged for tenderness, slow-cooks beautifully — a Kenyan table favourite.",
      price: 800,
      unit: "kg",
      image: img("beef cuts.jpg"),
      inStock: true,
      stockQty: 30,
      featured: false,
    },
  ],
  "Dairy Products": [
    {
      name: "Farm Fresh Raw Milk",
      slug: "farm-fresh-raw-milk",
      description:
        "Unpasteurised whole milk from our Sahiwal × Friesian herd. Best within 48 hours — chill on delivery.",
      price: 120,
      unit: "litre",
      image: img("sahiwal cow.jpg"),
      inStock: true,
      stockQty: 60,
      featured: true,
    },
    {
      name: "Artisan Maasai Ghee",
      slug: "artisan-maasai-ghee",
      description:
        "Traditional cultured ghee, hand-churned in the Maasai style. Rich, nutty, golden — perfect for high-heat cooking.",
      price: 950,
      unit: "350g jar",
      image: img("sahiwal bull.jpg"),
      inStock: true,
      stockQty: 25,
      featured: false,
    },
  ],
  "Goat Meat": [
    {
      name: "Whole Boer Goat (Dressed)",
      slug: "whole-boer-goat-dressed",
      description:
        "A whole Boer goat, dressed and ready. Approx. 18–22 kg dressed weight. Serves 25+; ideal for ceremonies and nyama choma parties.",
      price: 8500,
      unit: "whole",
      image: img("boer goat.jpg"),
      inStock: true,
      stockQty: 8,
      featured: true,
    },
    {
      name: "Goat Mbuzi Mix",
      slug: "goat-mbuzi-mix",
      description:
        "A mixed cut pack: ribs, leg, shoulder. Marinate, grill, or slow-roast with rosemary and garlic.",
      price: 1100,
      unit: "kg",
      image: img("meat.jpg"),
      inStock: true,
      stockQty: 35,
      featured: false,
    },
  ],
  "Sheep Meat": [
    {
      name: "Dorper Lamb Leg",
      slug: "dorper-lamb-leg",
      description:
        "A bone-in Dorper lamb leg — premium roasting cut. Rub with herbs, slow-roast four hours. Feeds 6–8.",
      price: 2200,
      unit: "2.5kg leg",
      image: img("lamb chops.jpg"),
      inStock: true,
      stockQty: 15,
      featured: false,
    },
  ],
  Vegetables: [
    {
      name: "Ranch Garden Spinach",
      slug: "ranch-garden-spinach",
      description:
        "Pesticide-free spinach grown on the ranch's drip-irrigated kitchen garden. Harvested the morning of delivery.",
      price: 80,
      unit: "500g bunch",
      image: img("cabbages.jpeg"),
      inStock: true,
      stockQty: 50,
      featured: true,
    },
    {
      name: "Heritage Tomatoes",
      slug: "heritage-tomatoes",
      description:
        "Vine-ripened heritage tomatoes — sun-grown, sweet, and imperfect. Perfect for salads and sauces.",
      price: 250,
      unit: "kg",
      image: img("ripe tomatoes.jpg"),
      inStock: true,
      stockQty: 40,
      featured: false,
    },
  ],
  Fruits: [
    {
      name: "Seasonal Fruit Box",
      slug: "seasonal-fruit-box",
      description:
        "A 5kg mix of in-season orchard fruit — mangoes, papayas, bananas, and citrus depending on the harvest.",
      price: 1500,
      unit: "5kg box",
      image: img("pineapples.jpg"),
      inStock: true,
      stockQty: 20,
      featured: true,
    },
  ],
  "Ranch Box": [
    {
      name: "The Osotua Ranch Box",
      slug: "the-osotua-ranch-box",
      description:
        "A curated weekly box: 2kg beef cuts, 1kg goat, 2 litres milk, seasonal vegetables, and a fruit selection. Subscribe for weekly, fortnightly, or monthly delivery.",
      price: 4200,
      unit: "weekly box",
      image: img("vegetables.jpg"),
      inStock: true,
      stockQty: 99,
      featured: true,
    },
  ],
}

async function main() {
  console.log("→ Seeding Osotua Farming database…")

  // Pass 0: Users (admin + several demo users)
  const USERS: Array<{
    name: string
    email: string
    phone: string
    password: string
    role: UserRole
  }> = [
    { name: "Farm Administrator",  email: "admin@osotuafarming.co.ke", phone: "+254700000000", password: "Admin1234!",   role: "ADMIN" },
    { name: "Farm Operations",     email: "admin@osotua.co.ke",        phone: "+254700000001", password: "Admin1234!",   role: "ADMIN" },
    { name: "Joyce Wambui",        email: "operator@osotua.co.ke",      phone: "+254711000111", password: "Operator12!", role: "ADMIN" },
    { name: "Daniel Otieno",       email: "customer@osotua.co.ke",      phone: "+254722000222", password: "Customer1!", role: "CUSTOMER" },
    { name: "Mary Chebet",         email: "user2@osotua.co.ke",        phone: "+254733000333", password: "Customer1!", role: "CUSTOMER" },
    { name: "Samuel Njoroge",      email: "partner@osotua.co.ke",      phone: "+254744000444", password: "Partner123!", role: "PARTNER_FARMER" },
    { name: "Grace Mutua",         email: "investor@osotua.co.ke",     phone: "+254755000555", password: "Investor1!", role: "INVESTOR" },
  ]


  for (const u of USERS) {
    const existing = await prisma.user.findUnique({ where: { email: u.email } })
    const password = await hashPassword(u.password)
    if (existing) {
      await prisma.user.update({ where: { id: existing.id }, data: { name: u.name, phone: u.phone, role: u.role, password } })
    } else {
      await prisma.user.create({ data: { name: u.name, email: u.email, phone: u.phone, role: u.role, password } })
    }
  }
  console.log(`  Users upserted: ${USERS.length}`)

  // Pass 1: Species
  for (const s of SPECIES) {
    await prisma.species.upsert({
      where: { name: s.name },
      update: { description: s.description },
      create: s,
    })
  }
  const speciesRecords = await prisma.species.findMany()
  console.log(`  Species upserted: ${speciesRecords.length}`)

  // Pass 2: Breeds
  let breedCount = 0
  for (const [speciesName, list] of Object.entries(BREEDS)) {
    const species = speciesRecords.find((s) => s.name === speciesName)!
    for (const b of list) {
      const existing = await prisma.breed.findFirst({
        where: { name: b.name, speciesId: species.id },
      })
      if (existing) {
        await prisma.breed.update({
          where: { id: existing.id },
          data: { ...b, speciesId: species.id },
        })
      } else {
        await prisma.breed.create({
          data: { ...b, speciesId: species.id },
        })
      }
      breedCount++
    }
  }
  console.log(`  Breeds upserted: ${breedCount}`)

  // Pass 3: Categories
  for (const c of CATEGORIES) {
    const existing = await prisma.productCategory.findUnique({ where: { slug: c.slug } })
    if (existing) {
      await prisma.productCategory.update({ where: { id: existing.id }, data: { name: c.name, image: c.image } })
    } else {
      await prisma.productCategory.create({ data: { name: c.name, slug: c.slug, image: c.image } })
    }
  }
  const catRecords = await prisma.productCategory.findMany()
  console.log(`  Product categories upserted: ${catRecords.length}`)

  // Pass 4: Products
  let productCount = 0
  for (const [catName, list] of Object.entries(PRODUCTS)) {
    const cat = catRecords.find((c) => c.name === catName)
    if (!cat) continue
    for (const p of list) {
      const existing = await prisma.product.findUnique({ where: { slug: p.slug } })
      if (existing) {
        await prisma.product.update({
          where: { id: existing.id },
          data: { ...p, categoryId: cat.id },
        })
      } else {
        await prisma.product.create({ data: { ...p, categoryId: cat.id } })
      }
      productCount++
    }
  }
  console.log(`  Products upserted: ${productCount}`)
  console.log("✓ Seed complete.")
  console.log(`  Logo path: ${LOGO_URL}`)
}

main()
  .catch((e) => {
    console.error("Seed failed:", e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
