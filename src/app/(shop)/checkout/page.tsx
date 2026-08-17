import { Metadata } from "next";
import CheckoutClient from "@/components/farm/CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout — Osotua Farming",
  description: "Secure M-Pesa and card checkout for fresh farm products and pedigree livestock orders.",
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
