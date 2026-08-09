export type UserRole = "ADMIN" | "CUSTOMER" | "PARTNER_FARMER" | "INVESTOR"
export type Gender = "MALE" | "FEMALE"
export type LivestockStatus = "AVAILABLE" | "RESERVED" | "SOLD" | "BREEDING_STOCK"
export type OrderType = "LIVESTOCK" | "PRODUCT" | "MIXED"
export type OrderStatus = "PENDING" | "CONFIRMED" | "DEPOSIT_PAID" | "PAID" | "PROCESSING" | "READY" | "DELIVERED" | "CANCELLED"
export type SubscriptionFreq = "WEEKLY" | "BIWEEKLY" | "MONTHLY"
export type SubscriptionStatus = "ACTIVE" | "PAUSED" | "CANCELLED"
export type ApplicationStatus = "RECEIVED" | "REVIEWING" | "SHORTLISTED" | "INTERVIEWED" | "OFFERED" | "REJECTED"
export type VisitStatus = "PENDING" | "CONFIRMED" | "CANCELLED"
export type PartnerStatus = "PENDING" | "APPROVED" | "ACTIVE" | "SUSPENDED"

export interface NavItem {
  label: string
  href: string
  children?: NavItem[]
}

export interface BreedSummary {
  id: string
  name: string
  purpose: string
  origin: string
  image: string | null
  pricePerHead: number
  inStock: number
  species: { name: string }
}

export interface ProductSummary {
  id: string
  name: string
  slug: string
  price: number
  unit: string
  image: string | null
  inStock: boolean
  category: { name: string }
}

export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  unit?: string
  image?: string | null
  type: "product" | "breed"
}
