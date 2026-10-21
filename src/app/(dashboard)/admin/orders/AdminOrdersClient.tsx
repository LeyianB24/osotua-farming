"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminSection, AdminTable, AdminRow, TD, StatusBadge } from "@/components/shared/AdminSection";

export interface OrderItem {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  type: string;
  totalAmount: number;
  status: string;
  paymentMethod?: string | null;
  paymentRef?: string | null;
  createdAt: string;
}

const ORDER_STATUS_OPTIONS = [
  "ALL",
  "PENDING",
  "CONFIRMED",
  "PAID",
  "PROCESSING",
  "READY",
  "DELIVERED",
  "CANCELLED",
];

export default function AdminOrdersClient({ initialOrders }: { initialOrders: OrderItem[] }) {
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = orders.filter((o) => {
    const matchesStatus = statusFilter === "ALL" || o.status.toUpperCase() === statusFilter;
    const q = search.toLowerCase();
    const matchesSearch =
      !q ||
      o.customerName.toLowerCase().includes(q) ||
      o.id.toLowerCase().includes(q) ||
      o.customerPhone.includes(q) ||
      o.customerEmail.toLowerCase().includes(q) ||
      (o.paymentRef && o.paymentRef.toLowerCase().includes(q));
    return matchesStatus && matchesSearch;
  });

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setUpdatingId(orderId);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      } else {
        alert("Failed to update status");
      }
    } catch {
      alert("Network error updating status");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleExportCSV = () => {
    const headers = ["Order ID", "Customer", "Email", "Phone", "Type", "Amount KES", "Status", "Payment Ref", "Date"];
    const rows = orders.map((o) => [
      o.id,
      `"${o.customerName}"`,
      o.customerEmail,
      o.customerPhone,
      o.type,
      o.totalAmount,
      o.status,
      o.paymentRef || "",
      new Date(o.createdAt).toLocaleDateString(),
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `osotua_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const totalRevenue = orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <AdminSection
      eyebrow="Sales Operations"
      title="Customer Orders"
      count={orders.length}
      countLabel={`orders recorded · KES ${totalRevenue.toLocaleString()} volume`}
      icon="bi-receipt-cutoff"
      action={
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="btn-ghost text-xs py-2 px-3 flex items-center gap-1.5 cursor-pointer"
            style={{ color: "#F5EFE4", borderColor: "rgba(196,136,42,0.3)" }}
          >
            <i className="bi bi-file-earmark-spreadsheet" /> Export CSV
          </button>
        </div>
      }
    >
      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-4">
        {/* Status Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {ORDER_STATUS_OPTIONS.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 text-[11px] font-mono font-bold tracking-wider rounded-[2px] uppercase transition-all cursor-pointer ${
                statusFilter === st
                  ? "bg-[#D4A045] text-[#160F08] shadow-xs"
                  : "bg-[#251A10] text-[#A89886] border border-[#3A2D1F] hover:bg-[#322315]"
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Search Filter Bar */}
        <div className="relative max-w-sm w-full sm:w-64">
          <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-[#8E5E16] text-xs" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders, phone, ref..."
            className="w-full bg-[#FFFFFF] border border-[#C4882A]/25 rounded-[2px] pl-9 pr-4 py-1.5 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
          />
        </div>
      </div>

      <AdminTable
        headers={["Order Ref", "Customer", "Phone", "Amount (KES)", "Status", "Quick Action", "Date"]}
        empty={filtered.length === 0}
        emptyIcon="bi-receipt"
        emptyText="No matching orders found."
      >
        {filtered.map((order, i) => (
          <AdminRow key={order.id} index={i}>
            <TD mono accent>
              <Link
                href={`/orders/${order.id}`}
                className="hover:underline flex items-center gap-1"
                title="View customer invoice and live dispatch tracker"
              >
                #{order.id.slice(-8).toUpperCase()}
                <i className="bi bi-box-arrow-up-right text-[10px] opacity-70" />
              </Link>
            </TD>
            <TD>{order.customerName}</TD>
            <TD muted mono>{order.customerPhone}</TD>
            <TD mono>KES {order.totalAmount.toLocaleString()}</TD>
            <TD>
              <StatusBadge status={order.status} />
            </TD>
            <td style={{ padding: "0.75rem 1.25rem" }}>
              <select
                value={order.status}
                disabled={updatingId === order.id}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
                style={{
                  background: "#FAF6EE",
                  border: "1px solid rgba(196, 136, 42, 0.3)",
                  borderRadius: "2px",
                  padding: "0.25rem 0.5rem",
                  fontSize: "0.7rem",
                  fontFamily: "var(--font-space-grotesk), monospace",
                  fontWeight: 600,
                  color: "#1C1208",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {ORDER_STATUS_OPTIONS.filter((s) => s !== "ALL").map((st) => (
                  <option key={st} value={st}>
                    {st}
                  </option>
                ))}
              </select>
            </td>
            <TD muted mono>{new Date(order.createdAt).toLocaleDateString("en-KE")}</TD>
          </AdminRow>
        ))}
      </AdminTable>
    </AdminSection>
  );
}
