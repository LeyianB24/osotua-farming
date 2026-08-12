interface OrderTimelineProps {
  status: string
}

const STEPS = [
  { key: "PENDING", label: "Order Placed", icon: "bi-cart-check" },
  { key: "CONFIRMED", label: "Confirmed", icon: "bi-shield-check" },
  { key: "PROCESSING", label: "Preparing / Batching", icon: "bi-gear-wide-connected" },
  { key: "DELIVERED", label: "Delivered / Fulfilled", icon: "bi-house-check-fill" },
]

export default function OrderTimeline({ status }: OrderTimelineProps) {
  const getStepState = (stepKey: string) => {
    const statusOrder = ["PENDING", "CONFIRMED", "DEPOSIT_PAID", "PAID", "PROCESSING", "READY", "DELIVERED"]
    const currentIndex = statusOrder.indexOf(status)
    const stepIndex = statusOrder.indexOf(stepKey)

    if (status === "CANCELLED") return "cancelled"
    if (currentIndex >= stepIndex && currentIndex !== -1) return "completed"
    return "upcoming"
  }

  return (
    <div className="w-full py-6">
      <div className="relative flex items-center justify-between">
        {/* Background connector line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#C4882A]/20 -translate-y-1/2 z-0" />

        {STEPS.map((step, idx) => {
          const state = getStepState(step.key)
          const isCompleted = state === "completed"
          const isCancelled = state === "cancelled"

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCancelled
                    ? "bg-[#A0431E]/20 border-[#A0431E] text-[#A0431E]"
                    : isCompleted
                    ? "bg-[#C4882A] border-[#C4882A] text-[#1C1208] shadow-lg shadow-[#C4882A]/30"
                    : "bg-[#1C1208] border-[#C4882A]/30 text-[#F5EFE4]/40"
                }`}
              >
                <i className={`bi ${step.icon} text-base`} />
              </div>
              <span
                className={`mt-2 text-[0.7rem] font-mono tracking-wider uppercase text-center max-w-[90px] ${
                  isCompleted ? "text-[#C4882A] font-semibold" : "text-[#F5EFE4]/40"
                }`}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
