"use client";

import { useState } from "react";
import { AdminSection, AdminTable, AdminRow, TD, StatusBadge } from "@/components/shared/AdminSection";

interface VisitItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  groupSize: number;
  visitDate: string;
  purpose?: string | null;
  status: string;
}

export default function AdminVisitsClient({ initialVisits }: { initialVisits: VisitItem[] }) {
  const [visits, setVisits] = useState<VisitItem[]>(initialVisits);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleUpdateStatus = async (id: string, status: "CONFIRMED" | "CANCELLED" | "PENDING") => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/visits/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setVisits((prev) =>
          prev.map((v) => (v.id === id ? { ...v, status } : v))
        );
      } else {
        alert("Failed to update visit status");
      }
    } catch {
      alert("Network error");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Group Size", "Visit Date", "Purpose", "Status"];
    const rows = visits.map((v) => [
      `"${v.fullName}"`,
      v.email,
      v.phone,
      v.groupSize,
      new Date(v.visitDate).toDateString(),
      `"${(v.purpose || "").replace(/"/g, '""')}"`,
      v.status,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `osotua_farm_visits_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminSection
      eyebrow="Agritourism & Visits"
      title="Farm Visit Bookings"
      count={visits.length}
      countLabel="visit bookings recorded"
      icon="bi-calendar-event-fill"
      action={
        <button
          onClick={handleExportCSV}
          className="btn-ghost text-xs py-2 px-3 flex items-center gap-1.5"
          style={{ color: "#1C1208", borderColor: "rgba(196,136,42,0.3)" }}
        >
          <i className="bi bi-file-earmark-spreadsheet" /> Export CSV
        </button>
      }
    >
      <AdminTable
        headers={["Name", "Email", "Phone", "Group", "Date", "Purpose", "Status", "Actions"]}
        empty={visits.length === 0}
        emptyIcon="bi-calendar-x"
        emptyText="No farm visit bookings have been made yet."
      >
        {visits.map((v, i) => (
          <AdminRow key={v.id} index={i}>
            <TD>{v.fullName}</TD>
            <TD muted>{v.email}</TD>
            <TD muted mono>{v.phone}</TD>
            <TD mono accent>{v.groupSize}</TD>
            <TD mono>{new Date(v.visitDate).toDateString()}</TD>
            <TD muted>{v.purpose || "—"}</TD>
            <TD>
              <StatusBadge status={v.status} />
            </TD>
            <td style={{ padding: "0.75rem 1.25rem" }}>
              <div className="flex items-center gap-2">
                {v.status !== "CONFIRMED" && (
                  <button
                    disabled={updatingId === v.id}
                    onClick={() => handleUpdateStatus(v.id, "CONFIRMED")}
                    className="px-2 py-1 bg-[#2E7D32]/12 border border-[#2E7D32]/35 text-[#2E7D32] text-[10px] font-mono font-bold rounded-lg hover:bg-[#2E7D32]/25"
                    title="Confirm Booking"
                  >
                    Confirm
                  </button>
                )}
                {v.status !== "CANCELLED" && (
                  <button
                    disabled={updatingId === v.id}
                    onClick={() => handleUpdateStatus(v.id, "CANCELLED")}
                    className="px-2 py-1 bg-[#A0431E]/12 border border-[#A0431E]/35 text-[#A0431E] text-[10px] font-mono font-bold rounded-lg hover:bg-[#A0431E]/25"
                    title="Cancel Booking"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </td>
          </AdminRow>
        ))}
      </AdminTable>
    </AdminSection>
  );
}
