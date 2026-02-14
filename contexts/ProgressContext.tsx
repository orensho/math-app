'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { UserProgress, QuizAttempt, UnitProgress } from '@/lib/types/progress'
import { useLocalStorage } from '@/lib/hooks/useLocalStorage'

interface ProgressContextType {
  progress: UserProgress
  recordQuizAttempt: (unitId: string, questionId: string, isCorrect: boolean, points: number) => void
  getQuizAttempts: (unitId: string, questionId: string) => QuizAttempt | undefined
  markConceptComplete: (unitId: string, conceptId: string) => void
  markExampleComplete: (unitId: string, exampleId: string) => void
  getTotalPoints: () => number
  getUnitProgress: (unitId: string) => UnitProgress | undefined
  getCompletedUnitsCount: () => number
  getQuizAccuracy: () => number
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useLocalStorage<UserProgress>('math-app-progress', {
    userId: 'default-user',
    gradeProgress: [{
      gradeId: '6',
      bookProgress: [{
        bookId: 'shevilim-plus',
        unitProgress: [],
        completionPercentage: 0,
      }],
    }],
    totalPoints: 0,
    achievements: [],
    lastActive: new Date(),
  })

  const getOrCreateUnitProgress = (unitId: string): UnitProgress => {
    const gradeProgress = progress.gradeProgress.find(gp => gp.gradeId === '6')
    const bookProgress = gradeProgress?.bookProgress.find(bp => bp.bookId === 'shevilim-plus')
    const unitProgress = bookProgress?.unitProgress.find(up => up.unitId === unitId)

    if (unitProgress) {
      return unitProgress
    }

    return {
      unitId,
      conceptsCompleted: [],
      examplesCompleted: [],
      quizAttempts: [],
      isCompleted: false,
    }
  }

  const updateUnitProgress = (unitId: string, updater: (up: UnitProgress) => UnitProgress) => {
    setProgress(prev => {
      const newProgress = { ...prev }
      const gradeProgress = newProgress.gradeProgress.find(gp => gp.gradeId === '6')

      if (!gradeProgress) return prev

      const bookProgress = gradeProgress.bookProgress.find(bp => bp.bookId === 'shevilim-plus')

      if (!bookProgress) return prev

      const unitIndex = bookProgress.unitProgress.findIndex(up => up.unitId === unitId)

      if (unitIndex >= 0) {
        bookProgress.unitProgress[unitIndex] = updater(bookProgress.unitProgress[unitIndex])
      } else {
        const newUnitProgress = getOrCreateUnitProgress(unitId)
        bookProgress.unitProgress.push(updater(newUnitProgress))
      }

      newProgress.lastActive = new Date()
      return newProgress
    })
  }

  const recordQuizAttempt = (unitId: string, questionId: string, isCorrect: boolean, points: number) => {
    updateUnitProgress(unitId, (unitProgress) => {
      const existingAttemptIndex = unitProgress.quizAttempts.findIndex(
        qa => qa.questionId === questionId
      )

      const newAttempt: QuizAttempt = {
        questionId,
        attempts: 1,
        bestScore: isCorrect ? points : 0,
        isCorrect,
        lastAttemptAt: new Date(),
      }

      if (existingAttemptIndex >= 0) {
        const existing = unitProgress.quizAttempts[existingAttemptIndex]
        newAttempt.attempts = existing.attempts + 1
        newAttempt.bestScore = Math.max(existing.bestScore, isCorrect ? points : 0)
        unitProgress.quizAttempts[existingAttemptIndex] = newAttempt
      } else {
        unitProgress.quizAttempts.push(newAttempt)
      }

      return unitProgress
    })

    // Update total points
    if (isCorrect) {
      setProgress(prev => ({
        ...prev,
        totalPoints: prev.totalPoints + points,
      }))
    }
  }

  const getQuizAttempts = (unitId: string, questionId: string): QuizAttempt | undefined => {
    const unitProgress = getUnitProgress(unitId)
    return unitProgress?.quizAttempts.find(qa => qa.questionId === questionId)
  }

  const markConceptComplete = (unitId: string, conceptId: string) => {
    updateUnitProgress(unitId, (unitProgress) => {
      if (!unitProgress.conceptsCompleted.includes(conceptId)) {
        unitProgress.conceptsCompleted.push(conceptId)
      }
      return unitProgress
    })
  }

  const markExampleComplete = (unitId: string, exampleId: string) => {
    updateUnitProgress(unitId, (unitProgress) => {
      if (!unitProgress.examplesCompleted.includes(exampleId)) {
        unitProgress.examplesCompleted.push(exampleId)
      }
      return unitProgress
    })
  }

  const getTotalPoints = (): number => {
    return progress.totalPoints
  }

  const getUnitProgress = (unitId: string): UnitProgress | undefined => {
    const gradeProgress = progress.gradeProgress.find(gp => gp.gradeId === '6')
    const bookProgress = gradeProgress?.bookProgress.find(bp => bp.bookId === 'shevilim-plus')
    return bookProgress?.unitProgress.find(up => up.unitId === unitId)
  }

  const getCompletedUnitsCount = (): number => {
    const gradeProgress = progress.gradeProgress.find(gp => gp.gradeId === '6')
    const bookProgress = gradeProgress?.bookProgress.find(bp => bp.bookId === 'shevilim-plus')
    return bookProgress?.unitProgress.filter(up => up.isCompleted).length || 0
  }

  const getQuizAccuracy = (): number => {
    const gradeProgress = progress.gradeProgress.find(gp => gp.gradeId === '6')
    const bookProgress = gradeProgress?.bookProgress.find(bp => bp.bookId === 'shevilim-plus')

    if (!bookProgress) return 0

    let totalAttempts = 0
    let correctAttempts = 0

    bookProgress.unitProgress.forEach(up => {
      up.quizAttempts.forEach(qa => {
        totalAttempts++
        if (qa.isCorrect) correctAttempts++
      })
    })

    if (totalAttempts === 0) return 0
    return Math.round((correctAttempts / totalAttempts) * 100)
  }

  return (
    <ProgressContext.Provider value={{
      progress,
      recordQuizAttempt,
      getQuizAttempts,
      markConceptComplete,
      markExampleComplete,
      getTotalPoints,
      getUnitProgress,
      getCompletedUnitsCount,
      getQuizAccuracy,
    }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider')
  }
  return context
}
