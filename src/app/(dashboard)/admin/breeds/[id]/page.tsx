import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import AdminBreedEditForm from "@/components/admin/AdminBreedEditForm"

export const metadata = { title: "Edit Breed — Osotua Admin" }

export default async function AdminBreedEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [breed, speciesList] = await Promise.all([
    prisma.breed.findUnique({ where: { id } }),
    prisma.species.findMany({ orderBy: { name: "asc" } }),
  ])

  if (!breed) notFound()

  return <AdminBreedEditForm breed={breed} speciesList={speciesList} />
}
