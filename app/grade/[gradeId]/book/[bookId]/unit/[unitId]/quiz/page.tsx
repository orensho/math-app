import Link from 'next/link'
import { notFound } from 'next/navigation'
import QuizContainer from '@/components/quiz/QuizContainer'
import GeometricOverlay from '@/components/ui/GeometricOverlay'
import { getUnitById } from '@/lib/data/curriculum'

export default async function QuizPage({
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
      <GeometricOverlay variant="circles" className="fixed inset-0" />

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 sm:mb-12">
            <Link
              href={`/grade/${gradeId}/book/${bookId}/unit/${unitId}`}
              className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 mb-4"
            >
              ← חזרה ליחידה
            </Link>
            <h1 className="text-2xl sm:text-4xl font-bold font-display text-neutral-900 mb-3">
              חידון
            </h1>
            <h2 className="text-xl sm:text-2xl text-neutral-600 mb-2">
              {unit.name}
            </h2>
            <p className="text-neutral-500">
              {unit.quizQuestions?.length || 0} שאלות לבחינה עצמית
            </p>
          </div>

          {unit.quizQuestions && unit.quizQuestions.length > 0 ? (
            <QuizContainer questions={unit.quizQuestions} unitId={unitId} />
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-xl text-neutral-600">
                שאלות חידון יתווספו בקרוב
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
