import Link from 'next/link'
import { notFound } from 'next/navigation'
import GeometricOverlay from '@/components/ui/GeometricOverlay'
import Card from '@/components/ui/Card'
import { getBasicsModule } from '@/lib/data/curriculum'

export default async function TablesPage({
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
      <GeometricOverlay variant="triangles" className="fixed inset-0" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <Link
              href={`/basics/${moduleId}`}
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
            >
              <span>←</span>
              <span>חזרה ל{module.name}</span>
            </Link>

            <h1 className="text-5xl font-bold font-display text-neutral-900 mb-4">
              טבלאות כפל
            </h1>
            <p className="text-xl text-neutral-600">
              כל הטבלאות במקום אחד
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {module.tables.map((table) => (
              <Card key={table.id} className="p-6">
                <h2 className="text-2xl font-bold font-display text-neutral-900 mb-4 text-center">
                  {table.title}
                </h2>
                <div className="space-y-2">
                  {table.rows.map((row, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-2 px-4 rounded-lg bg-neutral-50 hover:bg-primary-50 transition-colors"
                    >
                      <span className="font-mono text-neutral-700">
                        {row.expression}
                      </span>
                      <span className="font-mono font-bold text-primary-600">
                        = {row.result}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
