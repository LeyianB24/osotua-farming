"use client";

import { useState } from "react";
import Link from "next/link";
import { AdminSection, AdminTable, AdminRow, TD, StatusBadge } from "@/components/shared/AdminSection";

interface OrderItem {
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
  "PENDING",
  "CONFIRMED",
  "DEPOSIT_PAID",
  "PAID",
  "PROCESSING",
  "READY",
  "DELIVERED",
  "CANCELLED",
];

export default function AdminOrdersClient({ initialOrders }: { initialOrders: OrderItem[] }) {
  const [orders, setOrders] = useState<OrderItem[]>(initialOrders);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = orders.filter(
    (o) =>
      o.customerName.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customerPhone.includes(search)
  );

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

  return (
    <AdminSection
      eyebrow="Sales Operations"
      title="Customer Orders"
      count={orders.length}
      countLabel="total orders recorded"
      icon="bi-receipt-cutoff"
      action={
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="btn-ghost text-xs py-2 px-3 flex items-center gap-1.5"
            style={{ color: "#1C1208", borderColor: "rgba(196,136,42,0.3)" }}
          >
            <i className="bi bi-file-earmark-spreadsheet" /> Export CSV
          </button>
        </div>
      }
    >
      {/* Search Filter Bar */}
      <div className="mb-4">
        <div className="relative max-w-sm">
          <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-[#8E5E16] text-xs" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders by customer or phone..."
            className="w-full bg-[#FFFFFF] border border-[#C4882A]/25 rounded-xl pl-9 pr-4 py-2 text-xs text-[#1C1208] outline-none focus:border-[#C4882A]"
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
              <Link href={`/orders/${order.id}`} className="hover:underline">
                #{order.id.slice(-8).toUpperCase()}
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
                  borderRadius: "8px",
                  padding: "0.25rem 0.5rem",
                  fontSize: "0.7rem",
                  fontFamily: "var(--font-space-grotesk), monospace",
                  fontWeight: 600,
                  color: "#1C1208",
                  outline: "none",
                  cursor: "pointer",
                }}
              >
                {ORDER_STATUS_OPTIONS.map((st) => (
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
