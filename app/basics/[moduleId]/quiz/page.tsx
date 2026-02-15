import Link from 'next/link'
import { notFound } from 'next/navigation'
import GeometricOverlay from '@/components/ui/GeometricOverlay'
import GeneratedQuizContainer from '@/components/quiz/GeneratedQuizContainer'
import { getBasicsModule } from '@/lib/data/curriculum'

export default async function QuizPage({
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

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <Link
              href={`/basics/${moduleId}`}
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
            >
              <span>←</span>
              <span>חזרה ל{module.name}</span>
            </Link>

            <h1 className="text-5xl font-bold font-display text-neutral-900 mb-4">
              חידון
            </h1>
            <p className="text-xl text-neutral-600">
              {module.name} - שאלות חדשות בכל פעם!
            </p>
          </div>

          <GeneratedQuizContainer
            moduleId={moduleId}
            moduleName={module.name}
            questionCount={10}
          />
        </div>
      </div>
    </main>
  )
}
