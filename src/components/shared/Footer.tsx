import Link from "next/link"

const footerLinks = {
  Livestock: [
    { label: "Beef Cattle", href: "/breeds?type=beef" },
    { label: "Dairy Cattle", href: "/breeds?type=dairy" },
    { label: "Goats", href: "/breeds?type=goats" },
    { label: "Sheep", href: "/breeds?type=sheep" },
    { label: "Import Orders", href: "/breeds#import" },
  ],
  "The Barn": [
    { label: "Beef Cuts", href: "/barn?category=beef" },
    { label: "Dairy Products", href: "/barn?category=dairy" },
    { label: "Vegetables", href: "/barn?category=vegetables" },
    { label: "Fruits", href: "/barn?category=fruits" },
    { label: "Ranch Box", href: "/barn?category=box" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Invest", href: "/invest" },
    { label: "Partner Farmers", href: "/partners" },
    { label: "Contact", href: "/contact" },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-[#1C1208] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-[#F5EFE4]/10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-[#C4882A] flex items-center justify-center font-serif text-[#1C1208] font-semibold text-xs">
                OF
              </div>
              <span className="font-serif text-[#F5EFE4] font-semibold">
                Osotua Farming
              </span>
            </div>
            <p className="font-serif italic text-[#F5EFE4]/40 text-sm mb-4 leading-relaxed">
              "From Our Land,<br />To Your Table"
            </p>
            <div className="font-mono text-[10px] text-[#F5EFE4]/30 tracking-wide leading-loose">
              Kajiado County, Kenya<br />
              info@osotuafarming.co.ke<br />
              +254 700 000 000
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <div className="font-mono text-[10px] text-[#C4882A] tracking-widest uppercase mb-5">
                {group}
              </div>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[#F5EFE4]/45 hover:text-[#C4882A] text-sm transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 font-mono text-[10px] text-[#F5EFE4]/20 tracking-wide">
          <span>© {new Date().getFullYear()} Osotua Farming. All rights reserved.</span>
          <span>
            Built by{" "}
            <span className="text-[#C4882A]">Bezalel Technologies LTD</span>
          </span>
        </div>
      </div>
    </footer>
  )
}
