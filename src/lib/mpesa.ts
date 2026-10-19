const MPESA_ENV = process.env.MPESA_ENV || "sandbox"
const BASE_URL =
  MPESA_ENV === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke"

export function formatMpesaPhone(phone: string): string {
  let cleaned = phone.replace(/\D/g, "")
  if (cleaned.startsWith("0")) {
    cleaned = "254" + cleaned.slice(1)
  } else if (cleaned.startsWith("7") || cleaned.startsWith("1")) {
    cleaned = "254" + cleaned
  }
  return cleaned
}

export function getMpesaTimestamp(): string {
  const now = new Date()
  const pad = (n: number) => n.toString().padStart(2, "0")
  // Safaricom Daraja expects timestamp in East Africa Time (UTC+3)
  const eatOffsetMs = 3 * 60 * 60 * 1000
  const eatDate = new Date(now.getTime() + now.getTimezoneOffset() * 60 * 1000 + eatOffsetMs)
  return `${eatDate.getFullYear()}${pad(eatDate.getMonth() + 1)}${pad(eatDate.getDate())}${pad(eatDate.getHours())}${pad(eatDate.getMinutes())}${pad(eatDate.getSeconds())}`
}

export async function getAccessToken(): Promise<string> {
  const key = process.env.MPESA_CONSUMER_KEY!
  const secret = process.env.MPESA_CONSUMER_SECRET!
  const credentials = Buffer.from(`${key}:${secret}`).toString("base64")

  const res = await fetch(
    `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: { Authorization: `Basic ${credentials}` },
    }
  )

  if (!res.ok) {
    const errorText = await res.text()
    console.error("Daraja OAuth failed:", res.status, errorText)
    throw new Error(`Failed to get M-Pesa access token: ${errorText}`)
  }

  const data = await res.json()
  return data.access_token
}

export async function stkPush({
  phone,
  amount,
  orderId,
  accountRef,
}: {
  phone: string
  amount: number
  orderId: string
  accountRef?: string
}) {
  const token = await getAccessToken()
  const shortcode = process.env.MPESA_SHORTCODE || "174379"
  const passkey =
    process.env.MPESA_PASSKEY ||
    "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919"
  const timestamp = getMpesaTimestamp()
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64")

  let baseAppUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    process.env.NEXTAUTH_URL ||
    "https://osotua-farming.vercel.app"

  baseAppUrl = baseAppUrl.replace(/\/+$/, "")
  if (baseAppUrl.startsWith("http://") || baseAppUrl.includes("localhost") || baseAppUrl.includes("127.0.0.1")) {
    baseAppUrl = "https://osotua-farming.vercel.app"
  }

  const callbackUrl = `${baseAppUrl}/api/payments/mpesa/callback`

  const formattedPhone = formatMpesaPhone(phone)

  // AccountReference must be strictly alphanumeric and <= 12 characters for Daraja
  const sanitizedRef = (accountRef || `OST${orderId.replace(/[^a-zA-Z0-9]/g, "").slice(-8).toUpperCase()}`).slice(0, 12)

  const payload = {
    BusinessShortCode: shortcode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    Amount: Math.max(1, Math.ceil(amount)),
    PartyA: formattedPhone,
    PartyB: shortcode,
    PhoneNumber: formattedPhone,
    CallBackURL: callbackUrl,
    AccountReference: sanitizedRef,
    TransactionDesc: "OsotuaFarm",
  }

  console.log("Dispatching Daraja STK Push to:", formattedPhone, "amount:", payload.Amount, "ref:", sanitizedRef)

  const res = await fetch(`${BASE_URL}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })

  const text = await res.text()
  console.log("Daraja STK Push response status:", res.status, "body:", text)

  try {
    return JSON.parse(text)
  } catch {
    throw new Error(`Invalid response from Safaricom Daraja (${res.status}): ${text}`)
  }
}
