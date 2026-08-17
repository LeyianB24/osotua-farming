import { Metadata } from "next";
import { LoginClient } from "@/components/shared/AuthForms";

export const metadata: Metadata = {
  title: "Member Sign In — Osotua Farming",
  description: "Access your customer orders, member subscriptions, and partner producer portal.",
};

export default function LoginPage() {
  return <LoginClient />;
}
