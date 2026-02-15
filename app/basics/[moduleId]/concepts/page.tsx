import Link from 'next/link'
import { notFound } from 'next/navigation'
import GeometricOverlay from '@/components/ui/GeometricOverlay'
import ConceptCard from '@/components/concept/ConceptCard'
import { getBasicsModule } from '@/lib/data/curriculum'

export default async function ConceptsPage({
  params,
}: {
  params: Promise<{ moduleId: string }>
}) {
  const { moduleId } = await params
  const module = await getBasicsModule(moduleId)

  if (!module) {
    notFound()
  }

  return (
    <main className="min-h-screen relative">
      <GeometricOverlay variant="circles" className="fixed inset-0" />

      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-12">
            <Link
              href={`/basics/${moduleId}`}
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
            >
              <span>←</span>
              <span>חזרה ל{module.name}</span>
            </Link>

            <h1 className="text-3xl sm:text-5xl font-bold font-display text-neutral-900 mb-4">
              מושגי יסוד
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600">
              {module.name}
            </p>
          </div>

          <div className="space-y-6">
            {module.concepts.map((concept, index) => (
              <ConceptCard key={concept.id} concept={concept} index={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
