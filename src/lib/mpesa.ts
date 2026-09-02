const MPESA_ENV = process.env.MPESA_ENV || "sandbox"
const BASE_URL =
  MPESA_ENV === "production"
    ? "https://api.safaricom.co.ke"
    : "https://sandbox.safaricom.co.ke"

async function getAccessToken(): Promise<string> {
  const key = process.env.MPESA_CONSUMER_KEY!
  const secret = process.env.MPESA_CONSUMER_SECRET!
  const credentials = Buffer.from(`${key}:${secret}`).toString("base64")

  const res = await fetch(
    `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`,
    {
      headers: { Authorization: `Basic ${credentials}` },
    }
  )

  const data = await res.json()
  return data.access_token
}

export async function stkPush({
  phone,
  amount,
  orderId,
}: {
  phone: string
  amount: number
  orderId: string
}) {
  const token = await getAccessToken()
  const shortcode = process.env.MPESA_SHORTCODE!
  const passkey = process.env.MPESA_PASSKEY!
  const timestamp = new Date()
    .toISOString()
    .replace(/[-T:.Z]/g, "")
    .slice(0, 14)
  const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString(
    "base64"
  )

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.NEXTAUTH_URL || "https://osotua-farming.vercel.app"
  const callbackUrl = `${appUrl}/api/payments/mpesa/callback`

  const res = await fetch(`${BASE_URL}/mpesa/stkpush/v1/processrequest`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.ceil(amount),
      PartyA: phone.replace(/^0/, "254"),
      PartyB: shortcode,
      PhoneNumber: phone.replace(/^0/, "254"),
      CallBackURL: callbackUrl,
      AccountReference: `OSOTUA-${orderId}`,
      TransactionDesc: "Osotua Farming Payment",
    }),
  })

  return res.json()
}
