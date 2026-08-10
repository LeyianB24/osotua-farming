import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { imageForBreed } from "@/lib/images"

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
    <div className="bg-[#FBF7F0] pt-24 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Breadcrumb */}
        <div className="font-mono text-[10px] text-[#1C1208]/40 tracking-wide mb-8 flex items-center gap-2">
          <Link href="/breeds" className="hover:text-[#C4882A] transition-colors">Breeds</Link>
          <span>/</span>
          <span>{breed.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative bg-gradient-to-br from-[#3B2506] to-[#6b4010] rounded h-80 lg:h-[28rem] flex items-center justify-center overflow-hidden">
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
              <span className="text-8xl">
                {breed.species.name === "Cattle" ? "🐄" : breed.species.name === "Goats" ? "🐐" : "🐑"}
              </span>
            )}
          </div>

          {/* Details */}
          <div>
            <span className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase">
              {breed.species.name} · {breed.purpose}
            </span>
            <h1 className="font-serif text-4xl font-light text-[#1C1208] mt-2 mb-4">{breed.name}</h1>
            <p className="text-[#1C1208]/60 leading-relaxed mb-8">{breed.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { label: "Origin", value: breed.origin },
                { label: "Purpose", value: breed.purpose },
                { label: "Male Weight", value: breed.maleWeight || "—" },
                { label: "Female Weight", value: breed.femaleWeight || "—" },
              ].map((item) => (
                <div key={item.label} className="bg-white border border-[#1C1208]/08 p-4 rounded">
                  <div className="font-mono text-[9px] text-[#1C1208]/40 tracking-widest uppercase mb-1">{item.label}</div>
                  <div className="font-serif text-sm text-[#1C1208]">{item.value}</div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#1C1208]/10 pt-6 flex items-center justify-between mb-6">
              <div>
                <div className="font-mono text-[9px] text-[#1C1208]/40 tracking-widest uppercase mb-1">Price Per Head</div>
                <div className="font-serif text-2xl text-[#C4882A] font-semibold">
                  KES {breed.pricePerHead.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="font-mono text-[9px] text-[#1C1208]/40 tracking-widest uppercase mb-1">Available</div>
                <div className="font-serif text-2xl text-[#3D6B3E] font-semibold">{breed.inStock}</div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link
                href={`/checkout?breed=${breed.id}`}
                className="bg-[#C4882A] text-[#1C1208] px-6 py-3 text-sm font-medium rounded-sm hover:bg-[#d99a30] transition-colors flex-1 text-center"
              >
                Place Order
              </Link>
              <Link
                href="/contact"
                className="border border-[#1C1208]/20 text-[#1C1208] px-6 py-3 text-sm rounded-sm hover:border-[#C4882A] hover:text-[#C4882A] transition-colors"
              >
                Enquire
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
