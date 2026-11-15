import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { imageForBreed } from "@/lib/images"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const breed = await prisma.breed.findUnique({
    where: { id: slug },
    include: { species: true },
  })
  if (!breed) return { title: "Breed Not Found" }

  const desc = breed.description.slice(0, 160)
  const image = breed.image ?? imageForBreed(breed.name, breed.species.name)

  return {
    title: `${breed.name} (${breed.species.name}) Pedigree Genetics`,
    description: desc,
    openGraph: {
      title: `${breed.name} — Osotua Pedigree Livestock`,
      description: desc,
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${breed.name} — Osotua Pedigree Livestock`,
      description: desc,
      images: image ? [image] : undefined,
    },
  }
}

export default async function BreedDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const breed = await prisma.breed.findUnique({
    where: { id: slug },
    include: { species: true },
  })

  if (!breed) notFound()

  const src = breed.image ?? imageForBreed(breed.name, breed.species.name)

  return (
    <div className="w-full min-h-screen bg-[#F5F0E8] text-[#1C1208] pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb */}
        <div className="font-mono text-[11px] text-[#8E7E70] tracking-wider uppercase mb-8 flex items-center gap-2">
          <Link href="/breeds" className="hover:text-[#C99A2E] transition-colors font-bold">
            Breeds
          </Link>
          <span>/</span>
          <span className="text-[#1C1208] font-semibold">{breed.name}</span>
        </div>

        <div className="bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12 shadow-sm">
          {/* Image */}
          <div className="relative bg-[#1C1208] border border-[#D4C9B0] rounded-[2px] overflow-hidden h-80 lg:h-[28rem] flex items-center justify-center">
            {src ? (
              <Image
                src={src}
                alt={breed.name}
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            ) : (
              <span className="text-[#C99A2E]/40 text-7xl flex items-center justify-center">
                <i className="bi bi-shield-check" />
              </span>
            )}
            <div className="absolute top-3 left-3">
              <span className="text-[10px] font-mono font-bold tracking-[0.14em] uppercase px-2.5 py-1 bg-[#6B7A3F] text-white rounded-[2px]">
                {breed.species.name}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#C99A2E] bg-[#C99A2E]/10 border border-[#C99A2E]/30 rounded-[2px] mb-3">
                <span>{breed.purpose} LIVESTOCK</span>
              </div>

              <h1
                className="text-4xl sm:text-5xl font-bold text-[#1C1208] mb-4"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                {breed.name}
              </h1>

              <p className="text-[#5C4A2A] leading-relaxed mb-8 text-base font-normal">
                {breed.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Origin", value: breed.origin },
                  { label: "Purpose", value: breed.purpose },
                  { label: "Male Weight", value: breed.maleWeight || "—" },
                  { label: "Female Weight", value: breed.femaleWeight || "—" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="bg-[#FFFFFF] border border-[#D4C9B0] rounded-[2px] p-4"
                  >
                    <div className="font-mono text-[9px] text-[#8E7E70] font-bold tracking-widest uppercase mb-1">
                      {item.label}
                    </div>
                    <div
                      className="text-base text-[#1C1208] font-bold"
                      style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                    >
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="border-t border-[#D4C9B0] pt-6 flex items-center justify-between mb-6">
                <div>
                  <div className="font-mono text-[9px] text-[#8E7E70] font-bold tracking-widest uppercase mb-1">
                    Price Per Head
                  </div>
                  <div
                    className="text-3xl text-[#C4602A] font-bold"
                    style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                  >
                    KES {breed.pricePerHead.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9px] text-[#8E7E70] font-bold tracking-widest uppercase mb-1 text-right">
                    Available
                  </div>
                  <div
                    className="text-3xl text-[#6B7A3F] font-bold text-right"
                    style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                  >
                    {breed.inStock} Head
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/checkout?breed=${breed.id}`}
                  className="btn-gold flex-1 min-w-[200px] justify-center"
                >
                  <i className="bi bi-bag-check-fill" />
                  <span>Order Breeding Stock</span>
                  <i className="bi bi-arrow-right" />
                </Link>

                <a
                  href={`https://wa.me/254755758208?text=${encodeURIComponent(
                    `Hello Osotua Livestock Desk, I am interested in inspecting or ordering ${breed.name} pedigree stock.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-[2px] bg-[#25D366] text-white hover:bg-[#20ba59] font-mono text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
                >
                  <i className="bi bi-whatsapp text-sm" />
                  <span>WhatsApp Desk</span>
                </a>

                <Link
                  href="/visit"
                  className="btn-outline flex-1 min-w-[150px] justify-center"
                >
                  <i className="bi bi-geo-alt" />
                  <span>Book Inspection</span>
                </Link>
              </div>

              {/* Trust & compliance reassurance */}
              <div className="mt-8 pt-6 border-t border-[#D4C9B0]/60 grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] font-mono text-[#5C4A2A]">
                <div className="flex items-center gap-2">
                  <i className="bi bi-patch-check-fill text-[#C99A2E] text-sm shrink-0" />
                  <span>Kenya Stud Book Registered</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="bi bi-shield-check text-[#6B7A3F] text-sm shrink-0" />
                  <span>Certified Vet Health Records</span>
                </div>
                <div className="flex items-center gap-2">
                  <i className="bi bi-truck text-[#C4602A] text-sm shrink-0" />
                  <span>Movement Permits Coordinated</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
