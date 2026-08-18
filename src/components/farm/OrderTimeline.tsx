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
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#C4882A]/25 -translate-y-1/2 z-0" />

        {STEPS.map((step) => {
          const state = getStepState(step.key)
          const isCompleted = state === "completed"
          const isCancelled = state === "cancelled"

          return (
            <div key={step.key} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCancelled
                    ? "bg-[#C2410C]/15 border-[#C2410C] text-[#C2410C]"
                    : isCompleted
                    ? "bg-[#C4882A] border-[#C4882A] text-white shadow-md shadow-[#C4882A]/25"
                    : "bg-[#FFFFFF] border-[#C4882A]/30 text-[#786550]"
                }`}
              >
                <i className={`bi ${step.icon} text-base`} />
              </div>
              <span
                className={`mt-2 text-[0.7rem] font-mono tracking-wider uppercase text-center max-w-[90px] ${
                  isCompleted ? "text-[#8E5E16] font-bold" : "text-[#786550]"
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
