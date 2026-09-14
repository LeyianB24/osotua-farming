import { Metadata } from "next";
import CheckoutClient from "@/components/farm/CheckoutClient";

export const metadata: Metadata = {
  title: "Secure Checkout",
  description: "Secure M-Pesa and card checkout for fresh farm products and pedigree livestock orders.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
