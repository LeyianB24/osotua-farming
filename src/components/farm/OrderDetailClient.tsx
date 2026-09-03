"use client";

import Link from "next/link";
import Image from "next/image";

interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  product?: {
    id: string;
    name: string;
    image: string | null;
    unit: string;
  } | null;
  breed?: {
    id: string;
    name: string;
    image: string | null;
  } | null;
}

interface OrderData {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  type: string;
  status: string;
  totalAmount: number;
  depositAmount?: number | null;
  paymentMethod?: string | null;
  paymentRef?: string | null;
  deliveryAddress?: string | null;
  deliveryDate?: string | null;
  notes?: string | null;
  createdAt: string;
  items: OrderItem[];
}

const STATUS_STEPS = [
  { key: "PENDING", label: "Received", desc: "Order recorded in ranch ledger" },
  { key: "CONFIRMED", label: "Confirmed", desc: "Payment verified & allocated" },
  { key: "PROCESSING", label: "Cold-Packing", desc: "Harvested & butchered in cold room" },
  { key: "READY", label: "Dispatched", desc: "En route via cold-chain transit" },
  { key: "DELIVERED", label: "Delivered", desc: "Safely received at destination" },
];

function getStepIndex(status: string) {
  const normalized = status.toUpperCase();
  if (normalized === "CANCELLED") return -1;
  if (normalized === "PAID" || normalized === "DEPOSIT_PAID") return 1;
  const idx = STATUS_STEPS.findIndex((s) => s.key === normalized);
  return idx !== -1 ? idx : 0;
}

export default function OrderDetailClient({ order }: { order: OrderData }) {
  const currentStepIdx = getStepIndex(order.status);
  const isCancelled = order.status.toUpperCase() === "CANCELLED";
  const orderRef = order.paymentRef || `OST-${order.id.slice(-6).toUpperCase()}`;

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Osotua Farming! I am inquiring about my Order #${orderRef} (${order.customerName}).`
  );

  return (
    <div style={{ background: "#FBF7F0", minHeight: "100vh" }} className="pt-28 pb-20">
      <div className="os-container max-w-5xl">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div className="font-mono text-[11px] text-[#786550] tracking-wide flex items-center gap-2">
            <Link href="/" className="hover:text-[#C4882A] transition-colors font-bold">
              Home
            </Link>
            <span>/</span>
            <Link href="/dashboard" className="hover:text-[#C4882A] transition-colors font-bold">
              Orders
            </Link>
            <span>/</span>
            <span className="text-[#1C1208] font-bold">#{order.id.slice(-8).toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="btn-ghost text-xs py-2 px-4 flex items-center gap-1.5"
              style={{ color: "#1C1208", borderColor: "rgba(196,136,42,0.35)", background: "#FFFFFF" }}
            >
              <i className="bi bi-printer" />
              <span>Print Invoice</span>
            </button>
            <a
              href={`https://wa.me/254700000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-xs py-2 px-4 flex items-center gap-1.5 shadow-xs"
            >
              <i className="bi bi-whatsapp text-sm" />
              <span>Ranch Support</span>
            </a>
          </div>
        </div>

        {/* ── HEADER CARD ── */}
        <div
          style={{
            background: "#FFFFFF",
            border: "1px solid rgba(196, 136, 42, 0.25)",
            borderRadius: "28px",
            boxShadow: "0 16px 48px rgba(196, 136, 42, 0.08)",
          }}
          className="p-6 sm:p-10 mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#C4882A]/15">
            <div>
              <div className="eyebrow text-[#8E5E16] mb-1 font-bold">Official Order Invoice</div>
              <h1
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  fontWeight: 400,
                  color: "#1C1208",
                  lineHeight: 1.1,
                }}
              >
                Order #{order.id.slice(-8).toUpperCase()}
              </h1>
              <p className="text-xs text-[#5C4835] mt-1 font-mono">
                Placed on {new Date(order.createdAt).toLocaleDateString("en-KE", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>

            <div className="flex flex-col sm:items-end">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[#8E5E16] font-bold mb-1">
                Current Status
              </span>
              <span
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider"
                style={{
                  background: isCancelled
                    ? "rgba(196, 67, 30, 0.12)"
                    : order.status === "DELIVERED"
                    ? "rgba(46, 125, 50, 0.15)"
                    : "rgba(196, 136, 42, 0.15)",
                  color: isCancelled ? "#C2410C" : order.status === "DELIVERED" ? "#2E7D32" : "#8E5E16",
                  border: isCancelled
                    ? "1px solid rgba(196, 67, 30, 0.3)"
                    : order.status === "DELIVERED"
                    ? "1px solid rgba(46, 125, 50, 0.35)"
                    : "1px solid rgba(196, 136, 42, 0.35)",
                }}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{
                    background: isCancelled ? "#C2410C" : order.status === "DELIVERED" ? "#2E7D32" : "#C4882A",
                  }}
                />
                {order.status}
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          {!isCancelled && (
            <div className="pt-8 pb-4">
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {STATUS_STEPS.map((step, idx) => {
                  const isDone = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;
                  return (
                    <div key={step.key} className="flex flex-col items-start relative">
                      <div className="flex items-center gap-2 w-full mb-2">
                        <div
                          style={{
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            background: isCurrent
                              ? "#C4882A"
                              : isDone
                              ? "#2E7D32"
                              : "#FAF6EE",
                            color: isDone ? "#FFFFFF" : "#786550",
                            border: isCurrent
                              ? "1px solid #C4882A"
                              : isDone
                              ? "1px solid #2E7D32"
                              : "1px solid rgba(196, 136, 42, 0.25)",
                            boxShadow: isCurrent ? "0 0 0 3px rgba(196,136,42,0.2)" : "none",
                          }}
                          className="flex items-center justify-center text-xs font-mono font-bold shrink-0"
                        >
                          {isDone && !isCurrent ? <i className="bi bi-check-lg" /> : idx + 1}
                        </div>
                        <div
                          className="hidden sm:block flex-1 h-0.5 rounded-full"
                          style={{
                            background: isDone ? "#2E7D32" : "rgba(196, 136, 42, 0.15)",
                          }}
                        />
                      </div>
                      <span
                        className="font-mono text-[10px] font-bold uppercase tracking-wider"
                        style={{ color: isCurrent ? "#C4882A" : isDone ? "#1C1208" : "#8A7966" }}
                      >
                        {step.label}
                      </span>
                      <span className="text-[10px] text-[#5C4835] mt-0.5 leading-tight">{step.desc}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {isCancelled && (
            <div className="mt-6 p-4 rounded-xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs flex items-center gap-3">
              <i className="bi bi-x-circle-fill text-[#DC2626] text-xl" />
              <div>
                <p className="font-bold">This order has been cancelled.</p>
                <p className="text-[11px] text-[#7F1D1D]">
                  If you have already processed payment, our accounts department will issue a full refund or store credit.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── TWO-COLUMN DETAILS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Items breakdown */}
          <div className="lg:col-span-8 space-y-6">
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(196, 136, 42, 0.25)",
                borderRadius: "28px",
                boxShadow: "0 16px 48px rgba(196, 136, 42, 0.08)",
              }}
              className="p-6 sm:p-8"
            >
              <h2
                style={{
                  fontFamily: "var(--font-cormorant, 'Cormorant Garamond'), Georgia, serif",
                  fontSize: "1.8rem",
                  fontWeight: 400,
                  color: "#1C1208",
                  marginBottom: "1.5rem",
                }}
              >
                Ordered Items ({order.items.length})
              </h2>

              <div className="divide-y divide-[#C4882A]/15">
                {order.items.map((item) => {
                  const title = item.product?.name || item.breed?.name || "Ranch Item";
                  const image = item.product?.image || item.breed?.image;
                  const unit = item.product?.unit || "head";

                  return (
                    <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          style={{
                            width: "52px",
                            height: "52px",
                            borderRadius: "14px",
                            background: "#FAF6EE",
                            border: "1px solid rgba(196, 136, 42, 0.2)",
                            overflow: "hidden",
                          }}
                          className="relative shrink-0 flex items-center justify-center text-[#C4882A]"
                        >
                          {image ? (
                            <Image src={image} alt={title} fill className="object-cover" />
                          ) : (
                            <i className="bi bi-box-seam text-xl" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-[#1C1208] truncate">{title}</h4>
                          <p className="font-mono text-[11px] text-[#786550]">
                            {item.quantity} × KES {item.unitPrice.toLocaleString()} /{unit}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-serif text-base font-bold text-[#1C1208]">
                          KES {item.totalPrice.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Totals Summary */}
              <div className="mt-6 pt-6 border-t border-[#C4882A]/20 space-y-2">
                <div className="flex justify-between text-xs text-[#5C4835]">
                  <span>Items Subtotal</span>
                  <span className="font-mono font-medium text-[#1C1208]">
                    KES {order.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-[#5C4835]">
                  <span>Cold-Chain Delivery</span>
                  <span className="font-mono text-[#2E7D32] font-bold">Included</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-[#1C1208] pt-3 border-t border-[#C4882A]/15">
                  <span>Grand Total</span>
                  <span className="text-xl text-[#C4882A]">KES {order.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Customer, Delivery & Payment info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Delivery Info */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(196, 136, 42, 0.25)",
                borderRadius: "28px",
                boxShadow: "0 16px 48px rgba(196, 136, 42, 0.08)",
              }}
              className="p-6"
            >
              <div className="eyebrow text-[#8E5E16] mb-2 font-bold">Fulfillment Destination</div>
              <h3 className="font-bold text-sm text-[#1C1208] mb-3">{order.customerName}</h3>

              <div className="space-y-3 text-xs text-[#5C4835]">
                <div className="flex items-start gap-2.5">
                  <i className="bi bi-geo-alt-fill text-[#C4882A] text-sm shrink-0 mt-0.5" />
                  <span>{order.deliveryAddress || "Ranch Collection Depot (Kajiado)"}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <i className="bi bi-telephone-fill text-[#C4882A] text-xs shrink-0" />
                  <span className="font-mono">{order.customerPhone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <i className="bi bi-envelope-fill text-[#C4882A] text-xs shrink-0" />
                  <span>{order.customerEmail}</span>
                </div>
                {order.notes && (
                  <div className="pt-2 border-t border-[#C4882A]/15 text-[11px] text-[#786550] italic">
                    Note: &ldquo;{order.notes}&rdquo;
                  </div>
                )}
              </div>
            </div>

            {/* Payment Details */}
            <div
              style={{
                background: "#FFFFFF",
                border: "1px solid rgba(196, 136, 42, 0.25)",
                borderRadius: "28px",
                boxShadow: "0 16px 48px rgba(196, 136, 42, 0.08)",
              }}
              className="p-6"
            >
              <div className="eyebrow text-[#8E5E16] mb-2 font-bold">Payment Instrument</div>
              <div className="flex items-center gap-2.5 mb-3">
                <i className="bi bi-credit-card-2-front-fill text-[#C4882A] text-lg" />
                <span className="font-bold text-sm text-[#1C1208]">
                  {order.paymentMethod ? order.paymentMethod.toUpperCase() : "M-PESA"}
                </span>
              </div>

              <div className="space-y-2 text-xs text-[#5C4835] font-mono">
                <div className="flex justify-between">
                  <span className="text-[#786550]">Payment Ref:</span>
                  <span className="font-bold text-[#1C1208]">{orderRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#786550]">Amount Paid:</span>
                  <span className="font-bold text-[#2E7D32]">KES {order.totalAmount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Support CTA */}
            <div
              style={{
                background: "linear-gradient(135deg, #FAF5EB 0%, #F5EFE4 100%)",
                border: "1px solid rgba(196, 136, 42, 0.25)",
                borderRadius: "24px",
              }}
              className="p-6 text-center"
            >
              <i className="bi bi-shield-check text-2xl text-[#C4882A] mb-2 block" />
              <h4 className="font-serif text-lg font-bold text-[#1C1208] mb-1">Ranch Cold-Chain Guarantee</h4>
              <p className="text-[11px] text-[#5C4835] leading-relaxed mb-4">
                Temperature monitored rangeland transit. 100% pasture-raised meat and artisanal dairy freshness verified.
              </p>
              <Link href="/barn" className="btn-primary w-full justify-center py-2.5 text-xs">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
