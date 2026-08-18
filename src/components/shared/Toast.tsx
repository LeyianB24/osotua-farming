"use client";

import { useCart } from "./CartContext";
import { motion, AnimatePresence } from "framer-motion";

export default function ToastContainer() {
  const { toasts, removeToast } = useCart();

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(196, 136, 42, 0.3)",
              boxShadow: "0 16px 40px rgba(196, 136, 42, 0.12)",
              borderRadius: "16px",
            }}
            className="pointer-events-auto flex items-start gap-3 p-4 text-[#1C1208] backdrop-blur-lg"
          >
            {toast.type === "success" && (
              <i className="bi bi-check-circle-fill text-[#2E7D32] text-lg shrink-0 mt-0.5" />
            )}
            {toast.type === "info" && (
              <i className="bi bi-info-circle-fill text-[#C4882A] text-lg shrink-0 mt-0.5" />
            )}
            {toast.type === "warning" && (
              <i className="bi bi-exclamation-triangle-fill text-[#C2410C] text-lg shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-mono font-bold text-[#8E5E16] uppercase tracking-wider">
                {toast.title}
              </h4>
              <p className="text-xs text-[#5C4835] mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#786550] hover:text-[#1C1208] transition-colors p-1"
              aria-label="Close notification"
            >
              <i className="bi bi-x-lg text-xs" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
