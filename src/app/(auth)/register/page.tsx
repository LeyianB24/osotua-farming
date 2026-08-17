import { Metadata } from "next";
import { RegisterClient } from "@/components/shared/AuthForms";

export const metadata: Metadata = {
  title: "Create Member Account — Osotua Farming",
  description: "Register for an Osotua Farming account to manage orders, schedule consultations, and access exclusive livestock releases.",
};

export default function RegisterPage() {
  return <RegisterClient />;
}
