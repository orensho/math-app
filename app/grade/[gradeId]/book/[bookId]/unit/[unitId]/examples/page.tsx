import Link from 'next/link'
import { notFound } from 'next/navigation'
import ExampleCard from '@/components/example/ExampleCard'
import GeometricOverlay from '@/components/ui/GeometricOverlay'
import { getUnitById } from '@/lib/data/curriculum'

export default async function ExamplesPage({
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
      <GeometricOverlay variant="squares" className="fixed inset-0" />

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-12">
            <Link
              href={`/grade/${gradeId}/book/${bookId}/unit/${unitId}`}
              className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 mb-4"
            >
              ← חזרה ליחידה
            </Link>
            <h1 className="text-2xl sm:text-4xl font-bold font-display text-neutral-900 mb-3">
              דוגמאות ופתרונות
            </h1>
            <h2 className="text-xl sm:text-2xl text-neutral-600 mb-2">
              {unit.name}
            </h2>
            <p className="text-neutral-500">
              {unit.examples?.length || 0} דוגמאות עם פתרונות צעד אחר צעד
            </p>
          </div>

          {unit.examples && unit.examples.length > 0 ? (
            <div className="space-y-8">
              {unit.examples.map((example, index) => (
                <ExampleCard key={example.id} example={example} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">✍️</div>
              <p className="text-xl text-neutral-600">
                דוגמאות יתווספו בקרוב
              </p>
            </div>
          )}

          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link
              href={`/grade/${gradeId}/book/${bookId}/unit/${unitId}/concepts`}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-neutral-200 text-neutral-700 rounded-xl hover:bg-neutral-300 active:bg-neutral-400 transition-colors font-medium text-center"
            >
              ← חזרה למושגים
            </Link>
            <Link
              href={`/grade/${gradeId}/book/${bookId}/unit/${unitId}/quiz`}
              className="px-6 py-3 sm:px-8 sm:py-4 bg-primary-500 text-white rounded-xl hover:bg-primary-600 active:bg-primary-700 transition-colors font-medium shadow-float hover:shadow-depth text-center"
            >
              המשך לחידון →
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
