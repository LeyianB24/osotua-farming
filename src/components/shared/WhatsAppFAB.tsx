"use client"

export default function WhatsAppFAB() {
  return (
    <a
      href="https://wa.me/254700000000?text=Hello%20Osotua%20Farming!%20I%20would%20like%20to%20enquire%20about%20your%20products."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="whatsapp-fab"
      id="whatsapp-fab"
    >
      <i className="bi bi-whatsapp" style={{ fontSize: "1.55rem", position: "relative", zIndex: 1 }} />
    </a>
  )
}
