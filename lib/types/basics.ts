import { Concept, QuizQuestion } from './curriculum'

export interface MultiplicationTableRow {
  expression: string
  result: number
}

export interface MultiplicationTable {
  id: string
  title: string
  rows: MultiplicationTableRow[]
}

export interface BasicsModule {
  id: string
  name: string
  description: string
  concepts: Concept[]
  tables: MultiplicationTable[]
  quizQuestions: QuizQuestion[]
}
