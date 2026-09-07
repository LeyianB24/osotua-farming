import Navbar from "@/components/shared/Navbar"
import Footer from "@/components/shared/Footer"
import RangelandsTelemetry from "@/components/shared/RangelandsTelemetry"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      <div className="pt-[72px]">
        <RangelandsTelemetry />
      </div>
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  )
}

