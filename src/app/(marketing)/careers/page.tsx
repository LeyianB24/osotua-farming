import { prisma } from "@/lib/prisma"
import Link from "next/link"
import { ArrowRight, Briefcase, MapPin, Clock, Users, GraduationCap } from "lucide-react"

export const metadata = {
  title: "Careers — Osotua Farming",
  description: "Join the Osotua Farming team in Kajiado. Open roles for farmers, technologists, vets, and agribusiness professionals.",
}

const PERKS = [
  { icon: "🌿", title: "Work with land", desc: "Run and manage operations on a thriving modern ranch in Kajiado County." },
  { icon: "📈", title: "Grow fast", desc: "We're scaling quickly — early joiners grow with the company." },
  { icon: "🤝", title: "Community impact", desc: "Every role contributes directly to food security across East Africa." },
  { icon: "🔬", title: "Innovation first", desc: "We use cutting-edge agri-tech alongside proven traditional methods." },
]

export default async function CareersPage() {
  const jobs = await prisma.job.findMany({
    where: { isOpen: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="min-h-screen bg-[#FBF7F0]">
      {/* Hero */}
      <div className="relative bg-[#0E0A04] pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(#F5EFE4 1px, transparent 1px), linear-gradient(90deg, #F5EFE4 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }} />
          <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#C4882A]/08 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="font-mono text-[10px] text-[#C4882A] tracking-[0.25em] uppercase flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-[#C4882A]" />
            Join the Team
          </div>
          <h1 className="font-serif text-5xl lg:text-6xl font-light text-[#F5EFE4] mb-4 leading-tight">
            Build something{" "}
            <em className="text-[#C4882A]">that lasts</em>
          </h1>
          <p className="text-[#F5EFE4]/45 max-w-xl leading-relaxed">
            We&apos;re building a world-class team of farmers, technologists, veterinarians, and agribusiness professionals committed to transforming East African agriculture.
          </p>
        </div>
      </div>

      {/* Perks */}
      <div className="bg-[#FBF7F0] border-b border-[#EDE5D8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {PERKS.map((p) => (
              <div key={p.title} className="text-center p-5 rounded-xl bg-white border border-[#1C1208]/06 hover:border-[#C4882A]/30 hover:shadow-md transition-all group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200">{p.icon}</div>
                <div className="font-medium text-[#1C1208] text-sm mb-1.5">{p.title}</div>
                <div className="text-[#1C1208]/45 text-xs leading-relaxed">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Open Roles */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-serif text-2xl text-[#1C1208] font-light">Open Roles</h2>
          {jobs.length > 0 && (
            <span className="font-mono text-[10px] text-[#3D6B3E] tracking-widest uppercase bg-[#3D6B3E]/08 border border-[#3D6B3E]/20 px-3 py-1.5 rounded-full">
              {jobs.length} open
            </span>
          )}
        </div>

        {jobs.length > 0 ? (
          <div className="flex flex-col gap-3 mb-20">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/careers/${job.id}`}
                className="group bg-white border border-[#1C1208]/06 rounded-xl p-6 hover:border-[#C4882A]/40 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-[#C4882A]/10 rounded-lg flex items-center justify-center">
                        <Briefcase className="w-4 h-4 text-[#C4882A]" />
                      </div>
                      <span className="font-serif text-lg text-[#1C1208] group-hover:text-[#C4882A] transition-colors">
                        {job.title}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 ml-11">
                      {job.department && (
                        <span className="flex items-center gap-1.5 font-mono text-[9px] text-[#3D6B3E] bg-[#3D6B3E]/08 border border-[#3D6B3E]/20 px-2.5 py-1 rounded-full tracking-wide">
                          <Users className="w-2.5 h-2.5" /> {job.department}
                        </span>
                      )}
                      {job.type && (
                        <span className="flex items-center gap-1.5 font-mono text-[9px] text-[#1C1208]/50 bg-[#1C1208]/05 border border-[#1C1208]/10 px-2.5 py-1 rounded-full tracking-wide">
                          <Clock className="w-2.5 h-2.5" /> {job.type}
                        </span>
                      )}
                      {job.location && (
                        <span className="flex items-center gap-1.5 font-mono text-[9px] text-[#1C1208]/50 bg-[#1C1208]/05 border border-[#1C1208]/10 px-2.5 py-1 rounded-full tracking-wide">
                          <MapPin className="w-2.5 h-2.5" /> {job.location}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#C4882A] text-xs font-medium flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                    Apply <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center mb-16 bg-white border border-[#1C1208]/06 rounded-2xl">
            <div className="w-16 h-16 bg-[#1C1208]/04 rounded-full flex items-center justify-center mb-4">
              <Briefcase className="w-7 h-7 text-[#1C1208]/25" />
            </div>
            <h3 className="font-serif text-xl text-[#1C1208] font-light mb-2">No Open Roles Right Now</h3>
            <p className="text-[#1C1208]/40 text-sm mb-4 max-w-xs leading-relaxed">
              We don&apos;t have any open positions at the moment, but we&apos;re always interested in great talent.
            </p>
            <a
              href="mailto:info@osotuafarming.co.ke"
              className="text-[#C4882A] text-sm font-medium hover:underline"
            >
              Send us your CV →
            </a>
          </div>
        )}

        {/* Internships */}
        <div
          id="internships"
          className="relative bg-[#1C1208] rounded-2xl p-10 overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.05]" style={{
            backgroundImage: "radial-gradient(circle at 70% 50%, #C4882A 0%, transparent 60%)",
          }} />
          <div className="relative">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#C4882A]/15 rounded-xl flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#C4882A]" />
              </div>
              <span className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase">Internships</span>
            </div>
            <h2 className="font-serif text-3xl text-[#F5EFE4] font-light mb-3">
              Students &amp; Graduates
            </h2>
            <p className="text-[#F5EFE4]/50 leading-relaxed max-w-lg mb-7">
              We welcome students and recent graduates in agriculture, IT, and business for structured 3–6 month internships. Gain real ranch and agribusiness experience in Kajiado.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#C4882A] text-[#1C1208] px-6 py-3 text-sm font-semibold rounded-lg hover:bg-[#d9993b] hover:shadow-lg hover:shadow-[#C4882A]/20 transition-all duration-200 group"
            >
              Apply for Internship
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
