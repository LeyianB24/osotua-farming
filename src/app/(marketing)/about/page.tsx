import Image from "next/image"
import { RANCH_WIDE, RANCH_GALLERY, LOGO } from "@/lib/images"

export const metadata = { title: "About — Osotua Farming" }

export default function AboutPage() {
  return (
    <div className="bg-[#FBF7F0] pt-20 min-h-screen">
      {/* Header with backdrop */}
      <div className="relative bg-[#1C1208] py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={RANCH_WIDE}
            alt="The Osotua ranch"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1C1208]/85 via-[#1C1208]/70 to-[#1C1208]/95" />
        </div>
        <div className="relative max-w-5xl mx-auto z-10">
          <Image
            src={LOGO}
            alt="Osotua Farming"
            width={64}
            height={64}
            priority
            className="rounded-full ring-1 ring-[#C4882A]/30 mb-6"
          />
          <div className="eyebrow text-[#C4882A] mb-4">
            Our Story
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl font-light text-[#F5EFE4] mb-4 tracking-tight leading-tight">
            A farm built on{" "}
            <em className="text-[#C4882A] not-italic">trust and land</em>
          </h1>
          <p className="text-[#F5EFE4]/70 max-w-xl leading-relaxed text-base">
            Osotua means a bond of friendship in the Maa language — an enduring covenant between the land, the farmer, and the community.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20 items-center">
          <div className="relative rounded overflow-hidden min-h-80 flex flex-col justify-end p-10 group shadow-xl">
            <Image
              src={RANCH_GALLERY[5]}
              alt="Life on the ranch"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1208]/90 via-[#1C1208]/40 to-transparent" />
            <div className="relative z-10">
              <p className="font-serif text-3xl italic text-[#F5EFE4] font-light leading-tight mb-3">
                &ldquo;From Our Land, To Your Table&rdquo;
              </p>
              <span className="eyebrow-plain text-[#C4882A] text-xs">
                Maa · Kajiado, Kenya
              </span>
            </div>
          </div>

          <div>
            <div className="eyebrow mb-3">Our Core Purpose</div>
            <h2 className="font-serif text-4xl text-[#1C1208] font-light mb-6">Our Mission</h2>
            <p className="text-[#1C1208]/65 leading-relaxed mb-4 text-base">
              Osotua Farming is a modern, smart agribusiness enterprise based in Kajiado County, Kenya. We raise premium indigenous livestock, grow wholesome food, and connect producers directly to consumers through our Barn Store.
            </p>
            <p className="text-[#1C1208]/65 leading-relaxed text-base">
              We champion Africa&apos;s finest livestock genetics combined with smart farming technology and sustainable land management — proving that indigenous breeds and modern methods can coexist beautifully.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="eyebrow mb-3">Our Guiding Values</div>
          <h2 className="font-serif text-4xl text-[#1C1208] font-light mb-10">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: "bi-tree", title: "Indigenous breeds, modern methods", desc: "We champion Africa's finest livestock genetics combined with smart farming technology." },
              { icon: "bi-geo-alt", title: "Rooted in Kajiado", desc: "Our ranch has the climate, land, and heritage to produce the finest animals and food in East Africa." },
              { icon: "bi-qr-code", title: "Full traceability", desc: "Every product carries a QR code linking back to its source — so you always know exactly what you're eating." },
              { icon: "bi-people", title: "Community-first", desc: "We partner with smallholder farmers, support youth through internships, and invest in surrounding communities." },
            ].map((item) => (
              <div key={item.title} className="os-card p-6 flex gap-4">
                <div className="w-12 h-12 rounded bg-[#C4882A]/10 border border-[#C4882A]/25 flex items-center justify-center flex-shrink-0">
                  <i className={`bi ${item.icon} text-xl text-[#C4882A]`} />
                </div>
                <div>
                  <div className="font-serif text-xl text-[#1C1208] mb-1">{item.title}</div>
                  <div className="text-[#1C1208]/60 text-sm leading-relaxed">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ranch gallery */}
        <div className="mb-20">
          <div className="eyebrow mb-3">Life at Kajiado</div>
          <h2 className="font-serif text-4xl text-[#1C1208] font-light mb-8">Life on the Ranch</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {RANCH_GALLERY.map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden rounded group shadow-sm">
                <Image
                  src={src}
                  alt={`Ranch life ${i + 1}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="bg-[#1C1208] rounded p-12 text-center text-[#F5EFE4] relative overflow-hidden shadow-2xl">
          <div className="eyebrow justify-center text-[#C4882A] mb-3">Find Us</div>
          <h3 className="font-serif text-4xl font-light mb-4">Kajiado County, Kenya</h3>
          <p className="text-[#F5EFE4]/60 text-sm max-w-md mx-auto mb-8 leading-relaxed">
            Located in the heart of Kenya&apos;s livestock country, with the climate and heritage to produce the finest animals and food.
          </p>
          <a
            href="/visit"
            className="btn-primary"
          >
            <i className="bi bi-geo-alt" />
            Book a Farm Visit
          </a>
        </div>
      </div>
    </div>
  )
}
