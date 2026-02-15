import Link from 'next/link'
import Card from '@/components/ui/Card'
import GeometricOverlay from '@/components/ui/GeometricOverlay'
import { BASICS_MODULES } from '@/lib/data/curriculum'

export default function BasicsPage() {
  return (
    <main className="min-h-screen relative">
      <GeometricOverlay variant="triangles" className="fixed inset-0" />

      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-6 sm:mb-12">
            <h1 className="text-3xl sm:text-5xl font-bold font-display text-neutral-900 mb-4">
              יסודות
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600">
              מיומנויות בסיס חשובות לכל התלמידים
            </p>
          </div>

          <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
            {BASICS_MODULES.map((module) => (
              <Link key={module.id} href={`/basics/${module.id}`}>
                <Card className="p-5 sm:p-8 group h-full">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">{module.icon}</div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold font-display text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                        {module.name}
                      </h2>
                      <p className="text-neutral-600">
                        {module.description}
                      </p>
                    </div>
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
