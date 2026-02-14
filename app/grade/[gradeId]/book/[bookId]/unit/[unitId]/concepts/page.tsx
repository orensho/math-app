import Link from 'next/link'
import { notFound } from 'next/navigation'
import ConceptCard from '@/components/concept/ConceptCard'
import GeometricOverlay from '@/components/ui/GeometricOverlay'
import { getUnitById } from '@/lib/data/curriculum'

export default async function ConceptsPage({
  params,
}: {
  params: Promise<{ gradeId: string; bookId: string; unitId: string }>
}) {
  const { gradeId, bookId, unitId } = await params
  const unit = await getUnitById(gradeId, bookId, unitId)

  if (!unit) {
    notFound()
  }

  return (
    <main className="min-h-screen relative">
      <GeometricOverlay variant="triangles" className="fixed inset-0" />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <Link
              href={`/grade/${gradeId}/book/${bookId}/unit/${unitId}`}
              className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 mb-4"
            >
              ← חזרה ליחידה
            </Link>
            <h1 className="text-4xl font-bold font-display text-neutral-900 mb-3">
              מושגי יסוד
            </h1>
            <h2 className="text-2xl text-neutral-600 mb-2">
              {unit.name}
            </h2>
            <p className="text-neutral-500">
              {unit.concepts?.length || 0} מושגים ללימוד
            </p>
          </div>

          {unit.concepts && unit.concepts.length > 0 ? (
            <div className="space-y-6">
              {unit.concepts
                .sort((a, b) => a.order - b.order)
                .map((concept, index) => (
                  <ConceptCard key={concept.id} concept={concept} index={index} />
                ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-xl text-neutral-600">
                מושגים יתווספו בקרוב
              </p>
            </div>
          )}

          <div className="mt-12 flex gap-4 justify-center">
            <Link
              href={`/grade/${gradeId}/book/${bookId}/unit/${unitId}/examples`}
              className="px-8 py-4 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-medium shadow-float hover:shadow-depth"
            >
              המשך לדוגמאות →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
