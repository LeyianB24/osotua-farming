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
  { key: "PENDING", label: "Order Placed", icon: "bi-receipt-cutoff", desc: "Recorded in ranch ledger" },
  { key: "CONFIRMED", label: "Payment Confirmed", icon: "bi-check2-circle", desc: "Allocated & verified" },
  { key: "PROCESSING", label: "Cold-Pack Prep", icon: "bi-box-seam-fill", desc: "Butchered & vacuum sealed" },
  { key: "READY", label: "In Cold Transit", icon: "bi-truck", desc: "Dispatched via refrigerated van" },
  { key: "DELIVERED", label: "Delivered", icon: "bi-house-heart-fill", desc: "Safely received" },
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
  const shortId = order.id.slice(-8).toUpperCase();
  const orderRef = order.paymentRef || `OST-${shortId}`;

  const handlePrint = () => {
    window.print();
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Osotua Farming Ranch Concierge, I am inquiring regarding my Order #${orderRef} (${order.customerName}).`
  );

  return (
    <div
      style={{
        background: "linear-gradient(180deg, #FAF6EE 0%, #F5EFE4 100%)",
        minHeight: "100vh",
      }}
      className="pt-28 pb-24 text-[#1C1208]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 text-xs font-mono text-[#786550]">
            <Link href="/" className="hover:text-[#C4882A] transition-colors font-bold flex items-center gap-1">
              <i className="bi bi-house-door" /> Home
            </Link>
            <span className="text-[#C4882A]/50">/</span>
            <Link href="/dashboard/orders" className="hover:text-[#C4882A] transition-colors font-bold">
              Orders
            </Link>
            <span className="text-[#C4882A]/50">/</span>
            <span className="text-[#1C1208] font-bold font-mono tracking-wider">#{shortId}</span>
          </div>

          <div className="flex items-center gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#FFFFFF] hover:bg-[#FAF6EE] text-[#1C1208] border border-[#C4882A]/30 shadow-xs transition-all cursor-pointer"
            >
              <i className="bi bi-printer text-sm text-[#C4882A]" />
              <span>Print Invoice</span>
            </button>
            <a
              href={`https://wa.me/254700000000?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[#2E7D32] hover:bg-[#256327] text-[#FFFFFF] shadow-sm transition-all"
            >
              <i className="bi bi-whatsapp text-sm" />
              <span>Ranch Concierge</span>
            </a>
          </div>
        </div>

        {/* ── HERO INVOICE HEADER CARD ── */}
        <div className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-6 sm:p-10 shadow-lg shadow-[#1C1208]/04 mb-8 relative overflow-hidden">
          {/* Subtle background glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 pointer-events-none"
            style={{
              background: "radial-gradient(circle at top right, rgba(196, 136, 42, 0.12) 0%, transparent 70%)",
            }}
          />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#C4882A]/15 relative z-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-[#C4882A]/12 border border-[#C4882A]/30 text-[#8E5E16] mb-3">
                <i className="bi bi-patch-check-fill text-[#C4882A]" />
                Official Ranch Invoice &amp; Live Tracking
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1C1208] font-normal tracking-tight">
                Order <span className="font-mono text-2xl sm:text-3xl lg:text-4xl font-bold text-[#C4882A] tracking-wider ml-1">#{shortId}</span>
              </h1>
              <p className="text-xs text-[#5C4835] mt-2 font-mono flex items-center gap-2">
                <i className="bi bi-calendar3 text-[#C4882A]" />
                <span>
                  Placed on {new Date(order.createdAt).toLocaleDateString("en-KE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:items-end shrink-0">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#8E5E16] font-bold mb-1.5">
                Current Fulfillment State
              </span>
              <div
                className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider ${
                  isCancelled
                    ? "bg-[#FEF2F2] border border-[#FCA5A5] text-[#DC2626]"
                    : order.status === "DELIVERED"
                    ? "bg-[#2E7D32]/15 border border-[#2E7D32]/35 text-[#2E7D32]"
                    : "bg-[#C4882A]/15 border border-[#C4882A]/35 text-[#8E5E16]"
                }`}
              >
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isCancelled
                      ? "bg-[#DC2626]"
                      : order.status === "DELIVERED"
                      ? "bg-[#2E7D32]"
                      : "bg-[#C4882A] animate-pulse"
                  }`}
                />
                <span>{order.status.replace("_", " ")}</span>
              </div>
            </div>
          </div>

          {/* ── STEPPER TIMELINE ── */}
          {!isCancelled && (
            <div className="pt-8">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                {STATUS_STEPS.map((step, idx) => {
                  const isDone = idx <= currentStepIdx;
                  const isCurrent = idx === currentStepIdx;
                  return (
                    <div
                      key={step.key}
                      className={`relative p-4 rounded-2xl border transition-all ${
                        isCurrent
                          ? "bg-[#FAF5EB] border-[#C4882A] ring-2 ring-[#C4882A]/25 shadow-xs"
                          : isDone
                          ? "bg-[#F3F9F3] border-[#2E7D32]/30 text-[#1C1208]"
                          : "bg-[#FAF8F5]/60 border-[#C4882A]/15 opacity-70"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <div
                          className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold font-mono ${
                            isCurrent
                              ? "bg-[#C4882A] text-[#FFFFFF] shadow-sm shadow-[#C4882A]/40"
                              : isDone
                              ? "bg-[#2E7D32] text-[#FFFFFF]"
                              : "bg-[#EAE4D7] text-[#786550]"
                          }`}
                        >
                          {isDone && !isCurrent ? (
                            <i className="bi bi-check-lg text-sm" />
                          ) : (
                            <span>{idx + 1}</span>
                          )}
                        </div>
                        <i
                          className={`bi ${step.icon} text-sm ${
                            isCurrent ? "text-[#C4882A]" : isDone ? "text-[#2E7D32]" : "text-[#786550]/60"
                          }`}
                        />
                      </div>
                      <div
                        className={`text-xs font-bold uppercase tracking-wider font-mono ${
                          isCurrent ? "text-[#C4882A]" : isDone ? "text-[#1C1208]" : "text-[#786550]"
                        }`}
                      >
                        {step.label}
                      </div>
                      <div className="text-[11px] text-[#5C4835] mt-1 leading-tight">{step.desc}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {isCancelled && (
            <div className="mt-6 p-5 rounded-2xl bg-[#FEF2F2] border border-[#FCA5A5] text-[#991B1B] text-xs flex items-center gap-3">
              <i className="bi bi-x-circle-fill text-[#DC2626] text-2xl shrink-0" />
              <div>
                <p className="font-bold text-sm">This order has been cancelled.</p>
                <p className="text-[11px] text-[#7F1D1D] mt-0.5">
                  If payment was initiated, our treasury concierge will issue a full automated refund or ranch store credit.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* ── TWO-COLUMN MAIN DETAILS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 7 cols: Items Table & Totals */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-6 sm:p-8 shadow-lg shadow-[#1C1208]/04">
              <div className="flex items-center justify-between pb-4 border-b border-[#C4882A]/15 mb-4">
                <h2 className="font-serif text-2xl text-[#1C1208] font-normal">
                  Ranch Harvested Items <span className="text-sm font-mono text-[#8E5E16] font-bold">({order.items.length})</span>
                </h2>
                <span className="text-[11px] font-mono uppercase text-[#786550]">Cold-Packed</span>
              </div>

              <div className="divide-y divide-[#C4882A]/12">
                {order.items.map((item) => {
                  const title = item.product?.name || item.breed?.name || "Ranch Product";
                  const image = item.product?.image || item.breed?.image;
                  const unit = item.product?.unit || "head";

                  return (
                    <div key={item.id} className="py-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-14 h-14 rounded-2xl bg-[#FAF5EB] border border-[#C4882A]/20 relative overflow-hidden shrink-0 flex items-center justify-center text-[#C4882A]">
                          {image ? (
                            <Image src={image} alt={title} fill className="object-cover" />
                          ) : (
                            <i className="bi bi-box-seam text-2xl" />
                          )}
                        </div>

                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-[#1C1208] truncate hover:text-[#C4882A] transition-colors">
                            {title}
                          </h4>
                          <div className="font-mono text-xs text-[#786550] mt-0.5">
                            {item.quantity} × KES {item.unitPrice.toLocaleString()} <span className="text-[10px]">/{unit}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-mono text-sm sm:text-base font-bold text-[#1C1208]">
                          KES {item.totalPrice.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Financial Calculation Breakdown */}
              <div className="mt-6 pt-6 border-t border-[#C4882A]/20 space-y-2.5">
                <div className="flex justify-between text-xs text-[#5C4835]">
                  <span>Items Subtotal</span>
                  <span className="font-mono font-bold text-[#1C1208]">
                    KES {order.totalAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-[#5C4835]">
                  <span>Refrigerated Cold-Chain Dispatch</span>
                  <span className="font-mono text-[#2E7D32] font-bold">Complimentary</span>
                </div>
                <div className="flex justify-between items-center text-base pt-4 border-t border-[#C4882A]/20">
                  <span className="font-serif text-lg font-bold text-[#1C1208]">Grand Total Amount</span>
                  <span className="font-mono text-xl sm:text-2xl font-bold text-[#C4882A]">
                    KES {order.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right 5 cols: Destination, Payment & Guarantee */}
          <div className="lg:col-span-5 space-y-6">
            {/* Fulfillment Destination Card */}
            <div className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-6 shadow-lg shadow-[#1C1208]/04">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#8E5E16] font-bold mb-3">
                <i className="bi bi-geo-alt-fill text-[#C4882A]" />
                Fulfillment Destination
              </div>
              <h3 className="font-bold text-sm text-[#1C1208] mb-3">{order.customerName}</h3>

              <div className="space-y-3 text-xs text-[#5C4835]">
                <div className="flex items-start gap-2.5 bg-[#FAF6EE] p-3 rounded-xl border border-[#C4882A]/15">
                  <i className="bi bi-pin-map-fill text-[#C4882A] text-sm shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{order.deliveryAddress || "Ranch Collection Depot (Kajiado Hub)"}</span>
                </div>
                <div className="flex items-center gap-2.5 pl-1">
                  <i className="bi bi-telephone-fill text-[#C4882A] text-xs shrink-0" />
                  <span className="font-mono font-medium text-[#1C1208]">{order.customerPhone}</span>
                </div>
                <div className="flex items-center gap-2.5 pl-1">
                  <i className="bi bi-envelope-fill text-[#C4882A] text-xs shrink-0" />
                  <span className="font-mono text-[#1C1208]">{order.customerEmail}</span>
                </div>
                {order.notes && (
                  <div className="pt-2 border-t border-[#C4882A]/15 text-[11px] text-[#786550] italic">
                    Special Note: &ldquo;{order.notes}&rdquo;
                  </div>
                )}
              </div>
            </div>

            {/* Payment Ledger Card */}
            <div className="bg-[#FFFFFF] border border-[#C4882A]/25 rounded-3xl p-6 shadow-lg shadow-[#1C1208]/04">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#8E5E16] font-bold mb-3">
                <i className="bi bi-credit-card-2-front-fill text-[#C4882A]" />
                Payment Settlement Ledger
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-[#FAF6EE] border border-[#C4882A]/15 mb-3">
                <span className="font-bold text-xs text-[#1C1208]">
                  {order.paymentMethod ? order.paymentMethod.toUpperCase() : "M-PESA"}
                </span>
                <span className="font-mono text-[11px] font-bold text-[#2E7D32] bg-[#2E7D32]/12 px-2.5 py-1 rounded-full border border-[#2E7D32]/30">
                  Paid KES {order.totalAmount.toLocaleString()}
                </span>
              </div>

              <div className="space-y-2 text-xs font-mono text-[#5C4835]">
                <div className="flex justify-between items-center py-1 border-b border-[#C4882A]/10">
                  <span className="text-[#786550]">Payment Ref:</span>
                  <span className="font-bold text-[#1C1208]">{orderRef}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-[#786550]">Ranch Ledger ID:</span>
                  <span className="text-[#786550] text-[11px]">{order.id}</span>
                </div>
              </div>
            </div>

            {/* Cold-Chain Promise Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#FAF5EB] to-[#F5EFE4] border border-[#C4882A]/30 text-center shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#C4882A]/15 border border-[#C4882A]/30 flex items-center justify-center text-[#C4882A] mx-auto mb-3">
                <i className="bi bi-shield-check text-2xl" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#1C1208] mb-1">Ranch Cold-Chain Certified</h4>
              <p className="text-[11px] text-[#5C4835] leading-relaxed mb-4">
                100% pasture-fed Angus/Boran beef &amp; purebred breeding pedigree guaranteed by Osotua Farming Kajiado.
              </p>
              <Link
                href="/barn"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-[#C4882A] hover:bg-[#A8721F] text-[#FFFFFF] shadow-sm transition-all"
              >
                <i className="bi bi-bag" />
                <span>Explore Barn Store</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
