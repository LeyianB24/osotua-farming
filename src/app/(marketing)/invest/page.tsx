import { Metadata } from "next";
import InvestClient from "@/components/farm/InvestClient";

export const metadata: Metadata = {
  title: "Invest in Regenerative Agribusiness",
  description: "Asset-backed livestock enterprise and cold-chain retail investment opportunities in Kajiado County, Kenya.",
};

export default function InvestPage() {
  return <InvestClient />;
}
