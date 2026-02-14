export interface QuizState {
  currentQuestionIndex: number
  selectedAnswer: string | null
  showResult: boolean
  totalScore: number
  isCompleted: boolean
}

export interface QuizResult {
  questionId: string
  selectedAnswerId: string
  correctAnswerId: string
  isCorrect: boolean
  earnedPoints: number
  attempts: number
}
