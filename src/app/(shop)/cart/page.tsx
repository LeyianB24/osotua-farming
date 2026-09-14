import { Metadata } from "next";
import CartClient from "@/components/farm/CartClient";

export const metadata: Metadata = {
  title: "Shopping Basket",
  description: "View and manage your farm produce and pedigree livestock order basket.",
  robots: { index: false, follow: false },
};

export default function CartPage() {
  return <CartClient />;
}
