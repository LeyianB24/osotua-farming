/* eslint-disable no-console */
import {
  PrismaClient,
  UserRole,
  Gender,
  LivestockStatus,
  NewCatchStatus,
  ImportStatus,
  SaleChannel,
  SaleStatus,
  VisitStatus,
  PartnerStatus,
  OrderType,
  OrderStatus,
  SubscriptionFreq,
  SubscriptionStatus,
} from "@prisma/client"
import { hashPassword } from "../src/lib/password"

const prisma = new PrismaClient()

const img = (p: string) => `/images/${p}`
const LOGO_URL = "/logos/Rooted in Tradition, Growing with Nature (1).png"

// ── Species ────────────────────────────────────────────────
const SPECIES = [
  { name: "Beef Cattle", description: "Beef breeds raised for premium meat production on the Kajiado rangelands." },
  { name: "Dairy Cattle", description: "Dairy breeds selected for milk yield and climate resilience." },
  { name: "Goats", description: "Meat and dual-purpose goats thriving in semi-arid conditions." },
  { name: "Sheep", description: "Fat-tailed and meat sheep bred for the East African market." },
  { name: "Poultry", description: "Free-range indigenous and dual-purpose improved poultry flock." },
]

// ── Breeds ─────────────────────────────────────────────────
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
        "A hardy indigenous African zebu breed evolved over centuries on the rangelands. Bos indicus genetics give it heat tolerance, tick resistance, and excellent forage conversion. Boran beef is finely marbled, tender, and uniquely flavoured.",
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
        "A South African composite of Afrikaner, Hereford, and Shorthorn — scientifically developed for exceptional beef quality, calm temperament, and adaptability.",
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
        "Prized for hybrid vigour, heat tolerance, and exceptional growth rates on pastoral rangelands.",
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
        "Fast growth, high carcass yield, and excellent maternal traits for commercial beef production.",
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
        "Fine indigenous dairy zebu breed. Heat and parasite resistant, producing rich high-butterfat milk on rangeland forage.",
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
        "Combines Friesian volume with Sahiwal resilience — perfect for commercial rangeland dairying.",
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
        "Premier global meat goat — muscular, fast-growing, docility, and exceptional feed conversion.",
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
        "Indigenous Kenyan goat adapted to arid climates. Hardy, drought-tolerant, and prolific.",
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
        "Crossbred meat goat combining Boer heavy muscling with Galla hardiness.",
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
        "Fast-growing, fat-tailed sheep prized for premium lean meat and effortless lambing on open pasture.",
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
        "Resilient cross preserving indigenous worm-resistance with Dorper meat yield.",
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
        "Resilient, free-ranging dual-purpose poultry adapted to Kajiado rangelands.",
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

// ── Categories ─────────────────────────────────────────────
const CATEGORIES = [
  { name: "Beef Cuts", slug: "beef-cuts", image: img("beef cuts.jpg") },
  { name: "Dairy Products", slug: "dairy-products", image: img("sahiwal cow.jpg") },
  { name: "Goat Meat", slug: "goat-meat", image: img("boer goat.jpg") },
  { name: "Sheep Meat", slug: "sheep-meat", image: img("dorper lambs.jpg") },
  { name: "Vegetables", slug: "vegetables", image: img("cabbages.jpeg") },
  { name: "Fruits", slug: "fruits", image: img("pineapples.jpg") },
  { name: "Ranch Box", slug: "ranch-box", image: img("vegetables.jpg") },
]

// ── Products ───────────────────────────────────────────────
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
      description: "Dry-aged Boran sirloin, portioned 2 steaks per pack. Pasture-raised tender beef.",
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
      description: "Lean aged beef cubes cut for stews and rich slow-cooked broths.",
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
      description: "Unpasteurised whole milk from our Sahiwal herd. High natural butterfat content.",
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
      description: "Hand-churned cultured ghee in traditional Maasai style. Golden, nutty aroma.",
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
      description: "Whole dressed Boer goat (approx. 18–22 kg). Ideal for celebrations & nyama choma.",
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
      description: "Mixed cuts pack: ribs, leg, and shoulder for grilling or stews.",
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
      description: "Bone-in Dorper lamb leg. Prime roasting joint feeding 6–8 people.",
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
      description: "Organic drip-irrigated spinach harvested fresh morning of dispatch.",
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
      description: "Sun-ripened vine tomatoes bursting with heirloom sweet flavour.",
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
      description: "5kg crate of fresh in-season orchard harvest (mangoes, papayas, citrus).",
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
      description: "Curated weekly hamper: 2kg beef, 1kg goat, 2L fresh milk, seasonal veggies & fruit.",
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
  console.log("→ Seeding Osotua Farming database with comprehensive ecosystem data…")

  // 1. Users
  const USERS = [
    { name: "Farm Administrator", email: "admin@osotuafarming.co.ke", phone: "+254700000000", password: "Admin1234!", role: UserRole.ADMIN },
    { name: "Farm Operations", email: "admin@osotua.co.ke", phone: "+254700000001", password: "Admin1234!", role: UserRole.ADMIN },
    { name: "Joyce Wambui", email: "operator@osotua.co.ke", phone: "+254711000111", password: "Operator12!", role: UserRole.ADMIN },
    { name: "Daniel Otieno", email: "customer@osotua.co.ke", phone: "+254722000222", password: "Customer1!", role: UserRole.CUSTOMER },
    { name: "Mary Chebet", email: "user2@osotua.co.ke", phone: "+254733000333", password: "Customer1!", role: UserRole.CUSTOMER },
    { name: "Samuel Njoroge", email: "partner@osotua.co.ke", phone: "+254744000444", password: "Partner123!", role: UserRole.PARTNER_FARMER },
    { name: "Grace Mutua", email: "investor@osotua.co.ke", phone: "+254755000555", password: "Investor1!", role: UserRole.INVESTOR },
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
  console.log(`  ✓ Users upserted: ${USERS.length}`)

  // 2. Species
  for (const s of SPECIES) {
    await prisma.species.upsert({
      where: { name: s.name },
      update: { description: s.description },
      create: s,
    })
  }
  const speciesRecords = await prisma.species.findMany()
  console.log(`  ✓ Species upserted: ${speciesRecords.length}`)

  // 3. Breeds
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
  console.log(`  ✓ Breeds upserted: ${breedCount}`)

  // 4. Categories
  for (const c of CATEGORIES) {
    const existing = await prisma.productCategory.findUnique({ where: { slug: c.slug } })
    if (existing) {
      await prisma.productCategory.update({ where: { id: existing.id }, data: { name: c.name, image: c.image } })
    } else {
      await prisma.productCategory.create({ data: { name: c.name, slug: c.slug, image: c.image } })
    }
  }
  const catRecords = await prisma.productCategory.findMany()
  console.log(`  ✓ Product categories upserted: ${catRecords.length}`)

  // 5. Products
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
  console.log(`  ✓ Products upserted: ${productCount}`)

  const allBreeds = await prisma.breed.findMany()
  const allProducts = await prisma.product.findMany()
  const customerUser = await prisma.user.findUnique({ where: { email: "customer@osotua.co.ke" } })
  const maryUser = await prisma.user.findUnique({ where: { email: "user2@osotua.co.ke" } })

  // 6. Individual Livestock Herd (Tags & Weight)
  const boranBreed = allBreeds.find((b) => b.name === "Boran")
  const boerBreed = allBreeds.find((b) => b.name === "Boer")
  const sahiwalBreed = allBreeds.find((b) => b.name === "Sahiwal")
  const dorperBreed = allBreeds.find((b) => b.name === "Dorper")

  const LIVESTOCK_HERD = [
    { tagNumber: "OS-BOR-001", breedId: boranBreed?.id, gender: Gender.MALE, weight: 780, status: LivestockStatus.BREEDING_STOCK, notes: "Pedigree stud bull. Sire: Kajiado Pride." },
    { tagNumber: "OS-BOR-002", breedId: boranBreed?.id, gender: Gender.FEMALE, weight: 510, status: LivestockStatus.AVAILABLE, notes: "Heifer, 28 months, vaccinated." },
    { tagNumber: "OS-SAH-003", breedId: sahiwalBreed?.id, gender: Gender.FEMALE, weight: 440, status: LivestockStatus.AVAILABLE, notes: "Lactating dam, 14L/day average." },
    { tagNumber: "OS-BOE-004", breedId: boerBreed?.id, gender: Gender.MALE, weight: 115, status: LivestockStatus.AVAILABLE, notes: "Young buck with excellent conformation." },
    { tagNumber: "OS-DOR-005", breedId: dorperBreed?.id, gender: Gender.FEMALE, weight: 72, status: LivestockStatus.RESERVED, notes: "Ewe carrying twins." },
    { tagNumber: "OS-DOR-006", breedId: dorperBreed?.id, gender: Gender.MALE, weight: 95, status: LivestockStatus.AVAILABLE, notes: "Prime slaughter ram." },
  ]

  for (const l of LIVESTOCK_HERD) {
    if (!l.breedId) continue
    await prisma.livestock.upsert({
      where: { tagNumber: l.tagNumber },
      update: { weight: l.weight, status: l.status, notes: l.notes },
      create: {
        tagNumber: l.tagNumber,
        breedId: l.breedId,
        gender: l.gender,
        weight: l.weight,
        status: l.status,
        notes: l.notes,
        birthDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 2),
      },
    })
  }
  console.log(`  ✓ Livestock Herd registry seeded`)

  // 7. Stock Records
  for (const p of allProducts.slice(0, 4)) {
    await prisma.stock.create({
      data: {
        productId: p.id,
        name: p.name,
        unit: p.unit,
        quantity: p.stockQty,
        reorderAt: 10,
        note: "Barn Cold Room Shelf A",
      },
    })
  }
  console.log(`  ✓ Stock inventory records seeded`)

  // 8. Barn Dining Menus
  const MENUS = [
    {
      name: "Kajiado Nyama Choma Weekend Feast",
      slug: "kajiado-nyama-choma-weekend-feast",
      description: "Charcoal slow-roasted Boran beef ribs & Dorper lamb, accompanied by ugali, kachumbari, and sautéed greens.",
      price: 3200,
      servings: 4,
      image: img("meat.jpg"),
      available: true,
      weekOf: new Date(),
    },
    {
      name: "Pasture-to-Table Family Platter",
      slug: "pasture-to-table-family-platter",
      description: "Grilled Boer mbuzi cuts, roast farm potatoes, heritage tomato salad, and fresh artisan butter milk.",
      price: 4500,
      servings: 6,
      image: img("beef cuts.jpg"),
      available: true,
      weekOf: new Date(),
    },
  ]

  for (const m of MENUS) {
    await prisma.menu.upsert({
      where: { slug: m.slug },
      update: { price: m.price, servings: m.servings, available: m.available },
      create: {
        name: m.name,
        slug: m.slug,
        description: m.description,
        price: m.price,
        servings: m.servings,
        image: m.image,
        available: m.available,
        weekOf: m.weekOf,
      },
    })
  }
  console.log(`  ✓ Barn Dining Menus seeded`)

  // 9. Fresh Catches
  if (boranBreed) {
    await prisma.newCatch.create({
      data: {
        breedId: boranBreed.id,
        name: "Prime Dry-Aged Boran Ribeye Batch #44",
        quantity: 85,
        unit: "kg",
        price: 1800,
        status: NewCatchStatus.AGING,
        note: "Hanging in ranch dry-aging room at 2°C for 21 days.",
      },
    })
  }
  if (dorperBreed) {
    await prisma.newCatch.create({
      data: {
        breedId: dorperBreed.id,
        name: "Fresh Dorper Lamb Carcasses Batch #12",
        quantity: 12,
        unit: "carcass",
        price: 9500,
        status: NewCatchStatus.FRESH,
        note: "Morning slaughter from East Pasture flock.",
      },
    })
  }
  console.log(`  ✓ Fresh slaughter batches seeded`)

  // 10. Imports
  await prisma.import.upsert({
    where: { reference: "IMP-2026-081" },
    update: { status: ImportStatus.RECEIVED },
    create: {
      reference: "IMP-2026-081",
      supplierName: "Karoo Genetics South Africa",
      breedId: boerBreed?.id,
      productName: "Boer Breeding Bucks (Stud Line)",
      quantity: 5,
      unitPrice: 110000,
      totalValue: 550000,
      status: ImportStatus.RECEIVED,
      arrivedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      notes: "Quarantine completed at JKIA Livestock station. Healthy and in paddock 4.",
    },
  })
  console.log(`  ✓ Supplier Imports seeded`)

  // 11. Sales Ledger
  await prisma.sale.upsert({
    where: { reference: "SLS-2026-104" },
    update: { totalAmount: 90000 },
    create: {
      reference: "SLS-2026-104",
      breedId: boranBreed?.id,
      customerName: "Olarro Safari Lodge",
      customerPhone: "+254711888999",
      quantity: 2,
      unitPrice: 45000,
      totalAmount: 90000,
      channel: SaleChannel.WHOLESALE,
      status: SaleStatus.COMPLETED,
      paidAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      note: "Delivery to Maasai Mara airstrip logistics depot.",
    },
  })
  console.log(`  ✓ Sales Ledger seeded`)

  // 12. Careers / Jobs
  const JOBS = [
    {
      title: "Senior Rangeland Agronomist",
      department: "Agronomy & Pasture",
      type: "Full-time",
      location: "Kajiado Ranch (On-site)",
      description: "Lead rotational grazing strategies, fodder conservation, and soil microbiome revitalization across 1,200 acres.",
      requirements: "BSc/MSc in Agronomy or Range Management, 5+ years experience in semi-arid pasture ecosystems.",
      isOpen: true,
    },
    {
      title: "Pedigree Livestock Breeding Specialist",
      department: "Herd Health & Genetics",
      type: "Full-time",
      location: "Kajiado Ranch (On-site)",
      description: "Manage artificial insemination, pedigree studbook registration, and veterinary oversight for Boran cattle and Boer goats.",
      requirements: "Veterinary Medicine degree or Animal Genetics degree, demonstrated track record with registered studs.",
      isOpen: true,
    },
    {
      title: "Barn Store Logistics & E-Commerce Coordinator",
      department: "Commercial Operations",
      type: "Full-time",
      location: "Nairobi Hub / Kajiado",
      description: "Coordinate cold-chain fulfillment, customer deliveries, and direct-to-consumer farm box dispatches.",
      requirements: "Diploma/Degree in Supply Chain or Logistics, familiarity with Next.js e-commerce order workflows.",
      isOpen: true,
    },
  ]

  for (const j of JOBS) {
    const existing = await prisma.job.findFirst({ where: { title: j.title } })
    if (existing) {
      await prisma.job.update({ where: { id: existing.id }, data: j })
    } else {
      await prisma.job.create({ data: j })
    }
  }
  console.log(`  ✓ Careers & Job Postings seeded`)

  // 13. Blog & Stories
  const POSTS = [
    {
      title: "Why Boran Genetics Are the Future of African Regenerative Ranching",
      slug: "why-boran-genetics-are-the-future",
      excerpt: "How centuries of natural selection created a drought-hardy, parasite-resistant zebu capable of producing Michelin-grade marbling on pasture.",
      content: `The African Boran is not merely an indigenous survivor; it is an evolutionary masterpiece. For over a millennium, pastoralist communities across the Horn of Africa guided the selection of this magnificent zebu. Today at Osotua Farming, we blend traditional herd wisdom with modern genomics to produce breeding stock that excels under changing climatic conditions.\n\nOur Boran cattle thrive on natural savannah grasses, requiring zero artificial concentrates. Their thick, pigmented hides repel parasites, and their remarkable feed conversion ratio delivers nutrient-dense, flavorful beef with a low carbon footprint.`,
      coverImage: img("boran bulls.jpg"),
      category: "Breeding & Genetics",
      published: true,
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14),
    },
    {
      title: "From Pasture to Plate: The True Art of Cold-Room Dry Aging",
      slug: "pasture-to-plate-art-of-dry-aging",
      excerpt: "Unlocking deep umami flavours and silk-like tenderness through controlled humidity and temperature aging.",
      content: `Dry aging beef is a marriage of science and patience. Inside the Osotua ranch butchery, prime loins rest in a strictly controlled microclimate for 21 to 28 days. Natural enzymes break down muscle fibres, concentrating the natural savory flavours and creating an unforgettable dining experience.`,
      coverImage: img("prime beef.jpg"),
      category: "The Barn Store",
      published: true,
      publishedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
    },
  ]

  for (const p of POSTS) {
    await prisma.post.upsert({
      where: { slug: p.slug },
      update: { content: p.content, excerpt: p.excerpt, published: p.published },
      create: p,
    })
  }
  console.log(`  ✓ Blog Posts & Ranch Stories seeded`)

  // 14. Farm Visits
  await prisma.farmVisit.create({
    data: {
      fullName: "Dr. Evans Muli",
      email: "evans.muli@agrikenya.org",
      phone: "+254722554433",
      groupSize: 6,
      visitDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      purpose: "Ranch tour and appraisal of Boran breeding bull stock for our Machakos outgrower project.",
      status: VisitStatus.CONFIRMED,
    },
  })
  console.log(`  ✓ Farm Visit bookings seeded`)

  // 15. Partner Farmers
  await prisma.partnerFarmer.create({
    data: {
      fullName: "Samuel Njoroge",
      email: "partner@osotua.co.ke",
      phone: "+254744000444",
      location: "Kajiado North (Kimuka)",
      supplyType: "Vegetables & Fodder",
      status: PartnerStatus.ACTIVE,
    },
  })
  console.log(`  ✓ Partner Farmers seeded`)

  // 16. Customer Orders & Items
  if (customerUser && allProducts.length > 0) {
    const ranchBoxProduct = allProducts.find((p) => p.slug === "the-osotua-ranch-box") || allProducts[0]
    const steakProduct = allProducts.find((p) => p.slug === "boran-sirloin-steak") || allProducts[0]

    const demoOrder = await prisma.order.create({
      data: {
        userId: customerUser.id,
        customerName: customerUser.name || "Daniel Otieno",
        customerEmail: customerUser.email,
        customerPhone: customerUser.phone || "+254722000222",
        type: OrderType.PRODUCT,
        status: OrderStatus.CONFIRMED,
        totalAmount: 5450,
        paymentMethod: "MPESA",
        paymentRef: "MP-OSOTUA-998822",
        deliveryAddress: "Karen Hardy Estate, House #14, Nairobi",
        deliveryDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
        notes: "Please call gate security upon arrival.",
        items: {
          create: [
            {
              productId: ranchBoxProduct.id,
              quantity: 1,
              unitPrice: ranchBoxProduct.price,
              totalPrice: ranchBoxProduct.price,
            },
            {
              productId: steakProduct.id,
              quantity: 1,
              unitPrice: steakProduct.price,
              totalPrice: steakProduct.price,
            },
          ],
        },
      },
    })

    // 17. Subscription
    await prisma.subscription.create({
      data: {
        userId: customerUser.id,
        productId: ranchBoxProduct.id,
        frequency: SubscriptionFreq.WEEKLY,
        status: SubscriptionStatus.ACTIVE,
        nextDelivery: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
      },
    })
    console.log(`  ✓ Customer Orders & Subscriptions seeded`)
  }

  console.log("✓ Entire Osotua Ecosystem database seed complete!")
  console.log(`  Logo path: ${LOGO_URL}`)
}

main()
  .catch((e) => {
    console.error("Seed failed:", e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
