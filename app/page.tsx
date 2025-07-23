"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Sparkles, Trophy, Flame, Heart, Star } from "lucide-react"
import { DIDIChat } from "@/components/didi-chat"
import { DIDIRituals } from "@/components/didi-rituals"
import { DIDIGoals } from "@/components/didi-goals"
import { DIDIStats } from "@/components/didi-stats"

export default function DIDIApp() {
  const [completedRituals, setCompletedRituals] = useState<Set<string>>(new Set())
  const [streaks, setStreaks] = useState<Record<string, number>>({})
  const [currentTab, setCurrentTab] = useState("chat")
  const [totalPoints, setTotalPoints] = useState(0)
  const [level, setLevel] = useState(1)
  const [userName, setUserName] = useState("Friend")

  useEffect(() => {
    const saved = localStorage.getItem("didi-data")
    if (saved) {
      const data = JSON.parse(saved)
      setCompletedRituals(new Set(data.completedRituals || []))
      setStreaks(data.streaks || {})
      setTotalPoints(data.totalPoints || 0)
      setLevel(data.level || 1)
      setUserName(data.userName || "Friend")
    }
  }, [])

  useEffect(() => {
    const data = {
      completedRituals: Array.from(completedRituals),
      streaks,
      totalPoints,
      level,
      userName,
    }
    localStorage.setItem("didi-data", JSON.stringify(data))
  }, [completedRituals, streaks, totalPoints, level, userName])

  const toggleRitual = (ritualId: string) => {
    const newCompleted = new Set(completedRituals)
    if (newCompleted.has(ritualId)) {
      newCompleted.delete(ritualId)
      setTotalPoints((prev) => Math.max(0, prev - 10))
    } else {
      newCompleted.add(ritualId)
      setTotalPoints((prev) => prev + 10)
      setStreaks((prev) => ({
        ...prev,
        [ritualId]: (prev[ritualId] || 0) + 1,
      }))
    }
    setCompletedRituals(newCompleted)

    const newLevel = Math.floor(totalPoints / 100) + 1
    if (newLevel > level) {
      setLevel(newLevel)
    }
  }

  const maxStreak = Math.max(...Object.values(streaks), 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-400">
      <div className="container mx-auto p-4 max-w-4xl">
        {/* DIDI Header */}
        <div className="text-center mb-6">
          <div className="relative inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full flex items-center justify-center text-4xl shadow-lg animate-bounce">
              🤖
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-400 rounded-full flex items-center justify-center">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-black text-white mb-2 drop-shadow-lg">Hey {userName}! I'm DIDI! 👋</h1>
          <p className="text-xl text-white/90 font-semibold drop-shadow">
            <span className="bg-white/20 px-3 py-1 rounded-full">Did I Do It?</span> Let's find out together! ✨
          </p>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-4 gap-2 mb-6">
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 border-0 shadow-lg">
            <CardContent className="p-3 text-center">
              <Trophy className="h-6 w-6 text-yellow-300 mx-auto mb-1" />
              <div className="text-2xl font-black text-white">{level}</div>
              <div className="text-xs text-purple-100 font-semibold">LEVEL</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-pink-500 to-pink-600 border-0 shadow-lg">
            <CardContent className="p-3 text-center">
              <Star className="h-6 w-6 text-yellow-300 mx-auto mb-1" />
              <div className="text-2xl font-black text-white">{totalPoints}</div>
              <div className="text-xs text-pink-100 font-semibold">POINTS</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-500 border-0 shadow-lg">
            <CardContent className="p-3 text-center">
              <Flame className="h-6 w-6 text-yellow-300 mx-auto mb-1" />
              <div className="text-2xl font-black text-white">{maxStreak}</div>
              <div className="text-xs text-orange-100 font-semibold">STREAK</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-500 border-0 shadow-lg">
            <CardContent className="p-3 text-center">
              <Heart className="h-6 w-6 text-yellow-300 mx-auto mb-1" />
              <div className="text-2xl font-black text-white">{completedRituals.size}</div>
              <div className="text-xs text-green-100 font-semibold">TODAY</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6 bg-white/20 backdrop-blur-sm border-0 p-1 rounded-2xl">
            <TabsTrigger
              value="chat"
              className="rounded-xl font-bold text-white data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-lg transition-all"
            >
              💬 Chat with DIDI
            </TabsTrigger>
            <TabsTrigger
              value="rituals"
              className="rounded-xl font-bold text-white data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-lg transition-all"
            >
              ✅ My Rituals
            </TabsTrigger>
            <TabsTrigger
              value="goals"
              className="rounded-xl font-bold text-white data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-lg transition-all"
            >
              🎯 Goals
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="rounded-xl font-bold text-white data-[state=active]:bg-white data-[state=active]:text-purple-600 data-[state=active]:shadow-lg transition-all"
            >
              📊 My Stats
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="mt-0">
            <DIDIChat
              userName={userName}
              completedRituals={completedRituals}
              totalPoints={totalPoints}
              level={level}
              maxStreak={maxStreak}
              onToggleRitual={toggleRitual}
            />
          </TabsContent>

          <TabsContent value="rituals" className="mt-0">
            <DIDIRituals completedRituals={completedRituals} streaks={streaks} onToggleRitual={toggleRitual} />
          </TabsContent>

          <TabsContent value="goals" className="mt-0">
            <DIDIGoals />
          </TabsContent>

          <TabsContent value="stats" className="mt-0">
            <DIDIStats completedRituals={completedRituals} streaks={streaks} totalPoints={totalPoints} level={level} />
          </TabsContent>
        </Tabs>

        {/* Floating DIDI Helper */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => setCurrentTab("chat")}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 shadow-2xl border-4 border-white animate-pulse"
            size="icon"
          >
            <span className="text-2xl">🤖</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
