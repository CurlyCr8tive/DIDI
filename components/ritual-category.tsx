"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Flame } from "lucide-react"

interface Ritual {
  id: string
  name: string
  description: string
}

interface RitualCategoryProps {
  category: {
    id: string
    title: string
    icon: any
    color: string
    rituals: Ritual[]
  }
  completedRituals: Set<string>
  streaks: Record<string, number>
  onToggleRitual: (ritualId: string) => void
}

export function RitualCategory({ category, completedRituals, streaks, onToggleRitual }: RitualCategoryProps) {
  const Icon = category.icon
  const completedCount = category.rituals.filter((ritual) => completedRituals.has(ritual.id)).length

  return (
    <Card className="overflow-hidden">
      <CardHeader className={`${category.color} text-white`}>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Icon className="h-6 w-6" />
            <span>{category.title}</span>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white">
            {completedCount}/{category.rituals.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {category.rituals.map((ritual) => {
            const isCompleted = completedRituals.has(ritual.id)
            const streak = streaks[ritual.id] || 0

            return (
              <div
                key={ritual.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  isCompleted ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <Button variant="ghost" size="sm" onClick={() => onToggleRitual(ritual.id)} className="p-0 h-auto">
                    {isCompleted ? (
                      <CheckCircle2 className="h-6 w-6 text-green-500" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-400" />
                    )}
                  </Button>
                  <div className="flex-1">
                    <h4 className={`font-medium ${isCompleted ? "line-through text-gray-500" : ""}`}>{ritual.name}</h4>
                    <p className="text-sm text-gray-600">{ritual.description}</p>
                  </div>
                </div>
                {streak > 0 && (
                  <div className="flex items-center gap-1 text-orange-500">
                    <Flame className="h-4 w-4" />
                    <span className="text-sm font-medium">{streak}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
