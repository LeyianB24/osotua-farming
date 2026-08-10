"use client";

import { useCart } from "./CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Info, AlertTriangle, X } from "lucide-react";

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
            className="pointer-events-auto flex items-start gap-3 p-4 bg-[#1C1208] text-[#F5EFE4] rounded-md shadow-2xl border border-[#C4882A]/30 backdrop-blur-lg"
          >
            {toast.type === "success" && (
              <CheckCircle2 className="text-[#C4882A] shrink-0 mt-0.5" size={18} />
            )}
            {toast.type === "info" && (
              <Info className="text-sky-400 shrink-0 mt-0.5" size={18} />
            )}
            {toast.type === "warning" && (
              <AlertTriangle className="text-amber-400 shrink-0 mt-0.5" size={18} />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-mono font-semibold text-[#C4882A] uppercase tracking-wider">
                {toast.title}
              </h4>
              <p className="text-xs text-[#F5EFE4]/80 mt-0.5 leading-relaxed">
                {toast.message}
              </p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#F5EFE4]/40 hover:text-[#F5EFE4] transition-colors p-1"
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
