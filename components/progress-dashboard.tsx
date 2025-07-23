import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Flame, Star, TrendingUp, Calendar, Target, Award, Zap } from "lucide-react"

interface ProgressDashboardProps {
  completedRituals: Set<string>
  streaks: Record<string, number>
  totalPoints: number
  level: number
}

export function ProgressDashboard({ completedRituals, streaks, totalPoints, level }: ProgressDashboardProps) {
  const maxStreak = Math.max(...Object.values(streaks), 0)
  const totalRituals = 23 // Total number of rituals across all categories
  const completionRate = (completedRituals.size / totalRituals) * 100

  const achievements = [
    {
      id: "first-ritual",
      title: "First Steps",
      description: "Complete your first ritual",
      icon: Star,
      unlocked: completedRituals.size >= 1,
      color: "text-yellow-500",
    },
    {
      id: "streak-3",
      title: "Getting Consistent",
      description: "Maintain a 3-day streak",
      icon: Flame,
      unlocked: maxStreak >= 3,
      color: "text-orange-500",
    },
    {
      id: "streak-7",
      title: "Week Warrior",
      description: "Maintain a 7-day streak",
      icon: Trophy,
      unlocked: maxStreak >= 7,
      color: "text-purple-500",
    },
    {
      id: "level-5",
      title: "Rising Star",
      description: "Reach level 5",
      icon: Award,
      unlocked: level >= 5,
      color: "text-blue-500",
    },
    {
      id: "complete-day",
      title: "Perfect Day",
      description: "Complete all rituals in one day",
      icon: Zap,
      unlocked: completedRituals.size === totalRituals,
      color: "text-green-500",
    },
  ]

  const unlockedAchievements = achievements.filter((a) => a.unlocked)
  const nextAchievement = achievements.find((a) => !a.unlocked)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Progress Dashboard</h2>
        <p className="text-gray-600">Track your journey and celebrate your achievements</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Current Level</p>
                <p className="text-2xl font-bold text-purple-600">{level}</p>
              </div>
              <Trophy className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Points</p>
                <p className="text-2xl font-bold text-blue-600">{totalPoints}</p>
              </div>
              <Star className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Best Streak</p>
                <p className="text-2xl font-bold text-orange-600">{maxStreak}</p>
              </div>
              <Flame className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Progress</p>
                <p className="text-2xl font-bold text-green-600">{completionRate.toFixed(0)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Level Progress
          </CardTitle>
          <CardDescription>
            You need {100 - (totalPoints % 100)} more points to reach level {level + 1}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Level {level}</span>
              <span>Level {level + 1}</span>
            </div>
            <Progress value={totalPoints % 100} className="h-3" />
            <p className="text-sm text-gray-600 text-center">{totalPoints % 100} / 100 points</p>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievements
          </CardTitle>
          <CardDescription>
            {unlockedAchievements.length} of {achievements.length} achievements unlocked
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
                    achievement.unlocked ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200 opacity-60"
                  }`}
                >
                  <div className={`p-2 rounded-full ${achievement.unlocked ? "bg-white" : "bg-gray-200"}`}>
                    <Icon className={`h-5 w-5 ${achievement.unlocked ? achievement.color : "text-gray-400"}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{achievement.title}</h4>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Unlocked!
                    </Badge>
                  )}
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Next Achievement */}
      {nextAchievement && (
        <Card className="border-dashed border-2 border-purple-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-600">
              <Target className="h-5 w-5" />
              Next Achievement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-full bg-purple-100">
                <nextAchievement.icon className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h4 className="font-medium text-purple-800">{nextAchievement.title}</h4>
                <p className="text-sm text-purple-600">{nextAchievement.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            This Week's Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2 mb-4">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
              <div key={day} className="text-center">
                <p className="text-xs text-gray-600 mb-1">{day}</p>
                <div
                  className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-xs font-medium ${
                    index < 4 ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {index < 4 ? "✓" : "○"}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">You've been consistent 4 out of 7 days this week! 🎉</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
