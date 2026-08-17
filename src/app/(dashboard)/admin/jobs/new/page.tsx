import EntityForm from "@/components/admin/EntityForm"

export const metadata = { title: "Post Vacancy — Admin" }

export default async function NewJobPage() {
  return (
    <EntityForm
      title="Post New Career Opening"
      action="/api/jobs"
      backHref="/admin/jobs"
      fields={[
        { kind: "text", name: "title", label: "Job Title", placeholder: "e.g. Senior Herd Agronomist", required: true },
        { kind: "text", name: "department", label: "Department", placeholder: "e.g. Livestock Management, Agronomy, Logistics", required: true, default: "Livestock" },
        { kind: "text", name: "location", label: "Work Location", placeholder: "e.g. Kajiado Ranch / Nairobi Office", required: true, default: "Kajiado Ranch" },
        { kind: "text", name: "type", label: "Employment Type", placeholder: "e.g. Full-time / Seasonal / Contract", required: true, default: "Full-time" },
        { kind: "textarea", name: "description", label: "Job Description & Responsibilities", required: true, placeholder: "Key responsibilities..." },
        { kind: "textarea", name: "requirements", label: "Qualifications & Requirements", required: true, placeholder: "Degree, certifications, years experience..." },
        { kind: "checkbox", name: "isOpen", label: "Open for Applications", default: true },
      ]}
    />
  )
}
