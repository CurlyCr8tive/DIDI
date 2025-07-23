import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, Flame, Star, TrendingUp, Heart, Target, Award, Crown, Rocket } from "lucide-react"

interface DIDIStatsProps {
  completedRituals: Set<string>
  streaks: Record<string, number>
  totalPoints: number
  level: number
}

export function DIDIStats({ completedRituals, streaks, totalPoints, level }: DIDIStatsProps) {
  const maxStreak = Math.max(...Object.values(streaks), 0)
  const totalRituals = 16 // Updated count
  const completionRate = (completedRituals.size / totalRituals) * 100

  const achievements = [
    {
      id: "first-ritual",
      title: "First Steps! 👶",
      description: "Completed your very first ritual!",
      icon: Star,
      unlocked: completedRituals.size >= 1,
      color: "text-yellow-500",
      bgColor: "bg-yellow-100",
    },
    {
      id: "streak-3",
      title: "Getting Hot! 🔥",
      description: "3-day streak - you're on fire!",
      icon: Flame,
      unlocked: maxStreak >= 3,
      color: "text-orange-500",
      bgColor: "bg-orange-100",
    },
    {
      id: "streak-7",
      title: "Week Warrior! ⚔️",
      description: "7-day streak - absolutely crushing it!",
      icon: Trophy,
      unlocked: maxStreak >= 7,
      color: "text-purple-500",
      bgColor: "bg-purple-100",
    },
    {
      id: "level-5",
      title: "Rising Star! ⭐",
      description: "Reached level 5 - you're amazing!",
      icon: Award,
      unlocked: level >= 5,
      color: "text-blue-500",
      bgColor: "bg-blue-100",
    },
    {
      id: "perfect-day",
      title: "Perfect Day! 🌟",
      description: "Completed ALL rituals in one day!",
      icon: Crown,
      unlocked: completedRituals.size === totalRituals,
      color: "text-green-500",
      bgColor: "bg-green-100",
    },
  ]

  const unlockedAchievements = achievements.filter((a) => a.unlocked)
  const nextAchievement = achievements.find((a) => !a.unlocked)

  const getEncouragementMessage = () => {
    if (completionRate >= 80) return "OMG YOU'RE INCREDIBLE! 🤩"
    if (completionRate >= 60) return "You're doing AMAZING! 🌟"
    if (completionRate >= 40) return "Great job! Keep it up! 💪"
    if (completionRate >= 20) return "Nice start! You've got this! 🚀"
    return "Every journey starts with one step! 👣"
  }

  return (
    <div className="space-y-6">
      {/* DIDI's Stats Intro */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-600 border-0 shadow-xl">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-3">🤖📊</div>
          <h2 className="text-2xl font-black text-white mb-2">Look at Your Amazing Progress!</h2>
          <p className="text-white/90 font-semibold text-lg">{getEncouragementMessage()}</p>
        </CardContent>
      </Card>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-500 to-purple-700 border-0 shadow-xl transform hover:scale-105 transition-all">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
            <div className="text-3xl font-black text-white mb-1">{level}</div>
            <div className="text-sm text-purple-100 font-bold">LEVEL</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-500 to-pink-700 border-0 shadow-xl transform hover:scale-105 transition-all">
          <CardContent className="p-4 text-center">
            <Star className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
            <div className="text-3xl font-black text-white mb-1">{totalPoints}</div>
            <div className="text-sm text-pink-100 font-bold">POINTS</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-500 to-red-600 border-0 shadow-xl transform hover:scale-105 transition-all">
          <CardContent className="p-4 text-center">
            <Flame className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
            <div className="text-3xl font-black text-white mb-1">{maxStreak}</div>
            <div className="text-sm text-orange-100 font-bold">BEST STREAK</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-emerald-600 border-0 shadow-xl transform hover:scale-105 transition-all">
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 text-yellow-300 mx-auto mb-2" />
            <div className="text-3xl font-black text-white mb-1">{completedRituals.size}</div>
            <div className="text-sm text-green-100 font-bold">TODAY</div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="border-4 border-purple-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
          <CardTitle className="flex items-center gap-3 text-2xl font-black text-purple-800">
            <Rocket className="h-6 w-6" />
            Level Up Progress! 🚀
          </CardTitle>
          <CardDescription className="text-purple-600 font-semibold text-lg">
            You need {100 - (totalPoints % 100)} more points to reach level {level + 1}!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-purple-600">Level {level}</span>
              <span className="text-purple-600">Level {level + 1}</span>
            </div>
            <Progress value={totalPoints % 100} className="h-6 rounded-full" />
            <p className="text-center text-xl font-black text-purple-700">{totalPoints % 100} / 100 points ⭐</p>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-4 border-yellow-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-yellow-100 to-orange-100">
          <CardTitle className="flex items-center gap-3 text-2xl font-black text-orange-800">
            <Award className="h-6 w-6" />
            Your Awesome Achievements! 🏆
          </CardTitle>
          <CardDescription className="text-orange-600 font-semibold text-lg">
            {unlockedAchievements.length} of {achievements.length} badges earned!
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((achievement) => {
              const Icon = achievement.icon
              return (
                <div
                  key={achievement.id}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                    achievement.unlocked
                      ? `${achievement.bgColor} border-current shadow-lg`
                      : "bg-gray-100 border-gray-200 opacity-60"
                  }`}
                >
                  <div className={`p-3 rounded-full ${achievement.unlocked ? "bg-white shadow-lg" : "bg-gray-200"}`}>
                    <Icon className={`h-6 w-6 ${achievement.unlocked ? achievement.color : "text-gray-400"}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-black text-lg">{achievement.title}</h4>
                    <p className="text-sm font-semibold text-gray-600">{achievement.description}</p>
                  </div>
                  {achievement.unlocked && (
                    <Badge className="bg-green-500 text-white border-0 font-black text-sm px-3 py-1">
                      UNLOCKED! ✨
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
        <Card className="border-4 border-dashed border-purple-400 shadow-xl bg-gradient-to-r from-purple-50 to-pink-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-2xl font-black text-purple-700">
              <Target className="h-6 w-6" />
              Next Challenge! 🎯
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-full bg-purple-200">
                <nextAchievement.icon className="h-8 w-8 text-purple-600" />
              </div>
              <div>
                <h4 className="font-black text-xl text-purple-800">{nextAchievement.title}</h4>
                <p className="text-lg font-semibold text-purple-600">{nextAchievement.description}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Summary */}
      <Card className="border-4 border-blue-200 shadow-xl">
        <CardHeader className="bg-gradient-to-r from-blue-100 to-indigo-100">
          <CardTitle className="flex items-center gap-3 text-2xl font-black text-blue-800">
            <TrendingUp className="h-6 w-6" />
            This Week's Journey! 📅
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-7 gap-3 mb-6">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => (
              <div key={day} className="text-center">
                <p className="text-sm font-bold text-blue-600 mb-2">{day}</p>
                <div
                  className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center text-lg font-black shadow-lg ${
                    index < 4
                      ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {index < 4 ? "✓" : "○"}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <div className="text-4xl mb-3">🤖🎉</div>
            <p className="text-xl font-black text-blue-700 mb-2">You've been consistent 4 out of 7 days this week!</p>
            <p className="text-lg font-semibold text-blue-600">DIDI is so proud of you! Keep up the amazing work! 🌟</p>
          </div>
        </CardContent>
      </Card>

      {/* DIDI's Motivational Message */}
      <Card className="bg-gradient-to-r from-yellow-400 to-orange-500 border-0 shadow-xl">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-3">🤖💪</div>
          <h2 className="text-2xl font-black text-white mb-2">You're Absolutely AMAZING!</h2>
          <p className="text-white/90 font-semibold text-lg">
            I love seeing your progress! Every ritual you complete makes you stronger! Keep being awesome! ✨
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
