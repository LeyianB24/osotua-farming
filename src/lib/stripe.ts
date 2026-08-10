import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_mock")

export async function createPaymentIntent(amount: number, orderId: string) {
  return stripe.paymentIntents.create({
    amount: Math.ceil(amount * 100),
    currency: "kes",
    metadata: { orderId },
  })
}
