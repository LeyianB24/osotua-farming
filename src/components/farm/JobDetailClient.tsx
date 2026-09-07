"use client"

import { useState } from "react"
import Link from "next/link"

export interface JobData {
  id: string
  title: string
  department: string
  type: string
  location: string
  description: string
  requirements: string
}

export default function JobDetailClient({ job }: { job: JobData | null }) {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  async function handleApply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!job) return
    setSubmitting(true)
    setErrorMsg("")

    try {
      const data = Object.fromEntries(new FormData(e.currentTarget))
      const res = await fetch(`/api/jobs/${job.id}/apply`, {
        method: "POST",
        body: JSON.stringify({ ...data, jobId: job.id }),
        headers: { "Content-Type": "application/json" },
      })

      if (!res.ok) {
        throw new Error("Application submission failed")
      }

      setSubmitted(true)
    } catch (err) {
      console.error(err)
      setErrorMsg("Failed to submit job application. Please check your details and try again.")
    } finally {
      setSubmitting(false)
    }
  }

  if (!job) {
    return (
      <div className="bg-[#F5F0E8] pt-32 min-h-screen flex items-center justify-center">
        <div className="text-center p-8 max-w-md bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] shadow-sm">
          <div className="w-16 h-16 rounded-[2px] bg-[#C99A2E]/10 text-[#C99A2E] flex items-center justify-center mx-auto text-2xl mb-4 border border-[#C99A2E]/25">
            <i className="bi bi-briefcase" />
          </div>
          <h2
            className="text-2xl font-bold text-[#1C1208]"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            Position Not Found
          </h2>
          <p className="text-xs text-[#5C4A2A] mt-2 mb-6">
            The career vacancy you are seeking may have expired or been filled.
          </p>
          <Link href="/careers" className="btn-gold text-xs">
            <i className="bi bi-arrow-left" />
            <span>Back to Careers</span>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#F5F0E8] min-h-screen pt-24 text-[#1C1208]">
      {/* Header */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1C1208] text-white">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-[11px] text-[#F5F0E8]/70 tracking-wider uppercase mb-4 flex items-center gap-2">
            <Link href="/careers" className="text-[#C99A2E] hover:underline font-bold">
              Careers
            </Link>
            <span>/</span>
            <span className="text-[#F5F0E8]">{job.title}</span>
          </div>

          <h1
            className="text-3xl sm:text-5xl font-bold text-[#F5F0E8] mb-4"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            {job.title}
          </h1>

          <div className="flex flex-wrap gap-2">
            {[job.department, job.type, job.location].filter(Boolean).map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] font-bold px-3.5 py-1 tracking-wider uppercase bg-[#6B7A3F] text-white rounded-[2px]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Job info */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <h2
                className="text-2xl sm:text-3xl text-[#1C1208] mb-4 font-bold"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                About the Role
              </h2>
              <p className="text-[#5C4A2A] leading-relaxed whitespace-pre-line text-sm font-normal">
                {job.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#D4C9B0]">
              <h2
                className="text-2xl sm:text-3xl text-[#1C1208] mb-4 font-bold"
                style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
              >
                Role Requirements
              </h2>
              <p className="text-[#5C4A2A] leading-relaxed whitespace-pre-line text-sm font-normal">
                {job.requirements}
              </p>
            </div>
          </div>

          {/* Apply form */}
          <div className="lg:col-span-5">
            {submitted ? (
              <div className="p-8 text-center bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] shadow-sm">
                <div className="w-16 h-16 rounded-[2px] bg-[#6B7A3F]/12 text-[#6B7A3F] flex items-center justify-center mx-auto text-3xl mb-4 border border-[#6B7A3F]/30">
                  <i className="bi bi-check-circle-fill" />
                </div>
                <h3
                  className="text-2xl text-[#1C1208] mb-2 font-bold"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                >
                  Application Received
                </h3>
                <p className="text-[#5C4A2A] text-xs leading-relaxed mb-6">
                  Thank you for applying to join Osotua Farming. Our recruitment team will review your credentials and contact you if shortlisted.
                </p>
                <Link href="/careers" className="btn-outline text-xs">
                  Browse Other Openings
                </Link>
              </div>
            ) : (
              <div className="p-8 bg-[#FAF7F2] border border-[#D4C9B0] rounded-[2px] shadow-sm">
                <div className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#C99A2E] bg-[#C99A2E]/10 border border-[#C99A2E]/30 rounded-[2px] mb-2">
                  <span>DIRECT APPLICATION</span>
                </div>
                <h3
                  className="text-2xl text-[#1C1208] mb-6 font-bold"
                  style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
                >
                  Apply for this Position
                </h3>

                {errorMsg && (
                  <div className="mb-4 p-3 rounded-[2px] bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs flex items-center gap-2">
                    <i className="bi bi-exclamation-triangle-fill text-[#DC2626]" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#5C4A2A] font-bold mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Dennis Nzioka"
                      className="os-input"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#5C4A2A] font-bold mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="dennis@example.com"
                      className="os-input"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#5C4A2A] font-bold mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+254 700 000000"
                      className="os-input"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#5C4A2A] font-bold mb-1.5">
                      CV / LinkedIn / Portfolio URL
                    </label>
                    <input
                      type="url"
                      name="cvUrl"
                      placeholder="https://linkedin.com/in/username"
                      className="os-input"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#5C4A2A] font-bold mb-1.5">
                      Cover Letter / Professional Summary *
                    </label>
                    <textarea
                      name="coverLetter"
                      required
                      rows={4}
                      placeholder="Highlight your agricultural experience, qualifications, and motivation to join Osotua Farming..."
                      className="os-input"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-gold justify-center flex items-center gap-2"
                  >
                    <span>{submitting ? "Submitting Application..." : "Submit Job Application"}</span>
                    <i className="bi bi-arrow-right" />
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
