'use client'

import Link from 'next/link'
import { useProgress } from '@/contexts/ProgressContext'
import Card from '@/components/ui/Card'
import GeometricOverlay from '@/components/ui/GeometricOverlay'

export default function ProfilePage() {
  const { getTotalPoints, getCompletedUnitsCount, getQuizAccuracy } = useProgress()

  const totalPoints = getTotalPoints()
  const completedUnits = getCompletedUnitsCount()
  const accuracy = getQuizAccuracy()

  const hasActivity = totalPoints > 0

  return (
    <main className="min-h-screen relative">
      <GeometricOverlay variant="hexagons" className="fixed inset-0" />

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <Link
              href="/"
              className="text-primary-600 hover:text-primary-700 inline-flex items-center gap-2 mb-4"
            >
              ← חזרה לדף הבית
            </Link>
            <h1 className="text-5xl font-bold font-display text-neutral-900 mb-3">
              הפרופיל שלי
            </h1>
            <p className="text-xl text-neutral-600">
              התקדמות ונקודות
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center" hover={false}>
              <div className="text-5xl mb-3">🏆</div>
              <div className="text-3xl font-bold text-accent-600 number-ltr mb-1">
                {totalPoints}
              </div>
              <div className="text-neutral-600">נקודות סה"כ</div>
            </Card>

            <Card className="p-6 text-center" hover={false}>
              <div className="text-5xl mb-3">📚</div>
              <div className="text-3xl font-bold text-primary-600 number-ltr mb-1">
                {completedUnits}
              </div>
              <div className="text-neutral-600">יחידות הושלמו</div>
            </Card>

            <Card className="p-6 text-center" hover={false}>
              <div className="text-5xl mb-3">🎯</div>
              <div className="text-3xl font-bold text-green-600 number-ltr mb-1">
                {accuracy}%
              </div>
              <div className="text-neutral-600">דיוק תשובות</div>
            </Card>
          </div>

          {!hasActivity ? (
            <Card className="p-12 text-center" hover={false}>
              <div className="text-6xl mb-4">🚀</div>
              <h2 className="text-2xl font-bold text-neutral-700 mb-2">
                התחל ללמוד!
              </h2>
              <p className="text-neutral-600 mb-6">
                ההתקדמות שלך תוצג כאן לאחר שתתחיל לפתור שאלות
              </p>
              <Link
                href="/"
                className="inline-block px-8 py-4 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-medium shadow-float"
              >
                בחר כיתה
              </Link>
            </Card>
          ) : (
            <Card className="p-8" hover={false}>
              <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                🎉 כל הכבוד על ההתקדמות!
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-accent-50 rounded-lg">
                  <span className="text-lg">נקודות שצברת</span>
                  <span className="text-2xl font-bold text-accent-600 number-ltr">
                    {totalPoints}
                  </span>
                </div>

                {accuracy > 0 && (
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <span className="text-lg">דיוק התשובות שלך</span>
                    <span className="text-2xl font-bold text-green-600 number-ltr">
                      {accuracy}%
                    </span>
                  </div>
                )}

                <div className="pt-6">
                  <Link
                    href="/grade/6/book/shevilim-plus"
                    className="inline-block px-8 py-4 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors font-medium shadow-float"
                  >
                    המשך ללמוד →
                  </Link>
                </div>
              </div>
            </Card>
          )}

          <div className="mt-8 p-6 bg-accent-50 rounded-xl border-2 border-accent-200">
            <h3 className="text-lg font-bold text-accent-900 mb-2">
              💡 טיפ:
            </h3>
            <p className="text-accent-800">
              ההתקדמות שלך נשמרת בדפדפן שלך באופן אוטומטי. המשך ללמוד וצבור עוד נקודות!
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
