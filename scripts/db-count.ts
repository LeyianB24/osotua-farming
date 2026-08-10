import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
  const [species, breeds, cats, products] = await Promise.all([
    prisma.species.count(),
    prisma.breed.count(),
    prisma.productCategory.count(),
    prisma.product.count(),
  ])
  console.log(JSON.stringify({ species, breeds, cats, products }, null, 2))
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
