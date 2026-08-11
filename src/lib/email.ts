import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock_key_for_build")
const FROM = "Osotua Farming <info@osotuafarming.co.ke>"

export async function sendOrderConfirmation({
  to,
  customerName,
  orderId,
  totalAmount,
}: {
  to: string
  customerName: string
  orderId: string
  totalAmount: number
}) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: `Order Confirmed — Osotua Farming #${orderId.slice(-6).toUpperCase()}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#1C1208;">Thank you, ${customerName}!</h2>
        <p>Your order <strong>#${orderId.slice(-6).toUpperCase()}</strong> has been received.</p>
        <p>Total: <strong>KES ${totalAmount.toLocaleString()}</strong></p>
        <p>Our team will reach out shortly to confirm details.</p>
        <hr/>
        <p style="color:#888;font-size:12px;">Osotua Farming · Kajiado, Kenya · info@osotuafarming.co.ke</p>
      </div>
    `,
  })
}

export async function sendVisitConfirmation({
  to,
  fullName,
  visitDate,
}: {
  to: string
  fullName: string
  visitDate: Date
}) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: "Farm Visit Booking — Osotua Farming",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#1C1208;">Visit Booked, ${fullName}!</h2>
        <p>Your farm visit is scheduled for <strong>${visitDate.toDateString()}</strong>.</p>
        <p>We look forward to welcoming you to Osotua Farming in Kajiado.</p>
        <hr/>
        <p style="color:#888;font-size:12px;">Osotua Farming · Kajiado, Kenya</p>
      </div>
    `,
  })
}

export async function sendApplicationReceived({
  to,
  fullName,
  jobTitle,
}: {
  to: string
  fullName: string
  jobTitle: string
}) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: "Application Received — Osotua Farming",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#1C1208;">We got your application, ${fullName}!</h2>
        <p>Thank you for applying for the <strong>${jobTitle}</strong> position at Osotua Farming.</p>
        <p>We will review your application and be in touch soon.</p>
        <hr/>
        <p style="color:#888;font-size:12px;">Osotua Farming · Kajiado, Kenya</p>
      </div>
    `,
  })
}
