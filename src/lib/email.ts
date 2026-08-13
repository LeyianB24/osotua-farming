import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock_key_for_build")
const FROM = "Osotua Farming <info@osotuafarming.co.ke>"
const ADMIN_EMAIL = "info@osotuafarming.co.ke"

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

export async function sendContactNotification({
  fromName,
  fromEmail,
  subject,
  message,
  phone,
}: {
  fromName: string
  fromEmail: string
  subject: string
  message: string
  phone?: string
}) {
  return resend.emails.send({
    from: FROM,
    to: ADMIN_EMAIL,
    replyTo: fromEmail,
    subject: `[Contact Form] ${subject} — from ${fromName}`,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#1C1208;">New Contact Enquiry</h2>
        <table style="width:100%;border-collapse:collapse;">
          <tr><td style="padding:8px;color:#555;font-weight:bold;">Name</td><td style="padding:8px;">${fromName}</td></tr>
          <tr><td style="padding:8px;color:#555;font-weight:bold;">Email</td><td style="padding:8px;"><a href="mailto:${fromEmail}">${fromEmail}</a></td></tr>
          ${phone ? `<tr><td style="padding:8px;color:#555;font-weight:bold;">Phone</td><td style="padding:8px;">${phone}</td></tr>` : ""}
          <tr><td style="padding:8px;color:#555;font-weight:bold;">Subject</td><td style="padding:8px;">${subject}</td></tr>
        </table>
        <hr style="margin:16px 0;"/>
        <h3 style="color:#1C1208;">Message</h3>
        <p style="white-space:pre-wrap;background:#f9f9f9;padding:16px;border-left:3px solid #C4882A;">${message}</p>
        <hr/>
        <p style="color:#888;font-size:12px;">Osotua Farming · Kajiado, Kenya · info@osotuafarming.co.ke</p>
      </div>
    `,
  })
}

export async function sendInvestorProspectus({
  to,
  fullName,
  amount,
  durationYears,
  investmentType,
  estimatedReturn,
}: {
  to: string
  fullName: string
  amount: number
  durationYears: number
  investmentType: string
  estimatedReturn: number
}) {
  const typeLabel = investmentType === "breeding" ? "Livestock Breeding Enterprise" : "Barn Store Network"
  return resend.emails.send({
    from: FROM,
    to,
    subject: "Your Osotua Farming Investment Brief — 2026",
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:auto;">
        <h2 style="color:#1C1208;">Thank you for your interest, ${fullName}!</h2>
        <p>We have received your investment enquiry for the <strong>${typeLabel}</strong>.</p>
        <table style="width:100%;border-collapse:collapse;margin:20px 0;">
          <tr style="background:#f5efe4;">
            <td style="padding:10px;font-weight:bold;">Investment Amount</td>
            <td style="padding:10px;">KES ${amount.toLocaleString()}</td>
          </tr>
          <tr>
            <td style="padding:10px;font-weight:bold;">Duration</td>
            <td style="padding:10px;">${durationYears} year${durationYears !== 1 ? "s" : ""}</td>
          </tr>
          <tr style="background:#f5efe4;">
            <td style="padding:10px;font-weight:bold;">Projected Return</td>
            <td style="padding:10px;">KES ${estimatedReturn.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
          </tr>
        </table>
        <p>Our investor relations team will contact you within 2 business days with the full 2026 Investment Brief and next steps.</p>
        <p style="color:#888;font-size:12px;">*Projections based on historical yield rates and rangeland expansion modeling. Past performance does not guarantee future results.</p>
        <hr/>
        <p style="color:#888;font-size:12px;">Osotua Farming · Kajiado, Kenya · info@osotuafarming.co.ke</p>
      </div>
    `,
  })
}
