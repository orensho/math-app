import { QuizQuestion, SolutionStep } from '../types/curriculum'
import { shuffle } from './shuffle'

/**
 * Generates a random multiplication quiz question
 */
function generateQuestion(id: string): QuizQuestion {
  // Random numbers between 0-12 for multiplication
  const num1 = Math.floor(Math.random() * 13)
  const num2 = Math.floor(Math.random() * 13)
  const correctAnswer = num1 * num2

  // Generate plausible wrong answers
  const wrongAnswers = new Set<number>()

  // Add answers that are close to the correct answer
  const offsets = [-2, -1, 1, 2, num1, num2, -num1, -num2]

  while (wrongAnswers.size < 3) {
    const offset = offsets[Math.floor(Math.random() * offsets.length)]
    const wrongAnswer = correctAnswer + offset

    // Make sure it's positive and different from correct answer
    if (wrongAnswer >= 0 && wrongAnswer !== correctAnswer && !wrongAnswers.has(wrongAnswer)) {
      wrongAnswers.add(wrongAnswer)
    }

    // Fallback: add random numbers in reasonable range
    if (wrongAnswers.size < 3) {
      const randomWrong = Math.floor(Math.random() * 145)
      if (randomWrong !== correctAnswer && !wrongAnswers.has(randomWrong)) {
        wrongAnswers.add(randomWrong)
      }
    }
  }

  // Create options array with correct answer and wrong answers
  const allAnswers = [correctAnswer, ...Array.from(wrongAnswers)]
  const shuffledAnswers = shuffle(allAnswers)

  const options = shuffledAnswers.map((answer, index) => ({
    id: String.fromCharCode(97 + index), // a, b, c, d
    text: String(answer)
  }))

  const correctAnswerId = options.find(opt => opt.text === String(correctAnswer))!.id

  // Generate helpful explanation based on the numbers
  let explanation = `${num1} × ${num2} = ${correctAnswer}.`

  if (num1 === 0 || num2 === 0) {
    explanation += ' כל מספר כפול 0 שווה 0.'
  } else if (num1 === 1) {
    explanation += ` כל מספר כפול 1 שווה לעצמו, לכן ${num2} × 1 = ${num2}.`
  } else if (num2 === 1) {
    explanation += ` כל מספר כפול 1 שווה לעצמו, לכן ${num1} × 1 = ${num1}.`
  } else if (num1 === num2) {
    explanation += ` זהו מרובע של ${num1}.`
  } else if (num1 === 10 || num2 === 10) {
    explanation += ' כפל ב-10 מוסיף אפס לסוף המספר.'
  } else if (num1 === 5 || num2 === 5) {
    explanation += ' כפל ב-5 תמיד מסתיים ב-0 או ב-5.'
  } else if (num1 === 9 || num2 === 9) {
    const digits = String(correctAnswer).split('').map(Number)
    const sum = digits.reduce((a, b) => a + b, 0)
    explanation += ` טיפ: בלוח הכפל של 9, סכום הספרות בתוצאה הוא ${sum}.`
  }

  // Generate solution steps
  const solutionSteps: SolutionStep[] = []

  if (num1 <= 3 && num2 <= 3 && num1 > 0 && num2 > 0) {
    // For small numbers, show repeated addition
    const addition = Array(num2).fill(num1).join('+')
    solutionSteps.push({
      stepNumber: 1,
      description: 'הצג את הכפל כחיבור חוזר',
      calculation: `${num1} × ${num2} = ${addition}`,
      explanation: `כפל פירושו חיבור חוזר. ${num1} כפול ${num2} פירושו ${num2} פעמים ${num1}.`
    })
    solutionSteps.push({
      stepNumber: 2,
      description: 'חשב את התוצאה',
      calculation: `${addition} = ${correctAnswer}`,
      explanation: `חיבור המספרים נותן ${correctAnswer}.`
    })
  } else if (num1 === 0 || num2 === 0) {
    solutionSteps.push({
      stepNumber: 1,
      description: 'כפל באפס',
      calculation: `${num1} × ${num2} = 0`,
      explanation: 'כל מספר כפול 0 שווה 0.'
    })
  } else if (num1 > 10 || num2 > 10) {
    // Break down larger numbers
    const [larger, smaller] = num1 > num2 ? [num1, num2] : [num2, num1]
    if (larger > 10) {
      const tens = Math.floor(larger / 10) * 10
      const ones = larger % 10
      solutionSteps.push({
        stepNumber: 1,
        description: 'פרק את המספר הגדול',
        calculation: `${larger} = ${tens} + ${ones}`,
        explanation: `ניתן לפרק את ${larger} ל-${tens} + ${ones}.`
      })
      solutionSteps.push({
        stepNumber: 2,
        description: 'הפעל את התכונה הפילוגית',
        calculation: `${larger} × ${smaller} = (${tens} + ${ones}) × ${smaller} = ${tens} × ${smaller} + ${ones} × ${smaller}`,
        explanation: 'כפל כל חלק בנפרד.'
      })
      solutionSteps.push({
        stepNumber: 3,
        description: 'חשב כל כפל',
        calculation: `${tens} × ${smaller} = ${tens * smaller}, ${ones} × ${smaller} = ${ones * smaller}`,
        explanation: 'חשב את כל חלק בנפרד.'
      })
      solutionSteps.push({
        stepNumber: 4,
        description: 'חבר את התוצאות',
        calculation: `${tens * smaller} + ${ones * smaller} = ${correctAnswer}`,
        explanation: `סכום החלקים נותן את התוצאה הסופית.`
      })
    } else {
      solutionSteps.push({
        stepNumber: 1,
        description: 'חשב את תוצאת הכפל',
        calculation: `${num1} × ${num2} = ${correctAnswer}`,
        explanation: `זכור את לוח הכפל: ${num1} כפול ${num2} שווה ${correctAnswer}.`
      })
    }
  } else {
    solutionSteps.push({
      stepNumber: 1,
      description: 'חשב את תוצאת הכפל',
      calculation: `${num1} × ${num2} = ${correctAnswer}`,
      explanation: `לפי לוח הכפל: ${num1} כפול ${num2} שווה ${correctAnswer}.`
    })
  }

  // Determine difficulty
  let difficulty: 'easy' | 'medium' | 'hard' = 'medium'
  if (num1 <= 5 && num2 <= 5) difficulty = 'easy'
  if (num1 > 10 || num2 > 10) difficulty = 'hard'
  if (num1 === 0 || num2 === 0 || num1 === 1 || num2 === 1) difficulty = 'easy'

  return {
    id,
    question: `כמה זה ${num1} × ${num2}?`,
    options,
    correctAnswerId,
    explanation,
    solutionSteps,
    points: difficulty === 'easy' ? 5 : difficulty === 'medium' ? 10 : 15,
    difficulty
  }
}

/**
 * Generates a set of multiplication quiz questions
 */
export function generateMultiplicationQuiz(count: number = 10): QuizQuestion[] {
  const questions: QuizQuestion[] = []

  for (let i = 0; i < count; i++) {
    questions.push(generateQuestion(`generated-q${i + 1}`))
  }

  return questions
}
