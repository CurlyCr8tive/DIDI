"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, Flame, Star } from "lucide-react"

interface DIDIRitualsProps {
  completedRituals: Set<string>
  streaks: Record<string, number>
  onToggleRitual: (ritualId: string) => void
}

const ritualCategories = [
  {
    id: "school",
    title: "📚 School & Learning",
    emoji: "🎓",
    color: "from-blue-400 to-blue-600",
    rituals: [
      { id: "homework", name: "Did my homework", emoji: "✏️", points: 10 },
      { id: "study-time", name: "25-min study session", emoji: "⏰", points: 10 },
      { id: "reading", name: "Read for 20 minutes", emoji: "📖", points: 10 },
      { id: "organize-backpack", name: "Organized my backpack", emoji: "🎒", points: 5 },
    ],
  },
  {
    id: "brain",
    title: "🧠 Brain Power",
    emoji: "🚀",
    color: "from-purple-400 to-purple-600",
    rituals: [
      { id: "plan-tomorrow", name: "Planned tomorrow", emoji: "📅", points: 10 },
      { id: "reviewed-notes", name: "Reviewed my notes", emoji: "📝", points: 10 },
      { id: "brain-break", name: "Took a brain break", emoji: "🧘", points: 5 },
    ],
  },
  {
    id: "feelings",
    title: "💖 Feelings & Wellness",
    emoji: "🌈",
    color: "from-pink-400 to-pink-600",
    rituals: [
      { id: "mood-check", name: "Checked in with my mood", emoji: "😊", points: 5 },
      { id: "deep-breaths", name: "Took 5 deep breaths", emoji: "🌬️", points: 5 },
      { id: "gratitude", name: "Thought of something good", emoji: "🙏", points: 5 },
      { id: "moved-body", name: "Moved my body", emoji: "💃", points: 10 },
    ],
  },
  {
    id: "life",
    title: "🏠 Daily Life",
    emoji: "✨",
    color: "from-green-400 to-green-600",
    rituals: [
      { id: "made-bed", name: "Made my bed", emoji: "🛏️", points: 5 },
      { id: "drank-water", name: "Drank water", emoji: "💧", points: 5 },
      { id: "healthy-snack", name: "Had a healthy snack", emoji: "🍎", points: 5 },
      { id: "screen-break", name: "Took a screen break", emoji: "📱", points: 5 },
    ],
  },
]

export function DIDIRituals({ completedRituals, streaks, onToggleRitual }: DIDIRitualsProps) {
  const getTotalPointsToday = () => {
    let total = 0
    ritualCategories.forEach((category) => {
      category.rituals.forEach((ritual) => {
        if (completedRituals.has(ritual.id)) {
          total += ritual.points
        }
      })
    })
    return total
  }

  return (
    <div className="space-y-6">
      {/* DIDI's Encouragement */}
      <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 border-0 shadow-xl">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-3">🤖✨</div>
          <h2 className="text-2xl font-black text-white mb-2">Let's check off some awesome stuff!</h2>
          <p className="text-white/90 font-semibold text-lg">
            You've earned {getTotalPointsToday()} points today! Keep going! 🚀
          </p>
        </CardContent>
      </Card>

      {/* Ritual Categories */}
      {ritualCategories.map((category) => {
        const completedCount = category.rituals.filter((ritual) => completedRituals.has(ritual.id)).length
        const totalCount = category.rituals.length

        return (
          <Card key={category.id} className="overflow-hidden shadow-xl border-0">
            <CardHeader className={`bg-gradient-to-r ${category.color} text-white p-4`}>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{category.emoji}</span>
                  <div>
                    <h3 className="text-xl font-black">{category.title}</h3>
                    <p className="text-sm text-white/80 font-semibold">
                      {completedCount}/{totalCount} completed
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-white/20 text-white border-0 font-bold text-lg px-3 py-1">
                    {completedCount}/{totalCount}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 bg-white">
              <div className="space-y-3">
                {category.rituals.map((ritual) => {
                  const isCompleted = completedRituals.has(ritual.id)
                  const streak = streaks[ritual.id] || 0

                  return (
                    <div
                      key={ritual.id}
                      className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                        isCompleted
                          ? "bg-gradient-to-r from-green-100 to-emerald-100 border-green-300 shadow-lg"
                          : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onToggleRitual(ritual.id)}
                          className="p-0 h-auto hover:bg-transparent"
                        >
                          {isCompleted ? (
                            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                              <CheckCircle2 className="h-5 w-5 text-white" />
                            </div>
                          ) : (
                            <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-purple-400 transition-colors">
                              <Circle className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                        </Button>
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{ritual.emoji}</span>
                          <div>
                            <h4
                              className={`font-bold text-lg ${isCompleted ? "line-through text-gray-500" : "text-gray-800"}`}
                            >
                              {ritual.name}
                            </h4>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="text-xs font-bold">
                                +{ritual.points} pts
                              </Badge>
                              {streak > 0 && (
                                <div className="flex items-center gap-1 text-orange-500">
                                  <Flame className="h-4 w-4" />
                                  <span className="text-sm font-bold">{streak} day streak!</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      {isCompleted && (
                        <div className="flex items-center gap-1 text-green-600">
                          <Star className="h-5 w-5 animate-spin" />
                          <span className="font-black text-sm">DONE!</span>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        )
      })}

      {/* DIDI's Celebration */}
      {getTotalPointsToday() > 50 && (
        <Card className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 shadow-xl animate-pulse">
          <CardContent className="p-6 text-center">
            <div className="text-4xl mb-3">🎉🤖🎉</div>
            <h2 className="text-2xl font-black text-white mb-2">OMG YOU'RE AMAZING!</h2>
            <p className="text-white/90 font-semibold text-lg">Look at you crushing it today! I'm so proud! 🌟</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
