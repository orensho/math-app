import Link from 'next/link'
import { notFound } from 'next/navigation'
import Card from '@/components/ui/Card'
import GeometricOverlay from '@/components/ui/GeometricOverlay'
import { GRADES, BOOKS_BY_GRADE } from '@/lib/data/curriculum'

export default async function GradePage({
  params,
}: {
  params: Promise<{ gradeId: string }>
}) {
  const { gradeId } = await params
  const grade = GRADES.find((g) => g.id === gradeId)
  const books = BOOKS_BY_GRADE[gradeId] || []

  if (!grade) {
    notFound()
  }

  return (
    <main className="min-h-screen relative">
      <GeometricOverlay variant="squares" className="fixed inset-0" />

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 sm:mb-12">
            <Link
              href="/"
              className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 mb-4"
            >
              ← חזרה לבחירת כיתה
            </Link>
            <h1 className="text-3xl sm:text-5xl font-bold font-display text-neutral-900 mb-3">
              {grade.name}
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600">
              בחר ספר לימוד
            </p>
          </div>

          {books.length === 0 ? (
            <Card className="p-6 sm:p-12 text-center" hover={false}>
              <div className="text-4xl sm:text-6xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-neutral-700 mb-2">
                בקרוב!
              </h2>
              <p className="text-neutral-600">
                תכנים עבור {grade.name} יתווספו בהמשך
              </p>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {books.map((book) => (
                <Link key={book.id} href={`/grade/${gradeId}/book/${book.id}`}>
                  <Card className="p-5 sm:p-8 h-full">
                    <div className="text-4xl mb-4">📖</div>
                    <h2 className="text-2xl font-bold font-display text-neutral-900 mb-2">
                      {book.name}
                    </h2>
                    <p className="text-neutral-600">
                      {book.description}
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
