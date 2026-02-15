import Link from 'next/link'
import { notFound } from 'next/navigation'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import GeometricOverlay from '@/components/ui/GeometricOverlay'
import UnitProgressIndicator from '@/components/unit/UnitProgressIndicator'
import { getBookById } from '@/lib/data/curriculum'

export default async function BookPage({
  params,
}: {
  params: Promise<{ gradeId: string; bookId: string }>
}) {
  const { gradeId, bookId } = await params
  const book = await getBookById(gradeId, bookId)

  if (!book) {
    notFound()
  }

  return (
    <main className="min-h-screen relative">
      <GeometricOverlay variant="hexagons" className="fixed inset-0" />

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 sm:mb-12">
            <Link
              href={`/grade/${gradeId}`}
              className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 mb-4"
            >
              ← חזרה לבחירת ספר
            </Link>
            <h1 className="text-3xl sm:text-5xl font-bold font-display text-neutral-900 mb-3">
              {book.name}
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600">
              {book.description}
            </p>
          </div>

          <div className="space-y-4">
            {book.units.map((unit) => (
              <Link key={unit.id} href={`/grade/${gradeId}/book/${bookId}/unit/${unit.id}`}>
                <Card className="p-4 sm:p-6 flex items-start gap-3 sm:gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-xl sm:text-2xl font-bold text-primary-600">
                        {unit.order}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h2 className="text-2xl font-bold font-display text-neutral-900 mb-2">
                      {unit.name}
                    </h2>
                    <p className="text-neutral-600 mb-3">
                      {unit.description}
                    </p>

                    {unit.subSections && unit.subSections.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {unit.subSections.map((section, index) => (
                          <Badge key={index} variant="neutral" size="sm">
                            {section}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 flex gap-4 text-sm text-neutral-500">
                      <span>📚 {unit.concepts?.length || 0} מושגים</span>
                      <span>✍️ {unit.examples?.length || 0} דוגמאות</span>
                      <span>🎯 {unit.quizQuestions?.length || 0} שאלות</span>
                    </div>

                    <div className="mt-3">
                      <UnitProgressIndicator
                        unitId={unit.id}
                        totalQuestions={unit.quizQuestions?.length || 0}
                      />
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <div className="text-primary-500 text-2xl">←</div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
