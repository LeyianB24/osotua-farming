import { Metadata } from "next";
import CartClient from "@/components/farm/CartClient";

export const metadata: Metadata = {
  title: "Shopping Basket — Osotua Farming",
  description: "View and manage your farm produce and pedigree livestock order basket.",
};

export default function CartPage() {
  return <CartClient />;
}
