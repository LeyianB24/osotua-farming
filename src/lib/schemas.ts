import { z } from "zod"

export const breedSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  speciesId: z.string().min(1, "Species is required"),
  purpose: z.string().min(1, "Purpose is required").max(80),
  description: z.string().min(1, "Description is required").max(4000),
  origin: z.string().min(1, "Origin is required").max(120),
  maleWeight: z.string().max(40).nullish(),
  femaleWeight: z.string().max(40).nullish(),
  image: z.string().url().max(500).nullish().or(z.literal("").transform(() => null)),
  pricePerHead: z.number().min(0, "Price must be positive").max(10_000_000),
  inStock: z.number().int().min(0).max(1_000_000).default(0),
  featured: z.boolean().default(false),
})

export const breedPatchSchema = breedSchema.partial()

export const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(160),
  slug: z.string().min(1).max(160).regex(/^[a-z0-9-]+$/, "Slug must be lowercase, hyphens or digits only"),
  categoryId: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required").max(4000),
  price: z.number().min(0).max(1_000_000),
  unit: z.string().min(1).max(40),
  image: z.string().url().max(500).nullish().or(z.literal("").transform(() => null)),
  inStock: z.boolean().default(true),
  stockQty: z.number().int().min(0).max(1_000_000).default(0),
  featured: z.boolean().default(false),
})

export const productPatchSchema = productSchema.partial()

export const livestockSchema = z.object({
  tagNumber: z.string().min(1, "Tag number is required").max(80),
  breedId: z.string().min(1, "Breed is required"),
  gender: z.enum(["MALE", "FEMALE"]),
  birthDate: z.coerce.date().nullish(),
  weight: z.number().min(0).max(5000).nullish(),
  status: z.enum(["AVAILABLE", "RESERVED", "SOLD", "BREEDING_STOCK"]).default("AVAILABLE"),
  notes: z.string().max(2000).nullish(),
})

export const livestockPatchSchema = livestockSchema.partial()

export const postSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, "Slug must be lowercase, hyphens or digits only"),
  excerpt: z.string().min(1, "Excerpt is required").max(500),
  content: z.string().min(1, "Content is required").max(50_000),
  coverImage: z.string().url().max(500).nullish().or(z.literal("").transform(() => null)),
  category: z.string().min(1).max(80).default("General"),
  published: z.boolean().default(false),
  publishedAt: z.coerce.date().nullish(),
})

export const postPatchSchema = postSchema.partial()

export const jobSchema = z.object({
  title: z.string().min(1, "Title is required").max(160),
  department: z.string().min(1).max(80),
  type: z.string().min(1).max(80),
  location: z.string().min(1).max(120),
  description: z.string().min(1).max(10_000),
  requirements: z.string().min(1).max(10_000),
  isOpen: z.boolean().default(true),
})

export const jobPatchSchema = jobSchema.partial()

export const jobApplicationSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(120),
  email: z.email("A valid email is required"),
  phone: z.string().min(1, "Phone is required").max(40),
  coverLetter: z.string().max(10_000).nullish(),
  cvUrl: z.string().url().max(500).nullish().or(z.literal("").transform(() => null)),
})

export const visitSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(120),
  email: z.email("A valid email is required"),
  phone: z.string().min(1, "Phone is required").max(40),
  groupSize: z.number().int().min(1).max(50).default(1),
  visitDate: z.coerce.date(),
  purpose: z.string().max(500).nullish(),
})

export const visitStatusSchema = z.object({
  status: z.enum(["PENDING", "CONFIRMED", "CANCELLED"]),
})

export const partnerSchema = z.object({
  fullName: z.string().min(1, "Full name is required").max(120),
  email: z.email("A valid email is required"),
  phone: z.string().min(1, "Phone is required").max(40),
  location: z.string().min(1, "Location is required").max(120),
  supplyType: z.string().min(1, "Supply type is required").max(120),
})

export const partnerStatusSchema = z.object({
  status: z.enum(["PENDING", "APPROVED", "ACTIVE", "SUSPENDED"]),
})

export const subscriptionSchema = z.object({
  userId: z.string().min(1),
  productId: z.string().min(1),
  frequency: z.enum(["WEEKLY", "BIWEEKLY", "MONTHLY"]),
  status: z.enum(["ACTIVE", "PAUSED", "CANCELLED"]).default("ACTIVE"),
  nextDelivery: z.coerce.date().nullish(),
})

export const subscriptionPatchSchema = z.object({
  frequency: z.enum(["WEEKLY", "BIWEEKLY", "MONTHLY"]).optional(),
  status: z.enum(["ACTIVE", "PAUSED", "CANCELLED"]).optional(),
  nextDelivery: z.coerce.date().nullish().optional(),
})

export const orderItemSchema = z.object({
  breedId: z.string().nullish(),
  productId: z.string().nullish(),
  quantity: z.number().int().min(1).max(1000),
  unitPrice: z.number().min(0).max(10_000_000),
  totalPrice: z.number().min(0).max(10_000_000),
}).refine((v) => !!v.breedId || !!v.productId, {
  message: "Either breedId or productId is required",
})

export const orderSchema = z.object({
  userId: z.string().nullish(),
  customerName: z.string().min(1, "Customer name is required").max(160),
  customerEmail: z.email("A valid customer email is required"),
  customerPhone: z.string().min(1, "Phone is required").max(40),
  type: z.enum(["LIVESTOCK", "PRODUCT", "MIXED"]).default("PRODUCT"),
  totalAmount: z.number().min(1, "Total amount must be positive").max(50_000_000),
  depositAmount: z.number().min(0).max(50_000_000).nullish(),
  paymentMethod: z.string().max(40).nullish(),
  paymentRef: z.string().max(120).nullish(),
  deliveryAddress: z.string().max(500).nullish(),
  deliveryDate: z.coerce.date().nullish(),
  notes: z.string().max(2000).nullish(),
  items: z.array(orderItemSchema).min(1, "At least one order item is required"),
})

export const orderStatusSchema = z.object({
  status: z.enum([
    "PENDING", "CONFIRMED", "DEPOSIT_PAID", "PAID",
    "PROCESSING", "READY", "DELIVERED", "CANCELLED",
  ]),
  paymentMethod: z.string().max(40).optional(),
  paymentRef: z.string().max(120).optional(),
})

export const contactSchema = z.object({
  name: z.string().min(1, "Full name is required").max(120),
  email: z.email("A valid email is required"),
  phone: z.string().max(40).nullish(),
  subject: z.string().min(1, "Subject is required").max(160),
  message: z.string().min(1, "Message is required").max(5000),
})

export const newsletterSchema = z.object({
  email: z.email("A valid email is required"),
})

export const registerSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.email("A valid email is required"),
  phone: z.string().max(40).nullish(),
  password: z
    .string()
    .min(12, "Password must be at least 12 characters long")
    .max(128)
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
})

export const uploadSchema = z.object({
  image: z.string().min(1, "Image data is required"),
  folder: z.string().max(60).optional(),
})

// ── STOCK ──────────────────────────────────────────────────

const stockBaseSchema = z.object({
  productId: z.string().min(1).nullish(),
  breedId: z.string().min(1).nullish(),
  name: z.string().min(1, "Name is required").max(160),
  unit: z.string().min(1, "Unit is required").max(40),
  quantity: z.number().int().min(0).max(1_000_000).default(0),
  reorderAt: z.number().int().min(0).max(1_000_000).default(0),
  note: z.string().max(2000).nullish(),
})

export const stockSchema = stockBaseSchema.refine((v) => !!v.productId || !!v.breedId || (!v.productId && !v.breedId), {
  message: "Stock can be standalone or linked to a product/breed",
})

export const stockPatchSchema = stockBaseSchema.partial()

// ── MENU ───────────────────────────────────────────────────

export const menuItemSchema = z.object({
  id: z.string().nullish(),
  name: z.string().min(1).max(160),
  quantity: z.string().min(1).max(80),
  note: z.string().max(500).nullish(),
})

export const menuSchema = z.object({
  name: z.string().min(1, "Name is required").max(160),
  slug: z.string().min(1).max(160).regex(/^[a-z0-9-]+$/, "Slug must be lowercase, hyphens or digits only"),
  description: z.string().min(1, "Description is required").max(4000),
  price: z.number().min(0).max(100_000),
  servings: z.number().int().min(1).max(1000).default(1),
  image: z.string().url().max(500).nullish().or(z.literal("").transform(() => null)),
  available: z.boolean().default(true),
  weekOf: z.coerce.date().nullish(),
  items: z.array(menuItemSchema).default([]),
})

export const menuPatchSchema = menuSchema.partial()

// ── NEW CATCH ──────────────────────────────────────────────

export const newCatchSchema = z.object({
  breedId: z.string().min(1).nullish(),
  name: z.string().min(1, "Name is required").max(160),
  quantity: z.number().int().min(1).max(10000).default(1),
  unit: z.string().min(1).max(40).default("kg"),
  price: z.number().min(0).max(1_000_000),
  status: z.enum(["FRESH", "AGING", "SOLD_OUT", "RESERVED"]).default("FRESH"),
  caughtAt: z.coerce.date().default(() => new Date()),
  note: z.string().max(2000).nullish(),
})

export const newCatchPatchSchema = newCatchSchema.partial()

// ── IMPORT ─────────────────────────────────────────────────

export const importSchema = z.object({
  reference: z.string().min(1, "Reference is required").max(80),
  supplierName: z.string().min(1, "Supplier name is required").max(160),
  breedId: z.string().min(1).nullish(),
  productName: z.string().max(160).nullish(),
  quantity: z.number().int().min(1).max(10000).default(1),
  unitPrice: z.number().min(0).max(10_000_000),
  totalValue: z.number().min(0).max(100_000_000),
  status: z.enum(["PENDING", "IN_TRANSIT", "RECEIVED", "CANCELLED"]).default("PENDING"),
  arrivedAt: z.coerce.date().nullish(),
  notes: z.string().max(2000).nullish(),
})

export const importPatchSchema = importSchema.partial()

// ── SALE ───────────────────────────────────────────────────

export const saleSchema = z.object({
  reference: z.string().min(1, "Reference is required").max(80),
  breedId: z.string().min(1).nullish(),
  productId: z.string().min(1).nullish(),
  customerName: z.string().min(1, "Customer name is required").max(160),
  customerPhone: z.string().max(40).nullish(),
  quantity: z.number().int().min(1).max(10000).default(1),
  unitPrice: z.number().min(0).max(10_000_000),
  totalAmount: z.number().min(0).max(100_000_000),
  channel: z.enum(["DIRECT", "ONLINE", "WHOLESALE", "RESTAURANT", "PARTNER"]).default("DIRECT"),
  status: z.enum(["PENDING", "COMPLETED", "REFUNDED", "CANCELLED"]).default("COMPLETED"),
  paidAt: z.coerce.date().default(() => new Date()),
  note: z.string().max(2000).nullish(),
})

export const salePatchSchema = saleSchema.partial()
