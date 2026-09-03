import { MetadataRoute } from "next"
import { prisma } from "@/lib/prisma"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXTAUTH_URL || "https://osotuafarming.co.ke"

  // Static marketing routes
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/breeds",
    "/barn",
    "/about",
    "/visit",
    "/invest",
    "/partners",
    "/careers",
    "/blog",
    "/contact",
    "/cart",
    "/checkout",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }))

  try {
    const [breeds, products, posts] = await Promise.all([
      prisma.breed.findMany({ select: { id: true, updatedAt: true } }),
      prisma.product.findMany({ select: { slug: true, updatedAt: true } }),
      prisma.post.findMany({ where: { published: true }, select: { slug: true, updatedAt: true } }),
    ])

    const breedRoutes: MetadataRoute.Sitemap = breeds.map((b) => ({
      url: `${baseUrl}/breeds/${b.id}`,
      lastModified: b.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }))

    const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
      url: `${baseUrl}/barn/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "daily" as const,
      priority: 0.8,
    }))

    const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))

    return [...staticRoutes, ...breedRoutes, ...productRoutes, ...postRoutes]
  } catch {
    return staticRoutes
  }
}
