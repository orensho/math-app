import Link from 'next/link'
import { notFound } from 'next/navigation'
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import GeometricOverlay from '@/components/ui/GeometricOverlay'
import { getUnitById } from '@/lib/data/curriculum'

export default async function UnitPage({
  params,
}: {
  params: Promise<{ gradeId: string; bookId: string; unitId: string }>
}) {
  const { gradeId, bookId, unitId } = await params
  const unit = await getUnitById(gradeId, bookId, unitId)

  if (!unit) {
    notFound()
  }

  const sections = [
    {
      title: 'מושגי יסוד',
      description: 'למד את העקרונות המרכזיים של הנושא',
      href: `concepts`,
      icon: '📚',
      color: 'from-blue-500 to-cyan-500',
      count: unit.concepts?.length || 0,
    },
    {
      title: 'דוגמאות',
      description: 'תרגול עם פתרונות מפורטים צעד אחר צעד',
      href: `examples`,
      icon: '✍️',
      color: 'from-purple-500 to-pink-500',
      count: unit.examples?.length || 0,
    },
    {
      title: 'חידון',
      description: 'בחן את עצמך וצבור נקודות',
      href: `quiz`,
      icon: '🎯',
      color: 'from-amber-500 to-orange-500',
      count: unit.quizQuestions?.length || 0,
    },
  ]

  return (
    <main className="min-h-screen relative">
      <GeometricOverlay variant="circles" className="fixed inset-0" />

      <div className="relative z-10 container mx-auto px-4 py-8 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6 sm:mb-12">
            <Link
              href={`/grade/${gradeId}/book/${bookId}`}
              className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 mb-4"
            >
              חזרה לרשימת יחידות →
            </Link>
            <h1 className="text-2xl sm:text-4xl font-bold font-display text-neutral-900 mb-3">
              {unit.name}
            </h1>
            <p className="text-lg text-neutral-600 mb-6">
              {unit.description}
            </p>

            {unit.subSections && unit.subSections.length > 0 && (
              <div className="p-4 sm:p-6 bg-primary-50 rounded-xl">
                <h2 className="text-xl font-semibold mb-3">תתי נושאים:</h2>
                <ul className="space-y-2">
                  {unit.subSections.map((section, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <span className="text-primary-600">•</span>
                      <span>{section}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {sections.map((section) => (
              <Link
                key={section.href}
                href={`/grade/${gradeId}/book/${bookId}/unit/${unitId}/${section.href}`}
              >
                <Card className="h-full group relative overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${section.color} rounded-t-2xl`} />
                  <div className="p-6">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                      {section.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-neutral-900">
                      {section.title}
                    </h3>
                    <p className="text-neutral-600 mb-4 text-sm">
                      {section.description}
                    </p>
                    {section.count > 0 && (
                      <Badge variant="primary" size="sm">
                        {section.count} פריטים
                      </Badge>
                    )}
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
