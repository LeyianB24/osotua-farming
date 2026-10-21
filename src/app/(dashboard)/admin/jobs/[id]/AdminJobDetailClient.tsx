"use client"

import { useState } from "react"
import Link from "next/link"
import Badge from "@/components/dashboard/Badge"

export interface ApplicantData {
  id: string
  fullName: string
  email: string
  phone: string
  cvUrl?: string | null
  coverLetter?: string | null
  status: "RECEIVED" | "REVIEWING" | "SHORTLISTED" | "INTERVIEWED" | "OFFERED" | "REJECTED"
  createdAt: string
}

export interface JobDetailAdminData {
  id: string
  title: string
  department: string
  type: string
  location: string
  description: string
  requirements: string
  isOpen: boolean
  createdAt: string
  applications: ApplicantData[]
}

const APP_STATUS_OPTIONS = [
  "RECEIVED",
  "REVIEWING",
  "SHORTLISTED",
  "INTERVIEWED",
  "OFFERED",
  "REJECTED",
]

export default function AdminJobDetailClient({ job }: { job: JobDetailAdminData }) {
  const [isOpen, setIsOpen] = useState(job.isOpen)
  const [applications, setApplications] = useState<ApplicantData[]>(job.applications)
  const [expandedLetterId, setExpandedLetterId] = useState<string | null>(null)
  const [updatingAppId, setUpdatingAppId] = useState<string | null>(null)
  const [togglingOpen, setTogglingOpen] = useState(false)
  const [alertMsg, setAlertMsg] = useState<string | null>(null)

  const handleToggleOpen = async () => {
    setTogglingOpen(true)
    setAlertMsg(null)
    const newStatus = !isOpen
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isOpen: newStatus }),
      })
      if (!res.ok) throw new Error("Failed to toggle status")
      setIsOpen(newStatus)
      setAlertMsg(`Job position is now ${newStatus ? "OPEN for applications" : "CLOSED"}`)
      setTimeout(() => setAlertMsg(null), 3000)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error updating job")
    } finally {
      setTogglingOpen(false)
    }
  }

  const handleStatusChange = async (appId: string, newStatus: ApplicantData["status"]) => {
    setUpdatingAppId(appId)
    setAlertMsg(null)
    try {
      const res = await fetch(`/api/jobs/applications/${appId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!res.ok) throw new Error("Failed to update applicant status")
      setApplications((prev) =>
        prev.map((a) => (a.id === appId ? { ...a, status: newStatus } : a))
      )
      setAlertMsg(`Candidate marked as ${newStatus}`)
      setTimeout(() => setAlertMsg(null), 3000)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error updating status")
    } finally {
      setUpdatingAppId(null)
    }
  }

  const handleDeleteApplicant = async (appId: string, name: string) => {
    if (!confirm(`Delete application for ${name}?`)) return
    setUpdatingAppId(appId)
    try {
      const res = await fetch(`/api/jobs/applications/${appId}`, { method: "DELETE" })
      if (!res.ok) throw new Error("Failed to delete application")
      setApplications((prev) => prev.filter((a) => a.id !== appId))
      setAlertMsg("Application removed")
      setTimeout(() => setAlertMsg(null), 3000)
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error deleting application")
    } finally {
      setUpdatingAppId(null)
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-8 space-y-8">
      {/* Top Breadcrumb & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/admin/jobs"
          className="text-xs font-mono font-bold uppercase tracking-wider text-[#7A6C5B] hover:text-[#C48D2A] flex items-center gap-1.5 transition-colors"
        >
          <i className="bi bi-arrow-left" /> Back to Careers
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleOpen}
            disabled={togglingOpen}
            className={`px-3.5 py-1.5 rounded-[2px] text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs ${
              isOpen
                ? "bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] hover:bg-red-100"
                : "bg-[#E8EEDC] border border-[#D2DCBE] text-[#486326] hover:bg-emerald-100"
            }`}
          >
            <i className={`bi ${isOpen ? "bi-slash-circle" : "bi-check2-circle"}`} />
            <span>{isOpen ? "Close Position" : "Reopen Position"}</span>
          </button>
          <Link
            href={`/careers/${job.id}`}
            target="_blank"
            className="px-3 py-1.5 rounded-[2px] bg-white border border-[#DDD4C4] text-xs font-mono font-bold text-[#1A1208] hover:bg-[#FAF7F2] transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <i className="bi bi-box-arrow-up-right text-[10px]" />
            <span>View Public Listing</span>
          </Link>
        </div>
      </div>

      {/* Alert */}
      {alertMsg && (
        <div className="p-3 bg-[#E8EEDC] border border-[#D2DCBE] text-[#486326] text-xs font-mono font-semibold rounded-[2px] flex items-center gap-2">
          <i className="bi bi-check-circle-fill text-sm" />
          <span>{alertMsg}</span>
        </div>
      )}

      {/* Job Summary Banner */}
      <div className="bg-white border border-[#E5DDD0] rounded-[2px] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#EFE9DF]">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap mb-1">
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-[2px] bg-[#EFE9DF] text-[#7A6C5B] uppercase tracking-wider">
                {job.department}
              </span>
              <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-[2px] bg-[#FAF7F2] text-[#BA5932] border border-[#EFE9DF] uppercase tracking-wider">
                {job.type}
              </span>
              <span className="font-mono text-[10px] text-[#7A6C5B] flex items-center gap-1">
                <i className="bi bi-geo-alt text-[#C48D2A]" /> {job.location}
              </span>
            </div>
            <h1
              className="text-2xl sm:text-3xl font-bold text-[#1A1208]"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
            >
              {job.title}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#7A6C5B] font-bold">
                Total Applicants
              </div>
              <div className="font-bold text-2xl text-[#BA5932] font-mono">
                {applications.length}
              </div>
            </div>
            <Badge label={isOpen ? "Open" : "Closed"} variant={isOpen ? "green" : "muted"} />
          </div>
        </div>

        {/* Description & Requirements Collapsible or Excerpt */}
        <div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#5C4A2A]">
          <div>
            <span className="font-mono text-[10px] uppercase font-bold text-[#7A6C5B] tracking-wider block mb-1">
              Role Description
            </span>
            <p className="line-clamp-4 whitespace-pre-line leading-relaxed">{job.description}</p>
          </div>
          <div>
            <span className="font-mono text-[10px] uppercase font-bold text-[#7A6C5B] tracking-wider block mb-1">
              Requirements
            </span>
            <p className="line-clamp-4 whitespace-pre-line leading-relaxed">{job.requirements}</p>
          </div>
        </div>
      </div>

      {/* Applications Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2
            className="text-xl font-bold text-[#1A1208]"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            Candidate Applications ({applications.length})
          </h2>
          <span className="text-xs font-mono text-[#7A6C5B]">
            {applications.filter((a) => a.status === "SHORTLISTED" || a.status === "INTERVIEWED").length} in shortlist
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white border border-[#E5DDD0] rounded-[2px] p-12 text-center shadow-xs">
            <i className="bi bi-people text-3xl text-[#C48D2A] mb-3 block" />
            <h3 className="font-serif text-lg font-bold text-[#1A1208]">No applications received yet</h3>
            <p className="text-xs text-[#7A6C5B] mt-1">
              Candidate submissions submitted on the public career page will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {applications.map((app) => {
              const isUpdating = updatingAppId === app.id
              const isExpanded = expandedLetterId === app.id
              const whatsappUrl = `https://wa.me/${app.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                `Hello ${app.fullName}, this is Osotua Farming HR regarding your application for the ${job.title} position.`
              )}`

              return (
                <div
                  key={app.id}
                  className="bg-white border border-[#E5DDD0] rounded-[2px] p-5 shadow-xs hover:border-[#D4A045] transition-all space-y-3"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Candidate Info */}
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-bold text-base text-[#1A1208]">{app.fullName}</span>
                        <Badge label={app.status} />
                        <span className="text-[11px] font-mono text-[#7A6C5B]">
                          Applied: {new Date(app.createdAt).toLocaleDateString("en-KE", { day: "numeric", month: "short", year: "numeric" })}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-[#7A6C5B] font-mono">
                        <span className="flex items-center gap-1.5">
                          <i className="bi bi-telephone text-[#C48D2A]" />
                          <a href={`tel:${app.phone}`} className="hover:underline text-[#1A1208] font-bold">
                            {app.phone}
                          </a>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <i className="bi bi-envelope text-[#C48D2A]" />
                          <a href={`mailto:${app.email}`} className="hover:underline">
                            {app.email}
                          </a>
                        </span>
                        {app.cvUrl && (
                          <a
                            href={app.cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#BA5932] font-bold hover:underline flex items-center gap-1"
                          >
                            <i className="bi bi-file-earmark-pdf" /> View CV
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Action buttons & status dropdown */}
                    <div className="flex items-center gap-2 flex-wrap shrink-0">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1.5 rounded-[2px] bg-[#E8EEDC] text-[#486326] border border-[#D2DCBE] text-xs font-mono font-bold flex items-center gap-1.5 hover:bg-[#d8e2c7] transition-colors"
                        title="WhatsApp Candidate"
                      >
                        <i className="bi bi-whatsapp" /> WhatsApp
                      </a>

                      {app.coverLetter && (
                        <button
                          onClick={() => setExpandedLetterId(isExpanded ? null : app.id)}
                          className="px-2.5 py-1.5 rounded-[2px] bg-[#FAF7F2] border border-[#DDD4C4] text-xs font-mono font-bold text-[#1A1208] hover:bg-[#EFE9DF] transition-colors"
                        >
                          {isExpanded ? "Hide Letter" : "Read Cover Letter"}
                        </button>
                      )}

                      <select
                        value={app.status}
                        disabled={isUpdating}
                        onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicantData["status"])}
                        className="bg-[#FAF7F2] border border-[#DDD4C4] rounded-[2px] px-2.5 py-1.5 text-xs font-mono font-bold text-[#1A1208] outline-none focus:border-[#D4A045] cursor-pointer"
                      >
                        {APP_STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>

                      <button
                        onClick={() => handleDeleteApplicant(app.id, app.fullName)}
                        disabled={isUpdating}
                        className="p-1.5 text-[#BA5932] hover:bg-[#FEF2F2] border border-transparent hover:border-[#FCA5A5] rounded-[2px] transition-colors cursor-pointer"
                        title="Remove Candidate"
                      >
                        <i className="bi bi-trash text-sm" />
                      </button>
                    </div>
                  </div>

                  {/* Expanded Cover Letter */}
                  {isExpanded && app.coverLetter && (
                    <div className="mt-3 p-4 bg-[#FAF7F2] border border-[#EFE9DF] rounded-[2px] text-xs leading-relaxed text-[#1A1208]">
                      <span className="font-mono text-[10px] font-bold text-[#7A6C5B] uppercase tracking-wider block mb-1">
                        Cover Letter:
                      </span>
                      <p className="whitespace-pre-line">{app.coverLetter}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
