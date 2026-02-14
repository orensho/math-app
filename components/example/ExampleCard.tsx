import Card from '../ui/Card'
import Badge from '../ui/Badge'
import StepByStep from './StepByStep'
import { Example } from '@/lib/types/curriculum'

interface ExampleCardProps {
  example: Example
  index: number
}

const difficultyLabels = {
  easy: 'קל',
  medium: 'בינוני',
  hard: 'קשה',
}

const difficultyColors = {
  easy: 'success' as const,
  medium: 'accent' as const,
  hard: 'primary' as const,
}

export default function ExampleCard({ example, index }: ExampleCardProps) {
  return (
    <Card className="p-6" hover={false}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Badge variant="primary" size="lg">
              דוגמה {index + 1}
            </Badge>
            <Badge variant={difficultyColors[example.difficulty]} size="sm">
              {difficultyLabels[example.difficulty]}
            </Badge>
          </div>
        </div>

        <div className="p-4 bg-neutral-50 rounded-lg border-2 border-neutral-200">
          <p className="text-xl font-medium text-neutral-900">
            {example.question}
          </p>
        </div>
      </div>

      <div>
        <h4 className="text-lg font-bold text-neutral-800 mb-4">
          פתרון צעד אחר צעד:
        </h4>
        <StepByStep steps={example.steps} finalAnswer={example.finalAnswer} />
      </div>
    </Card>
  )
}
