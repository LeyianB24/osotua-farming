"use client"

export default function NewsletterForm() {
  return (
    <form
      className="flex gap-3 flex-wrap"
      onSubmit={(e) => {
        e.preventDefault()
        const form = e.currentTarget
        const email = new FormData(form).get("email")
        alert(`Thank you! We'll be in touch at ${email}`)
        form.reset()
      }}
    >
      <input
        type="email"
        name="email"
        placeholder="your@email.com"
        required
        style={{
          background: "rgba(28,18,8,0.12)",
          borderColor: "rgba(28,18,8,0.2)",
          color: "#1C1208",
          border: "1px solid rgba(28,18,8,0.2)",
          borderRadius: "2px",
          padding: "0.8rem 1rem",
          fontSize: "0.9rem",
          outline: "none",
          minWidth: "260px",
        }}
      />
      <button
        type="submit"
        style={{
          background: "#1C1208",
          color: "#C4882A",
          padding: "0.8rem 1.75rem",
          borderRadius: "2px",
          fontSize: "0.875rem",
          fontWeight: 500,
          border: "none",
          cursor: "pointer",
        }}
      >
        Join the Ranch
      </button>
    </form>
  )
}