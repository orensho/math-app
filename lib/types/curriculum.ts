export interface Grade {
  id: string
  name: string
  displayName: string
  description: string
  books: Book[]
}

export interface Book {
  id: string
  gradeId: string
  name: string
  description: string
  units: Unit[]
}

export interface Unit {
  id: string
  bookId: string
  order: number
  name: string
  description: string
  subSections?: string[]
  concepts: Concept[]
  examples: Example[]
  quizQuestions: QuizQuestion[]
}

export interface DiagramConfig {
  type: 'number-line' | 'fraction-visualizer' | 'shape-builder' | 'angle-visualizer'
  params: Record<string, any>
  showControls?: boolean
  height?: number
}

export interface Concept {
  id: string
  title: string
  content: string
  formula?: string
  visualAid?: string
  diagram?: DiagramConfig
  order: number
}

export interface Example {
  id: string
  question: string
  difficulty: 'easy' | 'medium' | 'hard'
  steps: SolutionStep[]
  finalAnswer: string
}

export interface SolutionStep {
  stepNumber: number
  description: string
  calculation?: string
  explanation: string
  diagram?: DiagramConfig
}

export interface QuizQuestion {
  id: string
  question: string
  options: QuizOption[]
  correctAnswerId: string
  explanation: string
  solutionSteps: SolutionStep[]
  points: number
  difficulty: 'easy' | 'medium' | 'hard'
}

export interface QuizOption {
  id: string
  text: string
  isCorrect: boolean
}
