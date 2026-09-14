import { prisma } from "@/lib/prisma"
import Link from "next/link"

export const metadata = {
  title: "Careers & Pastoral Apprenticeships",
  description: "Join the Osotua Farming team in Kajiado. Open roles for farmers, technologists, vets, and agribusiness professionals.",
}

const PERKS = [
  { icon: "bi-tree-fill", title: "Work With the Land", desc: "Run and manage operations across a thriving 4,200+ acre modern pastoral ranch in Kajiado County." },
  { icon: "bi-graph-up-arrow", title: "Rapid Growth", desc: "We are scaling our agribusiness vertically — early team members grow with the enterprise." },
  { icon: "bi-people-fill", title: "Community Impact", desc: "Every role contributes directly to regional food security and pastoral co-operative prosperity." },
  { icon: "bi-cpu-fill", title: "Agri-Tech Innovation", desc: "We deploy cutting-edge smart farm tools alongside proven traditional pastoral methods." },
]

export default async function CareersPage() {
  const jobs = await prisma.job.findMany({
    where: { isOpen: true },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="w-full overflow-x-hidden bg-[#F5F0E8] text-[#1C1208]">

      {/* ── HERO BANNER ── */}
      <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden bg-[#1C1208]">
        <div className="os-container relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] text-[11px] font-mono font-bold uppercase tracking-[0.16em] bg-[#6B7A3F] text-white mb-6">
            <i className="bi bi-briefcase-fill text-xs" />
            <span>JOIN OUR TEAM &bull; BUILD WITH US</span>
          </div>

          <h1
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[#F5F0E8] leading-[1.02] tracking-tight max-w-5xl mb-6"
            style={{
              fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif",
            }}
          >
            Build something <br />
            <em className="font-normal italic text-[#C99A2E]">that lasts</em>
          </h1>

          <p className="text-base sm:text-xl text-[#F5F0E8]/85 max-w-2xl leading-relaxed font-normal">
            We are assembling a world-class team of pastoralists, agronomists, technologists, veterinarians, and agribusiness specialists transforming East African agriculture.
          </p>
        </div>
      </section>

      {/* ── PERKS ── */}
      <section className="py-20 sm:py-28 bg-[#EDE6DA] border-b border-[#D4C9B0]/60">
        <div className="os-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PERKS.map((p) => (
              <div
                key={p.title}
                className="bg-[#FAF7F2] border border-[#D4C9B0] p-8 rounded-[2px] flex flex-col gap-4 shadow-sm hover:border-[#C99A2E] transition-all"
              >
                <div className="w-12 h-12 rounded-[2px] bg-[#C99A2E]/10 border border-[#C99A2E]/30 flex items-center justify-center text-xl text-[#C99A2E]">
                  <i className={`bi ${p.icon}`} />
                </div>
                <h3
                  className="text-xl font-bold text-[#1C1208] m-0"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                >
                  {p.title}
                </h3>
                <p className="text-sm text-[#5C4A2A] leading-relaxed m-0">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN ROLES ── */}
      <section className="py-24 sm:py-32 bg-[#F5F0E8] border-b border-[#D4C9B0]/60">
        <div className="os-container">
          <div className="flex items-baseline justify-between mb-14 flex-wrap gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#6B7A3F] bg-[#6B7A3F]/10 border border-[#6B7A3F]/30 rounded-[2px] mb-3">
                <span>CURRENT VACANCIES</span>
              </div>
              <h2
                className="text-3xl sm:text-5xl font-bold text-[#1C1208] leading-tight m-0"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                Open Positions
              </h2>
            </div>
            {jobs.length > 0 && (
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[2px] bg-[#6B7A3F] text-white text-[11px] font-mono font-bold uppercase tracking-wider">
                <i className="bi bi-briefcase-fill" />
                {jobs.length} Active {jobs.length === 1 ? "Role" : "Roles"}
              </span>
            )}
          </div>

          {jobs.length > 0 ? (
            <div className="flex flex-col gap-4">
              {jobs.map((job) => (
                <Link
                  key={job.id}
                  href={`/careers/${job.id}`}
                  className="group bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] p-6 sm:p-8 flex items-center justify-between flex-wrap gap-6 no-underline hover:border-[#C99A2E] hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-[2px] bg-[#C99A2E]/10 border border-[#C99A2E]/30 flex items-center justify-center shrink-0 text-xl text-[#C99A2E]">
                      <i className="bi bi-briefcase-fill" />
                    </div>
                    <div>
                      <h3
                        className="text-2xl font-bold text-[#1C1208] mb-1 group-hover:text-[#C4602A] transition-colors"
                        style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                      >
                        {job.title}
                      </h3>
                      <div className="flex gap-4 flex-wrap text-xs font-mono">
                        {job.department && (
                          <span className="text-[#C99A2E] font-bold uppercase tracking-wider">
                            {job.department}
                          </span>
                        )}
                        {job.location && (
                          <span className="text-[#8E7E70] uppercase tracking-wider">
                            &bull; {job.location}
                          </span>
                        )}
                        {job.type && (
                          <span className="text-[#8E7E70] uppercase tracking-wider">
                            &bull; {job.type}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#C99A2E] group-hover:translate-x-1 transition-transform">
                    <span>View Role</span>
                    <i className="bi bi-arrow-right" />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 px-6 bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] max-w-xl mx-auto shadow-sm">
              <i className="bi bi-briefcase text-5xl text-[#C99A2E]/40 block mb-4" />
              <h3
                className="text-2xl font-bold text-[#1C1208] mb-2"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                No Open Roles Right Now
              </h3>
              <p className="text-sm text-[#5C4835] mb-6">
                We don&apos;t have active job openings at the moment, but we always welcome exceptional talent in agriculture, pastoral care, and technology.
              </p>
              <a href="mailto:careers@osotuafarming.co.ke" className="btn-gold">
                <i className="bi bi-envelope-fill" />
                <span>Send General Application</span>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ── INTERNSHIPS ── */}
      <section id="internships" className="py-24 sm:py-32 bg-[#FAF7F2]">
        <div className="os-container">
          <div className="bg-[#FFFFFF] border border-[#D4C9B0] rounded-[2px] p-8 sm:p-14 shadow-sm max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#C99A2E] bg-[#C99A2E]/10 border border-[#C99A2E]/30 rounded-[2px] mb-4">
              <span>STUDENT &amp; APPRENTICE PROGRAM</span>
            </div>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C1208] leading-tight mb-4"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
            >
              Internships &amp; Attachments
            </h2>
            <p className="text-base text-[#5C4835] leading-relaxed mb-8">
              We welcome university students and recent graduates in agriculture, veterinary medicine, software engineering, and agribusiness for structured 3–6 month attachments at our Kajiado ranch.
            </p>

            <Link href="/contact" className="btn-gold">
              <i className="bi bi-mortarboard-fill" />
              <span>Apply for Internship</span>
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
