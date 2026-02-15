import Link from 'next/link'
import Card from '@/components/ui/Card'
import GeometricOverlay from '@/components/ui/GeometricOverlay'
import { GRADES } from '@/lib/data/curriculum'

export default function Home() {
  return (
    <main className="min-h-screen relative flex items-center">
      <GeometricOverlay variant="circles" className="fixed inset-0" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-10">
            <h1 className="text-6xl font-bold font-display text-neutral-900 mb-2 animate-fade-in">
              מתמטיקול
            </h1>
            <p className="text-xl text-primary-600 font-medium mb-3">
              ללמוד מתמטיקה בכיף!
            </p>
            <p className="text-neutral-600 max-w-xl mx-auto">
              אתר לימוד מתמטיקה חינמי בעברית לתלמידי בית ספר יסודי.
              {' '}מושגים, דוגמאות, איורים אינטראקטיביים וחידונים - הכל במקום אחד.
            </p>
          </div>

          {/* Benefits - compact row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
            <div className="bg-white/80 rounded-xl p-4 text-center shadow-sm">
              <span className="text-2xl">🆓</span>
              <div className="text-sm font-bold text-neutral-900 mt-1">חינם לגמרי</div>
            </div>
            <div className="bg-white/80 rounded-xl p-4 text-center shadow-sm">
              <span className="text-2xl">🎨</span>
              <div className="text-sm font-bold text-neutral-900 mt-1">איורים אינטראקטיביים</div>
            </div>
            <div className="bg-white/80 rounded-xl p-4 text-center shadow-sm">
              <span className="text-2xl">✍️</span>
              <div className="text-sm font-bold text-neutral-900 mt-1">פתרון צעד אחר צעד</div>
            </div>
            <div className="bg-white/80 rounded-xl p-4 text-center shadow-sm">
              <span className="text-2xl">🎯</span>
              <div className="text-sm font-bold text-neutral-900 mt-1">חידונים עם ציון</div>
            </div>
          </div>

          {/* Basics + Grades side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <Link href="/basics">
              <Card className="p-6 group h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🎓</div>
                  <h2 className="text-2xl font-bold font-display text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                    יסודות
                  </h2>
                  <p className="text-neutral-600 text-sm">
                    לוח כפל, חילוק ועוד מיומנויות בסיס
                  </p>
                </div>
              </Card>
            </Link>

            <div>
              <h2 className="text-lg font-bold font-display text-neutral-900 text-center mb-3">
                בחרו כיתה
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {GRADES.map((grade) => (
                  <Link key={grade.id} href={`/grade/${grade.id}`}>
                    <Card className="p-4 group">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary-500 group-hover:scale-110 transition-transform">
                          {grade.displayName}
                        </div>
                        <div className="text-xs text-neutral-600">
                          {grade.name}
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Parents - compact */}
          <div className="bg-white/80 rounded-xl p-6 shadow-sm max-w-2xl mx-auto">
            <h3 className="text-lg font-bold font-display text-neutral-900 mb-2 text-center">להורים</h3>
            <p className="text-neutral-600 text-sm text-center leading-relaxed">
              <strong>מתמטיקול</strong> הוא אתר חינמי המבוסס על תוכנית &quot;שבילים פלוס&quot; של משרד החינוך.
              {' '}הילדים לומדים בעצמאות עם הסברים, דיאגרמות אינטראקטיביות וחידונים.
              {' '}בלי הרשמה, בלי פרסומות - פשוט לפתוח ולהתחיל.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
