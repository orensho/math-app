import { useState, useRef, useEffect, useCallback } from 'react'

interface UseStopwatchReturn {
  elapsedMs: number
  pause: () => void
  resume: () => void
  getElapsedMs: () => number
}

export function useStopwatch(): UseStopwatchReturn {
  const [elapsedMs, setElapsedMs] = useState(0)
  const startTimeRef = useRef<number>(Date.now())
  const accumulatedRef = useRef<number>(0)
  const isPausedRef = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const tick = useCallback(() => {
    if (!isPausedRef.current) {
      const now = Date.now()
      setElapsedMs(accumulatedRef.current + (now - startTimeRef.current))
    }
  }, [])

  useEffect(() => {
    intervalRef.current = setInterval(tick, 1000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [tick])

  const pause = useCallback(() => {
    if (!isPausedRef.current) {
      isPausedRef.current = true
      accumulatedRef.current += Date.now() - startTimeRef.current
      setElapsedMs(accumulatedRef.current)
    }
  }, [])

  const resume = useCallback(() => {
    if (isPausedRef.current) {
      isPausedRef.current = false
      startTimeRef.current = Date.now()
    }
  }, [])

  const getElapsedMs = useCallback(() => {
    if (isPausedRef.current) {
      return accumulatedRef.current
    }
    return accumulatedRef.current + (Date.now() - startTimeRef.current)
  }, [])

  return { elapsedMs, pause, resume, getElapsedMs }
}
