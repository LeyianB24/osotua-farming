"use client";

import { useState } from "react";
import { AdminSection, AdminTable, AdminRow, TD, StatusBadge } from "@/components/shared/AdminSection";

interface PartnerItem {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  supplyType: string;
  status: string;
  createdAt: string;
}

export default function AdminPartnersClient({ initialPartners }: { initialPartners: PartnerItem[] }) {
  const [partners, setPartners] = useState<PartnerItem[]>(initialPartners);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleUpdateStatus = async (id: string, status: "APPROVED" | "ACTIVE" | "SUSPENDED" | "PENDING") => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/partners/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        setPartners((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status } : p))
        );
      } else {
        alert("Failed to update partner status");
      }
    } catch {
      alert("Network error");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleExportCSV = () => {
    const headers = ["Name", "Email", "Phone", "Location", "Supply Type", "Status", "Date"];
    const rows = partners.map((p) => [
      `"${p.fullName}"`,
      p.email,
      p.phone,
      `"${p.location}"`,
      `"${p.supplyType}"`,
      p.status,
      new Date(p.createdAt).toLocaleDateString(),
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `osotua_partner_farmers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminSection
      eyebrow="Supply Network"
      title="Partner Farmers"
      count={partners.length}
      countLabel="partner applications recorded"
      icon="bi-people-fill"
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
        headers={["Name", "Email", "Phone", "Location", "Supply Type", "Status", "Actions", "Date"]}
        empty={partners.length === 0}
        emptyIcon="bi-person-check"
        emptyText="No partner farmer applications recorded yet."
      >
        {partners.map((p, i) => (
          <AdminRow key={p.id} index={i}>
            <TD>{p.fullName}</TD>
            <TD muted>{p.email}</TD>
            <TD muted mono>{p.phone}</TD>
            <TD muted>{p.location}</TD>
            <TD muted>{p.supplyType}</TD>
            <TD>
              <StatusBadge status={p.status} />
            </TD>
            <td style={{ padding: "0.75rem 1.25rem" }}>
              <div className="flex items-center gap-2">
                {p.status !== "ACTIVE" && (
                  <button
                    disabled={updatingId === p.id}
                    onClick={() => handleUpdateStatus(p.id, "ACTIVE")}
                    className="px-2 py-1 bg-[#2E7D32]/12 border border-[#2E7D32]/35 text-[#2E7D32] text-[10px] font-mono font-bold rounded-lg hover:bg-[#2E7D32]/25"
                    title="Activate Partner"
                  >
                    Activate
                  </button>
                )}
                {p.status !== "SUSPENDED" && (
                  <button
                    disabled={updatingId === p.id}
                    onClick={() => handleUpdateStatus(p.id, "SUSPENDED")}
                    className="px-2 py-1 bg-[#A0431E]/12 border border-[#A0431E]/35 text-[#A0431E] text-[10px] font-mono font-bold rounded-lg hover:bg-[#A0431E]/25"
                    title="Suspend Partner"
                  >
                    Suspend
                  </button>
                )}
              </div>
            </td>
            <TD muted mono>{new Date(p.createdAt).toLocaleDateString("en-KE")}</TD>
          </AdminRow>
        ))}
      </AdminTable>
    </AdminSection>
  );
}
