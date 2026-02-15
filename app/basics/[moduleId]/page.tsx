import Link from 'next/link'
import { notFound } from 'next/navigation'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import GeometricOverlay from '@/components/ui/GeometricOverlay'
import { getBasicsModule } from '@/lib/data/curriculum'

export default async function ModulePage({
  params,
}: {
  params: Promise<{ moduleId: string }>
}) {
  const { moduleId } = await params
  const module = await getBasicsModule(moduleId)

  if (!module) {
    notFound()
  }

  const sections = [
    {
      id: 'concepts',
      title: 'מושגי יסוד',
      description: 'למד את העקרונות הבסיסיים',
      icon: '📚',
      href: `/basics/${moduleId}/concepts`,
      count: module.concepts.length,
    },
    {
      id: 'tables',
      title: 'טבלאות',
      description: 'צפה בטבלאות המלאות',
      icon: '📊',
      href: `/basics/${moduleId}/tables`,
      count: module.tables.length,
    },
    {
      id: 'quiz',
      title: 'חידון',
      description: 'בחן את עצמך',
      icon: '🎯',
      href: `/basics/${moduleId}/quiz`,
      count: module.quizQuestions.length,
    },
  ]

  return (
    <main className="min-h-screen relative">
      <GeometricOverlay variant="circles" className="fixed inset-0" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Link
              href="/basics"
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
            >
              <span>←</span>
              <span>חזרה ליסודות</span>
            </Link>

            <h1 className="text-5xl font-bold font-display text-neutral-900 mb-4">
              {module.name}
            </h1>
            <p className="text-xl text-neutral-600">
              {module.description}
            </p>
          </div>

          {/* Sections */}
          <div className="grid gap-6 md:grid-cols-3">
            {sections.map((section) => (
              <Link key={section.id} href={section.href}>
                <Card className="p-6 group h-full">
                  <div className="text-center">
                    <div className="text-5xl mb-4">{section.icon}</div>
                    <h2 className="text-2xl font-bold font-display text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {section.title}
                    </h2>
                    <p className="text-neutral-600 mb-4">
                      {section.description}
                    </p>
                    <Badge variant="primary">
                      {section.count} {section.id === 'concepts' ? 'מושגים' : section.id === 'tables' ? 'טבלאות' : 'שאלות'}
                    </Badge>
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
