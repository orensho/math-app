import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-soft sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="text-3xl font-bold font-display text-primary-600">
              מתמטיקול
            </div>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              href="/profile"
              className="text-neutral-700 hover:text-primary-600 transition-colors font-medium"
            >
              הפרופיל שלי
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
