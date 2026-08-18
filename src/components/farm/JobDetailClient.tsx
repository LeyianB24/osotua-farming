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
      <div className="bg-[#FBF7F0] pt-32 min-h-screen flex items-center justify-center">
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(196, 136, 42, 0.22)",
            borderRadius: "24px",
            boxShadow: "0 10px 32px rgba(196, 136, 42, 0.06)",
          }}
          className="text-center p-8 max-w-md"
        >
          <div className="w-16 h-16 rounded-full bg-[#C4882A]/10 text-[#C4882A] flex items-center justify-center mx-auto text-2xl mb-4">
            <i className="bi bi-briefcase" />
          </div>
          <h2 className="font-serif text-2xl text-[#1C1208]">Position Not Found</h2>
          <p className="text-xs text-[#5C4835] mt-2">The career vacancy you are seeking may have expired or been filled.</p>
          <Link href="/careers" className="btn-primary mt-6 inline-flex text-xs">
            <i className="bi bi-arrow-left" />
            Back to Careers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: "#FBF7F0", minHeight: "100vh" }} className="pt-24">
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(180deg, #FFFFFF 0%, #FAF5EB 100%)",
          borderBottom: "1px solid rgba(196, 136, 42, 0.22)",
        }}
        className="py-16 px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-[11px] text-[#786550] tracking-wide mb-4 flex items-center gap-2">
            <Link href="/careers" className="text-[#8E5E16] hover:underline font-bold">Careers</Link>
            <span className="text-[#C4882A]/50">/</span>
            <span className="text-[#1C1208]">{job.title}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#1C1208] mb-4">{job.title}</h1>
          <div className="flex flex-wrap gap-2">
            {[job.department, job.type, job.location].map((tag) => (
              <span
                key={tag}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(196, 136, 42, 0.3)",
                  color: "#8E5E16",
                  borderRadius: "100px",
                }}
                className="font-mono text-[10px] font-bold px-3.5 py-1 tracking-wide uppercase shadow-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Job info */}
          <div>
            <h2 className="font-serif text-3xl text-[#1C1208] mb-4 font-normal">About the Role</h2>
            <p className="text-[#5C4835] leading-relaxed mb-8 whitespace-pre-line text-sm">{job.description}</p>

            <h2 className="font-serif text-3xl text-[#1C1208] mb-4 font-normal">Requirements</h2>
            <p className="text-[#5C4835] leading-relaxed whitespace-pre-line text-sm">{job.requirements}</p>
          </div>

          {/* Apply form */}
          <div>
            {submitted ? (
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(46, 125, 50, 0.3)",
                  borderRadius: "28px",
                  boxShadow: "0 16px 48px rgba(46, 125, 50, 0.08)",
                }}
                className="p-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#2E7D32]/12 text-[#2E7D32] flex items-center justify-center mx-auto text-3xl mb-4 border border-[#2E7D32]/30">
                  <i className="bi bi-check-circle-fill" />
                </div>
                <h3 className="font-serif text-2xl text-[#1C1208] mb-2 font-medium">Application Received</h3>
                <p className="text-[#5C4835] text-xs leading-relaxed">
                  Thank you for applying to join Osotua Farming. Our recruitment team will review your credentials and contact you if shortlisted.
                </p>
                <Link href="/careers" className="btn-primary mt-6 inline-flex text-xs">
                  Browse Other Openings
                </Link>
              </div>
            ) : (
              <div
                style={{
                  background: "#FFFFFF",
                  border: "1px solid rgba(196, 136, 42, 0.25)",
                  borderRadius: "28px",
                  boxShadow: "0 16px 48px rgba(196, 136, 42, 0.08)",
                }}
                className="p-8"
              >
                <div className="eyebrow text-[#8E5E16] mb-1 font-bold">Direct Application</div>
                <h3 className="font-serif text-3xl text-[#1C1208] mb-6 font-normal">Apply for this Position</h3>

                {errorMsg && (
                  <div className="mb-4 p-3 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs flex items-center gap-2">
                    <i className="bi bi-exclamation-triangle-fill text-[#DC2626]" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Dennis Nzioka"
                      className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="dennis@example.com"
                        className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+254 700 000000"
                        className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                      CV / LinkedIn / Portfolio URL
                    </label>
                    <input
                      type="url"
                      name="cvUrl"
                      placeholder="https://linkedin.com/in/username"
                      className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#8E5E16] font-bold mb-1">
                      Cover Letter / Professional Summary *
                    </label>
                    <textarea
                      name="coverLetter"
                      required
                      rows={5}
                      placeholder="Highlight your agricultural experience, qualifications, and motivation to join Osotua Farming..."
                      className="w-full bg-[#FAF6EE] border border-[#C4882A]/25 rounded-xl p-3 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-primary py-3.5 text-xs justify-center flex items-center gap-2 shadow-sm"
                  >
                    {submitting ? "Submitting Application..." : "Submit Job Application"}
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
