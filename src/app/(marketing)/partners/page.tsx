import { Metadata } from "next";
import PartnersClient from "@/components/farm/PartnersClient";

export const metadata: Metadata = {
  title: "Partner Farmers Outgrower Scheme — Osotua Farming",
  description: "Join our network of partner producers in Kenya. Guaranteed offtake agreements, agronomy training, and input support.",
};

export default function PartnersPage() {
  return <PartnersClient />;
}
