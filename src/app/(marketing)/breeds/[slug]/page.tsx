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
    <div style={{ background: "#FBF7F0", minHeight: "100vh" }} className="pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Breadcrumb */}
        <div className="font-mono text-[11px] text-[#786550] tracking-wide mb-8 flex items-center gap-2">
          <Link href="/breeds" className="hover:text-[#C4882A] transition-colors font-bold">Breeds</Link>
          <span>/</span>
          <span className="text-[#1C1208]">{breed.name}</span>
        </div>

        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(196, 136, 42, 0.25)",
            borderRadius: "28px",
            boxShadow: "0 16px 48px rgba(196, 136, 42, 0.08)",
          }}
          className="p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Image */}
          <div
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              border: "1px solid rgba(196, 136, 42, 0.2)",
              boxShadow: "0 10px 30px rgba(196, 136, 42, 0.1)",
            }}
            className="relative bg-gradient-to-br from-[#FAF5EB] to-[#F5EFE4] h-80 lg:h-[28rem] flex items-center justify-center"
          >
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
              <span className="text-[#C4882A]/40 text-7xl flex items-center justify-center">
                <i className="bi bi-shield-check" />
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <span className="font-mono text-[10px] text-[#8E5E16] font-bold tracking-widest uppercase">
                {breed.species.name} · {breed.purpose}
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#1C1208] mt-2 mb-4">{breed.name}</h1>
              <p className="text-[#5C4835] leading-relaxed mb-8 text-base">{breed.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Origin", value: breed.origin },
                  { label: "Purpose", value: breed.purpose },
                  { label: "Male Weight", value: breed.maleWeight || "—" },
                  { label: "Female Weight", value: breed.femaleWeight || "—" },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      background: "#FAF8F5",
                      border: "1px solid rgba(196, 136, 42, 0.18)",
                      borderRadius: "14px",
                    }}
                    className="p-4"
                  >
                    <div className="font-mono text-[9px] text-[#8E5E16] font-bold tracking-widest uppercase mb-1">{item.label}</div>
                    <div className="font-serif text-base text-[#1C1208] font-medium">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="border-t border-[#C4882A]/20 pt-6 flex items-center justify-between mb-6">
                <div>
                  <div className="font-mono text-[9px] text-[#786550] font-bold tracking-widest uppercase mb-1">Price Per Head</div>
                  <div className="font-serif text-3xl text-[#C4882A] font-bold">
                    KES {breed.pricePerHead.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-[9px] text-[#786550] font-bold tracking-widest uppercase mb-1">Available</div>
                  <div className="font-serif text-3xl text-[#2E7D32] font-bold">{breed.inStock}</div>
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href={`/checkout?breed=${breed.id}`}
                  className="btn-primary flex-1 justify-center py-3.5 text-center text-sm"
                >
                  Place Order
                </Link>
                <Link
                  href="/contact"
                  className="btn-ghost py-3.5 px-6 text-sm"
                  style={{ color: "#1C1208", borderColor: "rgba(196,136,42,0.3)" }}
                >
                  Enquire
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
