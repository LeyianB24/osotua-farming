import Link from "next/link"
import Image from "next/image"
import { imageForCategory } from "@/lib/images"

interface Props {
  product: {
    id: string
    name: string
    slug: string
    price: number
    unit: string
    image: string | null
    inStock: boolean
    category: { name: string }
  }
  dark?: boolean
}

const categoryIcons: Record<string, string> = {
  "Beef Cuts": "🥩",
  "Dairy Products": "🥛",
  "Vegetables": "🥬",
  "Fruits": "🍋",
  "Ranch Box": "📦",
  "Goat Meat": "🐐",
  "Sheep Meat": "🐑",
}

export default function ProductCard({ product, dark }: Props) {
  const icon = categoryIcons[product.category.name] || "🌿"
  const src = product.image ?? imageForCategory(product.category.name)
  const textColor = dark ? "text-[#F5EFE4]" : "text-[#1C1208]"
  const subColor = dark ? "text-[#F5EFE4]/45" : "text-[#1C1208]/50"
  const cardBg = dark ? "bg-[#F5EFE4]/05 border-[#C4882A]/15 hover:bg-[#C4882A]/08 hover:border-[#C4882A]/40" : "bg-white border-[#1C1208]/08 hover:shadow-lg"

  return (
    <Link
      href={`/barn/${product.slug}`}
      className={`group block border rounded p-5 transition-all duration-300 ${cardBg}`}
    >
      {src ? (
        <div className="relative mb-4 aspect-[4/3] overflow-hidden rounded-sm bg-[#1C1208]/05">
          <Image
            src={src}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="text-3xl mb-4">{icon}</div>
      )}
      <div className={`font-serif text-lg font-semibold mb-1 ${textColor}`}>{product.name}</div>
      <div className={`text-xs mb-4 ${subColor}`}>{product.category.name}</div>
      <div className="flex items-center justify-between">
        <span className="font-semibold text-[#C4882A]">
          KES {product.price.toLocaleString()}
          <span className={`font-normal text-xs ml-1 ${subColor}`}>/{product.unit}</span>
        </span>
        {!product.inStock && (
          <span className="font-mono text-[9px] text-[#A0431E] border border-[#A0431E]/30 px-2 py-1 rounded-sm">
            Out of Stock
          </span>
        )}
      </div>
    </Link>
  )
}
