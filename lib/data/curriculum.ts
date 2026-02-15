import { Book, Unit } from '../types/curriculum'
import { BasicsModule } from '../types/basics'
import grade6Book16 from './grade-6/shevilim-plus-16.json'
import grade6Book17 from './grade-6/shevilim-plus.json'
import grade6Book18 from './grade-6/shevilim-plus-18.json'
import multiplicationTables from './basics/multiplication-tables.json'

export async function getBookById(gradeId: string, bookId: string): Promise<Book | null> {
  if (gradeId === '6') {
    if (bookId === 'shevilim-plus-16') return grade6Book16 as Book
    if (bookId === 'shevilim-plus-17') return grade6Book17 as Book
    if (bookId === 'shevilim-plus-18') return grade6Book18 as Book
  }
  return null
}

export async function getUnitById(
  gradeId: string,
  bookId: string,
  unitId: string
): Promise<Unit | null> {
  const book = await getBookById(gradeId, bookId)
  if (!book) return null

  const unit = book.units.find((u) => u.id === unitId)
  return unit || null
}

export async function getAllUnits(gradeId: string, bookId: string): Promise<Unit[]> {
  const book = await getBookById(gradeId, bookId)
  return book?.units || []
}

export const GRADES = [
  { id: '1', name: 'כיתה א', displayName: 'א' },
  { id: '2', name: 'כיתה ב', displayName: 'ב' },
  { id: '3', name: 'כיתה ג', displayName: 'ג' },
  { id: '4', name: 'כיתה ד', displayName: 'ד' },
  { id: '5', name: 'כיתה ה', displayName: 'ה' },
  { id: '6', name: 'כיתה ו', displayName: 'ו' },
]

export const BOOKS_BY_GRADE: Record<string, { id: string; name: string; description: string }[]> = {
  '6': [
    {
      id: 'shevilim-plus-16',
      name: 'שבילים פלוס 16',
      description: 'ספר מתמטיקה לכיתה ו׳ - שברים, עשרוניים ואחוזים',
    },
    {
      id: 'shevilim-plus-17',
      name: 'שבילים פלוס 17',
      description: 'ספר מתמטיקה לכיתה ו׳ - שברים, עשרוניים ובעיות',
    },
    {
      id: 'shevilim-plus-18',
      name: 'שבילים פלוס 18',
      description: 'ספר מתמטיקה לכיתה ו׳ - יחסים, קנה מידה וסטטיסטיקה',
    },
  ],
}

export const BASICS_MODULES = [
  {
    id: 'multiplication-tables',
    name: 'לוח הכפל',
    description: 'למידה ותרגול לוח הכפל',
    icon: '✖️',
  },
]

export async function getBasicsModule(moduleId: string): Promise<BasicsModule | null> {
  if (moduleId === 'multiplication-tables') {
    return multiplicationTables as unknown as BasicsModule
  }
  return null
}
