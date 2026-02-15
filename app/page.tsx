import Link from 'next/link'
import Card from '@/components/ui/Card'
import GeometricOverlay from '@/components/ui/GeometricOverlay'
import { GRADES } from '@/lib/data/curriculum'

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <GeometricOverlay variant="circles" className="fixed inset-0" />

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-20 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-7xl font-bold font-display text-neutral-900 mb-4 animate-fade-in">
              מתמטיקול
            </h1>
            <p className="text-2xl text-primary-600 font-medium mb-6">
              ללמוד מתמטיקה בכיף!
            </p>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              אתר לימוד מתמטיקה חינמי בעברית לתלמידי בית ספר יסודי.
              {' '}מושגים, דוגמאות, איורים אינטראקטיביים וחידונים - הכל במקום אחד.
            </p>

            <div className="flex gap-4 justify-center flex-wrap">
              <Link
                href="/grade/6"
                className="px-8 py-4 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-medium text-lg shadow-float"
              >
                התחילו ללמוד
              </Link>
              <Link
                href="/basics"
                className="px-8 py-4 bg-white text-primary-600 rounded-xl hover:bg-primary-50 transition-colors font-medium text-lg shadow-float border-2 border-primary-200"
              >
                יסודות ולוח כפל
              </Link>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold font-display text-neutral-900 text-center mb-12">
            למה מתמטיקול?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card className="p-6 text-center" hover={false}>
              <div className="text-4xl mb-3">🆓</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">חינם לגמרי</h3>
              <p className="text-neutral-600 text-sm">
                בלי תשלום, בלי מנוי, בלי פרסומות. פשוט נכנסים ומתחילים.
              </p>
            </Card>
            <Card className="p-6 text-center" hover={false}>
              <div className="text-4xl mb-3">🎨</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">איורים אינטראקטיביים</h3>
              <p className="text-neutral-600 text-sm">
                ישר מספרים, תרשימי עוגה וזוויות שאפשר לגרור ולשנות בעצמכם.
              </p>
            </Card>
            <Card className="p-6 text-center" hover={false}>
              <div className="text-4xl mb-3">✍️</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">פתרון צעד אחר צעד</h3>
              <p className="text-neutral-600 text-sm">
                כל דוגמה מפורקת לשלבים קטנים עם הסברים ברורים.
              </p>
            </Card>
            <Card className="p-6 text-center" hover={false}>
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">חידונים עם ציון</h3>
              <p className="text-neutral-600 text-sm">
                בדקו את עצמכם, צברו נקודות ועקבו אחרי ההתקדמות.
              </p>
            </Card>
          </div>
        </section>

        {/* How it Works Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold font-display text-neutral-900 text-center mb-12">
            איך זה עובד?
          </h2>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">בחרו כיתה וספר</h3>
              <p className="text-neutral-600 text-sm">
                בחרו את הכיתה שלכם ואת הספר שאתם לומדים ממנו.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">למדו את המושגים</h3>
              <p className="text-neutral-600 text-sm">
                קראו הסברים, ראו דוגמאות ושחקו עם הדיאגרמות.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">בחנו את עצמכם</h3>
              <p className="text-neutral-600 text-sm">
                ענו על חידונים, קבלו משוב מיידי וצברו נקודות!
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold font-display text-neutral-900 text-center mb-4">
            מה יש באתר?
          </h2>
          <p className="text-neutral-600 text-center mb-12 max-w-xl mx-auto">
            תוכן לימודי מלא המבוסס על תוכנית &quot;שבילים פלוס&quot; של משרד החינוך
          </p>

          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/basics">
              <Card className="p-8 group">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">🎓</div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                      יסודות
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      לוח הכפל, חידון עם שאלות חדשות בכל פעם, ועוד מיומנויות בסיס.
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
            <Link href="/grade/6/book/shevilim-plus-16">
              <Card className="p-8 group">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📕</div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                      שבילים פלוס 16
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      כפל וחילוק שברים, המבנה העשרוני, אחוזים ועוד - 6 יחידות מלאות.
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
            <Link href="/grade/6/book/shevilim-plus-17">
              <Card className="p-8 group">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📗</div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                      שבילים פלוס 17
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      שברים ועשרוניים, זוויות, משולשים וממוצע - 8 יחידות מלאות.
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
            <Link href="/grade/6/book/shevilim-plus-18">
              <Card className="p-8 group">
                <div className="flex items-start gap-4">
                  <div className="text-4xl">📘</div>
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-1 group-hover:text-primary-600 transition-colors">
                      שבילים פלוס 18
                    </h3>
                    <p className="text-neutral-600 text-sm">
                      יחס, קנה מידה, בעיות תנועה, חקר נתונים ועוד - 8 יחידות מלאות.
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </section>

        {/* Grade Selection */}
        <section className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold font-display text-neutral-900 text-center mb-2">
            בחרו כיתה
          </h2>
          <p className="text-neutral-600 text-center mb-8">
            לחצו על הכיתה שלכם כדי להתחיל
          </p>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4 max-w-3xl mx-auto">
            {GRADES.map((grade, index) => (
              <Link key={grade.id} href={`/grade/${grade.id}`}>
                <Card
                  className="p-6 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-center">
                    <div className="text-4xl font-bold text-primary-500 mb-1 group-hover:scale-110 transition-transform">
                      {grade.displayName}
                    </div>
                    <div className="text-sm text-neutral-600">
                      {grade.name}
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* For Parents */}
        <section className="container mx-auto px-4 pt-12 pb-20">
          <div className="max-w-3xl mx-auto">
            <Card className="p-10" hover={false}>
              <h2 className="text-2xl font-bold font-display text-neutral-900 mb-4 text-center">
                להורים
              </h2>
              <div className="text-neutral-600 space-y-3 leading-relaxed">
                <p>
                  <strong>מתמטיקול</strong> הוא אתר לימודי חינמי שנבנה כדי לעזור לילדים ללמוד מתמטיקה בקצב שלהם.
                  האתר מבוסס על תוכנית הלימודים &quot;שבילים פלוס&quot; של משרד החינוך ומכיל את כל חומר הלימוד של כיתה ו&apos;.
                </p>
                <p>
                  הילד/ה יכול/ה ללמוד בעצמאות - לקרוא הסברים, לראות דוגמאות מפורטות, לשחק עם דיאגרמות אינטראקטיביות ולבחון את עצמם בחידונים.
                  המערכת שומרת על ההתקדמות באופן אוטומטי כדי שתוכלו לעקוב.
                </p>
                <p>
                  אין צורך בהרשמה, אין פרסומות, ואין תשלום. פשוט לפתוח ולהתחיל ללמוד.
                </p>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </main>
  )
}
