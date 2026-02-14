import Link from 'next/link'
import Card from '@/components/ui/Card'
import GeometricOverlay from '@/components/ui/GeometricOverlay'
import { GRADES } from '@/lib/data/curriculum'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <GeometricOverlay variant="circles" className="fixed inset-0" />

      <div className="relative z-10 container mx-auto px-4 py-24">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-6xl font-bold font-display text-neutral-900 mb-6 animate-fade-in">
            מתמטיקול
          </h1>
          <p className="text-2xl text-neutral-600 mb-4">
            שבילים פלוס
          </p>
          <p className="text-lg text-neutral-500 mb-16">
            למידה אינטראקטיבית עם תרגול, דוגמאות וחידונים
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-16">
            {GRADES.map((grade, index) => (
              <Link key={grade.id} href={`/grade/${grade.id}`}>
                <Card
                  className="p-8 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-5xl font-bold text-primary-500 mb-2 group-hover:scale-110 transition-transform">
                    {grade.displayName}
                  </div>
                  <div className="text-lg text-neutral-700">
                    {grade.name}
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
