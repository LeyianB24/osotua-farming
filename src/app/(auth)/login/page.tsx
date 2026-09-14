import { Metadata } from "next";
import { LoginClient } from "@/components/shared/AuthForms";

export const metadata: Metadata = {
  title: "Member Sign In",
  description: "Access your customer orders, member subscriptions, and partner producer portal.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginClient />;
}
