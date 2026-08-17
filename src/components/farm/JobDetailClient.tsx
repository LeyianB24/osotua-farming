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
        <div className="text-center p-8 bg-white border border-[#EDE5D8] rounded-2xl shadow max-w-md">
          <div className="w-16 h-16 rounded-full bg-[#C4882A]/10 text-[#C4882A] flex items-center justify-center mx-auto text-2xl mb-4">
            <i className="bi bi-briefcase" />
          </div>
          <h2 className="font-serif text-2xl text-[#1C1208]">Position Not Found</h2>
          <p className="text-xs text-[#6B3E1A] mt-2">The career vacancy you are seeking may have expired or been filled.</p>
          <Link href="/careers" className="btn-primary mt-6 inline-flex text-xs">
            <i className="bi bi-arrow-left" />
            Back to Careers
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FBF7F0] pt-24 min-h-screen">
      {/* Header */}
      <div className="bg-[#1C1208] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-[10px] text-[#F5EFE4]/40 tracking-wide mb-4 flex items-center gap-2">
            <Link href="/careers" className="text-[#C4882A] hover:underline">Careers</Link>
            <span className="text-[#F5EFE4]/30">/</span>
            <span className="text-[#F5EFE4]/50">{job.title}</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-light text-[#F5EFE4] mb-4">{job.title}</h1>
          <div className="flex flex-wrap gap-2">
            {[job.department, job.type, job.location].map((tag) => (
              <span key={tag} className="font-mono text-[9px] text-[#C4882A] border border-[#C4882A]/30 px-3 py-1.5 rounded-sm tracking-wide uppercase">
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
            <h2 className="font-serif text-2xl text-[#1C1208] mb-4">About the Role</h2>
            <p className="text-[#1C1208]/65 leading-relaxed mb-8 whitespace-pre-line text-sm">{job.description}</p>

            <h2 className="font-serif text-2xl text-[#1C1208] mb-4">Requirements</h2>
            <p className="text-[#1C1208]/65 leading-relaxed whitespace-pre-line text-sm">{job.requirements}</p>
          </div>

          {/* Apply form */}
          <div>
            {submitted ? (
              <div className="bg-[#3D6B3E]/10 border border-[#3D6B3E]/30 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#3D6B3E]/20 text-[#3D6B3E] flex items-center justify-center mx-auto text-3xl mb-4">
                  <i className="bi bi-check-circle-fill" />
                </div>
                <h3 className="font-serif text-2xl text-[#1C1208] mb-2">Application Received</h3>
                <p className="text-[#1C1208]/65 text-xs leading-relaxed">
                  Thank you for applying to join Osotua Farming. Our recruitment team will review your credentials and contact you if shortlisted.
                </p>
                <Link href="/careers" className="btn-primary mt-6 inline-flex text-xs">
                  Browse Other Openings
                </Link>
              </div>
            ) : (
              <div className="bg-white border border-[#EDE5D8] rounded-2xl p-8 shadow-sm">
                <div className="eyebrow text-[#C4882A] mb-1">Direct Application</div>
                <h3 className="font-serif text-2xl text-[#1C1208] mb-6 font-light">Apply for this Position</h3>

                {errorMsg && (
                  <div className="mb-4 p-3 rounded-xl bg-[#A0431E]/10 border border-[#A0431E]/30 text-[#A0431E] text-xs flex items-center gap-2">
                    <i className="bi bi-exclamation-triangle-fill" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <form onSubmit={handleApply} className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1C1208]/70 font-semibold mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="e.g. Dennis Nzioka"
                      className="os-input text-xs bg-[#FBF7F0]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1C1208]/70 font-semibold mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        placeholder="dennis@example.com"
                        className="os-input text-xs bg-[#FBF7F0]"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1C1208]/70 font-semibold mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="+254 700 000000"
                        className="os-input text-xs bg-[#FBF7F0]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1C1208]/70 font-semibold mb-1">
                      CV / LinkedIn / Portfolio URL
                    </label>
                    <input
                      type="url"
                      name="cvUrl"
                      placeholder="https://linkedin.com/in/username"
                      className="os-input text-xs bg-[#FBF7F0]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#1C1208]/70 font-semibold mb-1">
                      Cover Letter / Professional Summary *
                    </label>
                    <textarea
                      name="coverLetter"
                      required
                      rows={5}
                      placeholder="Highlight your agricultural experience, qualifications, and motivation to join Osotua Farming..."
                      className="os-input text-xs bg-[#FBF7F0]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-primary py-3 text-xs justify-center flex items-center gap-2"
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
