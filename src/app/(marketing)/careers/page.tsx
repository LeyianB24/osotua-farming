import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const metadata = { title: "Careers — Osotua Farming" }

export default async function CareersPage() {
  const jobs = await prisma.job.findMany({
    where: { isOpen: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="bg-[#FBF7F0] pt-24 min-h-screen">
      <div className="bg-[#1C1208] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase flex items-center gap-3 mb-4">
            <span className="w-6 h-px bg-[#C4882A]" />
            Join the Team
          </div>
          <h1 className="font-serif text-5xl font-light text-[#F5EFE4] mb-4">
            Build something{" "}
            <em className="text-[#C4882A]">that lasts</em>
          </h1>
          <p className="text-[#F5EFE4]/50 max-w-xl leading-relaxed">
            We are building a world-class team of farmers, technologists, veterinarians, agronomists, and agribusiness professionals.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {jobs.length > 0 ? (
          <div className="flex flex-col gap-4">
            {jobs.map((job) => (
              <Link
                key={job.id}
                href={`/careers/${job.id}`}
                className="bg-white border border-[#1C1208]/08 rounded p-6 hover:border-[#C4882A] hover:shadow-md transition-all group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-serif text-xl text-[#1C1208] mb-1 group-hover:text-[#C4882A] transition-colors">
                      {job.title}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {[job.department, job.type, job.location].map((tag) => (
                        <span key={tag} className="font-mono text-[9px] text-[#3D6B3E] bg-[#3D6B3E]/08 border border-[#3D6B3E]/20 px-2 py-1 rounded-sm tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase whitespace-nowrap">
                    Apply →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 text-[#1C1208]/40">
            <div className="text-5xl mb-4">💼</div>
            <p className="font-serif text-xl">No open roles right now.</p>
            <p className="text-sm mt-2">Send us your CV at <a href="mailto:info@osotuafarming.co.ke" className="text-[#C4882A]">info@osotuafarming.co.ke</a></p>
          </div>
        )}

        {/* Internships */}
        <div id="internships" className="mt-20 bg-[#3B2506] rounded p-10">
          <div className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase mb-3">Internships</div>
          <h2 className="font-serif text-3xl text-[#F5EFE4] font-light mb-4">
            Students & Graduates
          </h2>
          <p className="text-[#F5EFE4]/50 leading-relaxed mb-6">
            We welcome students and recent graduates in agriculture, IT, and business for structured 3–6 month internships. Gain real ranch and agribusiness experience.
          </p>
          <Link
            href="/contact"
            className="bg-[#C4882A] text-[#1C1208] px-6 py-3 text-sm font-medium rounded-sm hover:bg-[#d99a30] transition-colors inline-block"
          >
            Apply for Internship
          </Link>
        </div>
      </div>
    </div>
  )
}
