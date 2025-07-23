"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Plus, CheckCircle2, Star, Rocket } from "lucide-react"

interface Goal {
  id: string
  title: string
  description: string
  category: string
  steps: string[]
  completedSteps: Set<string>
  progress: number
  emoji: string
  created: Date
}

export function DIDIGoals() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Master my multiplication tables",
      description: "I want to get really good at math and feel confident!",
      category: "School",
      steps: [
        "Practice 1-5 tables every day",
        "Practice 6-10 tables",
        "Practice 11-12 tables",
        "Take a practice quiz",
        "Teach someone else!",
      ],
      completedSteps: new Set(["0", "1"]),
      progress: 40,
      emoji: "🧮",
      created: new Date(),
    },
  ])
  const [showNewGoalForm, setShowNewGoalForm] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "School",
    emoji: "🎯",
    steps: [""],
  })

  const categories = [
    { name: "School", emoji: "📚", color: "bg-blue-100 text-blue-800" },
    { name: "Health", emoji: "💪", color: "bg-green-100 text-green-800" },
    { name: "Creative", emoji: "🎨", color: "bg-purple-100 text-purple-800" },
    { name: "Social", emoji: "👥", color: "bg-pink-100 text-pink-800" },
    { name: "Personal", emoji: "✨", color: "bg-yellow-100 text-yellow-800" },
  ]

  const emojiOptions = ["🎯", "📚", "💪", "🎨", "🚀", "⭐", "🌟", "💎", "🏆", "🎪"]

  const addStep = () => {
    setNewGoal((prev) => ({
      ...prev,
      steps: [...prev.steps, ""],
    }))
  }

  const updateStep = (index: number, value: string) => {
    setNewGoal((prev) => ({
      ...prev,
      steps: prev.steps.map((step, i) => (i === index ? value : step)),
    }))
  }

  const createGoal = () => {
    if (!newGoal.title.trim()) return

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category,
      emoji: newGoal.emoji,
      steps: newGoal.steps.filter((step) => step.trim()),
      completedSteps: new Set(),
      progress: 0,
      created: new Date(),
    }

    setGoals((prev) => [...prev, goal])
    setNewGoal({
      title: "",
      description: "",
      category: "School",
      emoji: "🎯",
      steps: [""],
    })
    setShowNewGoalForm(false)
  }

  const toggleStep = (goalId: string, stepIndex: string) => {
    setGoals((prev) =>
      prev.map((goal) => {
        if (goal.id === goalId) {
          const newCompletedSteps = new Set(goal.completedSteps)
          if (newCompletedSteps.has(stepIndex)) {
            newCompletedSteps.delete(stepIndex)
          } else {
            newCompletedSteps.add(stepIndex)
          }

          const progress = (newCompletedSteps.size / goal.steps.length) * 100

          return {
            ...goal,
            completedSteps: newCompletedSteps,
            progress,
          }
        }
        return goal
      }),
    )
  }

  return (
    <div className="space-y-6">
      {/* DIDI's Goal Intro */}
      <Card className="bg-gradient-to-r from-purple-500 to-pink-500 border-0 shadow-xl">
        <CardContent className="p-6 text-center">
          <div className="text-4xl mb-3">🤖🎯</div>
          <h2 className="text-2xl font-black text-white mb-2">Let's Dream Big Together!</h2>
          <p className="text-white/90 font-semibold text-lg">
            I'm here to help you break down your goals into fun, doable steps! ✨
          </p>
        </CardContent>
      </Card>

      {/* Add New Goal Button */}
      <div className="text-center">
        <Button
          onClick={() => setShowNewGoalForm(true)}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-black text-lg px-8 py-4 rounded-2xl shadow-xl transform hover:scale-105 transition-all"
        >
          <Plus className="h-6 w-6 mr-2" />
          Create an Awesome Goal! 🚀
        </Button>
      </div>

      {/* New Goal Form */}
      {showNewGoalForm && (
        <Card className="border-4 border-purple-200 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-purple-100 to-pink-100">
            <CardTitle className="text-2xl font-black text-purple-800">🌟 Let's Create Your Goal!</CardTitle>
            <CardDescription className="text-purple-600 font-semibold text-lg">
              DIDI's here to help you make it happen!
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div>
              <label className="text-lg font-black text-gray-800 mb-3 block">What's your awesome goal? 🎯</label>
              <Input
                value={newGoal.title}
                onChange={(e) => setNewGoal((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="I want to..."
                className="text-lg p-4 rounded-xl border-2 border-purple-200 focus:border-purple-400"
              />
            </div>

            <div>
              <label className="text-lg font-black text-gray-800 mb-3 block">Why is this important to you? 💭</label>
              <Textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="This matters to me because..."
                rows={3}
                className="text-lg p-4 rounded-xl border-2 border-purple-200 focus:border-purple-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="text-lg font-black text-gray-800 mb-3 block">Pick a category 📂</label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full p-4 text-lg rounded-xl border-2 border-purple-200 focus:border-purple-400"
                >
                  {categories.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.emoji} {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-lg font-black text-gray-800 mb-3 block">Choose an emoji 😊</label>
                <div className="grid grid-cols-5 gap-2">
                  {emojiOptions.map((emoji) => (
                    <Button
                      key={emoji}
                      variant={newGoal.emoji === emoji ? "default" : "outline"}
                      onClick={() => setNewGoal((prev) => ({ ...prev, emoji }))}
                      className="text-2xl p-3 rounded-xl"
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-lg font-black text-gray-800 mb-3 block">Break it into steps! 📝</label>
              <div className="space-y-3">
                {newGoal.steps.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="text-2xl font-black text-purple-500">{index + 1}.</span>
                    <Input
                      value={step}
                      onChange={(e) => updateStep(index, e.target.value)}
                      placeholder={`Step ${index + 1}...`}
                      className="flex-1 text-lg p-3 rounded-xl border-2 border-purple-200"
                    />
                  </div>
                ))}
                <Button
                  variant="outline"
                  onClick={addStep}
                  className="w-full bg-purple-50 border-2 border-purple-200 text-purple-700 font-bold text-lg p-4 rounded-xl hover:bg-purple-100"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Another Step
                </Button>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                onClick={createGoal}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-black text-lg p-4 rounded-xl"
              >
                <Rocket className="h-5 w-5 mr-2" />
                Create My Goal!
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowNewGoalForm(false)}
                className="px-8 text-lg font-bold rounded-xl"
              >
                Maybe Later
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      <div className="space-y-6">
        {goals.map((goal) => {
          const categoryInfo = categories.find((c) => c.name === goal.category)

          return (
            <Card key={goal.id} className="overflow-hidden shadow-xl border-0">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{goal.emoji}</div>
                    <div>
                      <CardTitle className="text-2xl font-black mb-2">{goal.title}</CardTitle>
                      <CardDescription className="text-indigo-100 font-semibold text-lg">
                        {goal.description}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge className={`${categoryInfo?.color} border-0 font-bold text-lg px-4 py-2`}>
                    {categoryInfo?.emoji} {goal.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                <div className="space-y-6">
                  {/* Progress */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-lg font-black text-gray-800">Progress</span>
                      <span className="text-lg font-bold text-purple-600">
                        {goal.completedSteps.size} of {goal.steps.length} steps done!
                      </span>
                    </div>
                    <Progress value={goal.progress} className="h-4 rounded-full" />
                    {goal.progress === 100 && (
                      <div className="text-center mt-4">
                        <div className="text-4xl mb-2">🎉🏆🎉</div>
                        <p className="text-2xl font-black text-green-600">GOAL COMPLETED!</p>
                        <p className="text-lg font-bold text-gray-600">You're absolutely amazing!</p>
                      </div>
                    )}
                  </div>

                  {/* Steps */}
                  <div>
                    <h4 className="text-xl font-black text-gray-800 mb-4">Your Action Steps:</h4>
                    <div className="space-y-3">
                      {goal.steps.map((step, index) => {
                        const stepId = index.toString()
                        const isCompleted = goal.completedSteps.has(stepId)

                        return (
                          <div
                            key={index}
                            className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all transform hover:scale-105 ${
                              isCompleted
                                ? "bg-gradient-to-r from-green-100 to-emerald-100 border-green-300 shadow-lg"
                                : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                            }`}
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleStep(goal.id, stepId)}
                              className="p-0 h-auto hover:bg-transparent"
                            >
                              {isCompleted ? (
                                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                                  <CheckCircle2 className="h-5 w-5 text-white" />
                                </div>
                              ) : (
                                <div className="w-8 h-8 border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-purple-400">
                                  <span className="text-sm font-bold text-gray-500">{index + 1}</span>
                                </div>
                              )}
                            </Button>
                            <span
                              className={`text-lg font-semibold flex-1 ${
                                isCompleted ? "line-through text-gray-500" : "text-gray-800"
                              }`}
                            >
                              {step}
                            </span>
                            {isCompleted && (
                              <div className="flex items-center gap-2 text-green-600">
                                <Star className="h-5 w-5 animate-spin" />
                                <span className="font-black text-sm">DONE!</span>
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Empty State */}
      {goals.length === 0 && !showNewGoalForm && (
        <Card className="text-center py-12 bg-gradient-to-r from-purple-100 to-pink-100 border-4 border-purple-200">
          <CardContent>
            <div className="text-6xl mb-4">🤖💭</div>
            <h3 className="text-2xl font-black text-purple-800 mb-3">Ready to Dream Big?</h3>
            <p className="text-purple-600 font-semibold text-lg mb-6">Let's create your first awesome goal together!</p>
            <Button
              onClick={() => setShowNewGoalForm(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-black text-xl px-8 py-4 rounded-2xl shadow-xl"
            >
              <Plus className="h-6 w-6 mr-2" />
              Let's Do This! 🚀
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
