"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"

interface Job {
  id: string
  title: string
  department: string
  type: string
  location: string
  description: string
  requirements: string
}

export default function JobDetailPage() {
  const { id } = useParams()
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetch(`/api/jobs/${id}`)
      .then((r) => r.json())
      .then((data) => { setJob(data); setLoading(false) })
  }, [id])

  async function handleApply(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    const data = Object.fromEntries(new FormData(e.currentTarget))
    await fetch(`/api/jobs/${id}/apply`, {
      method: "POST",
      body: JSON.stringify({ ...data, jobId: id }),
      headers: { "Content-Type": "application/json" },
    })
    setSubmitted(true)
    setSubmitting(false)
  }

  if (loading) {
    return (
      <div className="bg-[#FBF7F0] pt-24 min-h-screen flex items-center justify-center">
        <div className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase animate-pulse">Loading...</div>
      </div>
    )
  }

  if (!job) {
    return (
      <div className="bg-[#FBF7F0] pt-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">💼</div>
          <p className="font-serif text-xl text-[#1C1208]">Job not found.</p>
          <Link href="/careers" className="text-[#C4882A] text-sm mt-3 inline-block">← Back to Careers</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#FBF7F0] pt-24 min-h-screen">
      {/* Header */}
      <div className="bg-[#1C1208] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-[10px] text-[#1C1208]/40 tracking-wide mb-4 flex items-center gap-2">
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
            <p className="text-[#1C1208]/65 leading-relaxed mb-8 whitespace-pre-line">{job.description}</p>

            <h2 className="font-serif text-2xl text-[#1C1208] mb-4">Requirements</h2>
            <p className="text-[#1C1208]/65 leading-relaxed whitespace-pre-line">{job.requirements}</p>
          </div>

          {/* Apply form */}
          <div>
            {submitted ? (
              <div className="bg-[#3D6B3E]/10 border border-[#3D6B3E]/30 rounded p-8 text-center">
                <div className="text-5xl mb-4">✅</div>
                <h3 className="font-serif text-xl text-[#1C1208] mb-2">Application Submitted!</h3>
                <p className="text-[#1C1208]/60 text-sm">We'll review your application and be in touch soon.</p>
                <Link href="/careers" className="text-[#C4882A] text-sm mt-4 inline-block font-mono tracking-widest uppercase text-[10px]">
                  ← View all jobs
                </Link>
              </div>
            ) : (
              <form onSubmit={handleApply} className="bg-white border border-[#1C1208]/08 rounded p-6 flex flex-col gap-4">
                <h2 className="font-serif text-2xl text-[#1C1208]">Apply Now</h2>

                {[
                  { name: "fullName", label: "Full Name", type: "text" },
                  { name: "email", label: "Email Address", type: "email" },
                  { name: "phone", label: "Phone Number", type: "tel" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="font-mono text-[9px] text-[#1C1208]/50 tracking-widest uppercase block mb-2">{field.label}</label>
                    <input
                      name={field.name}
                      type={field.type}
                      required
                      className="w-full border border-[#1C1208]/15 rounded-sm px-4 py-3 text-sm text-[#1C1208] outline-none focus:border-[#C4882A] transition-colors"
                    />
                  </div>
                ))}

                <div>
                  <label className="font-mono text-[9px] text-[#1C1208]/50 tracking-widest uppercase block mb-2">Cover Letter</label>
                  <textarea
                    name="coverLetter"
                    rows={4}
                    placeholder="Tell us why you'd be a great fit for Osotua Farming..."
                    className="w-full border border-[#1C1208]/15 rounded-sm px-4 py-3 text-sm text-[#1C1208] outline-none focus:border-[#C4882A] transition-colors resize-none"
                  />
                </div>

                <div>
                  <label className="font-mono text-[9px] text-[#1C1208]/50 tracking-widest uppercase block mb-2">CV / Resume Link (Google Drive, Dropbox etc.)</label>
                  <input
                    name="cvUrl"
                    type="url"
                    placeholder="https://..."
                    className="w-full border border-[#1C1208]/15 rounded-sm px-4 py-3 text-sm text-[#1C1208] outline-none focus:border-[#C4882A] transition-colors"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#C4882A] text-[#1C1208] px-6 py-3 text-sm font-medium rounded-sm hover:bg-[#d99a30] transition-colors disabled:opacity-60"
                >
                  {submitting ? "Submitting..." : "Submit Application"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
