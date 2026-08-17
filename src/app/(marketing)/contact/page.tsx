import { Metadata } from "next";
import ContactClient from "@/components/farm/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — Osotua Farming",
  description: "Get in touch with Osotua Farming in Kajiado County, Kenya. Livestock purchases, farm orders, visits, and agribusiness inquiries.",
};

export default function ContactPage() {
  return <ContactClient />;
}
