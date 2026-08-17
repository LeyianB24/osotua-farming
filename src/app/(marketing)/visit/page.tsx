import { Metadata } from "next";
import VisitClient from "@/components/farm/VisitClient";

export const metadata: Metadata = {
  title: "Book a Guided Ranch Tour — Osotua Farming",
  description: "Schedule your private or group farm tour at our Kajiado rangeland estate. Inspect pedigree livestock and experience regenerative ranching.",
};

export default function VisitPage() {
  return <VisitClient />;
}
