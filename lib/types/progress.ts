export interface UserProgress {
  userId: string
  gradeProgress: GradeProgress[]
  totalPoints: number
  achievements: Achievement[]
  lastActive: Date
}

export interface GradeProgress {
  gradeId: string
  bookProgress: BookProgress[]
}

export interface BookProgress {
  bookId: string
  unitProgress: UnitProgress[]
  completionPercentage: number
}

export interface UnitProgress {
  unitId: string
  conceptsCompleted: string[]
  examplesCompleted: string[]
  quizAttempts: QuizAttempt[]
  isCompleted: boolean
  completedAt?: Date
}

export interface QuizAttempt {
  questionId: string
  attempts: number
  bestScore: number
  isCorrect: boolean
  lastAttemptAt: Date
}

export interface Achievement {
  id: string
  name: string
  description: string
  unlockedAt: Date
  icon: string
}
