"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Target, Plus, CheckCircle2, Clock, Star } from "lucide-react"

interface Goal {
  id: string
  title: string
  description: string
  category: string
  targetDate: string
  progress: number
  steps: string[]
  completedSteps: Set<string>
  created: Date
}

export function GoalSetting() {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: "1",
      title: "Master Multiplication Tables",
      description: "Practice multiplication tables 1-12 for 10 minutes daily",
      category: "Learning",
      targetDate: "2024-02-15",
      progress: 60,
      steps: [
        "Practice tables 1-5",
        "Practice tables 6-10",
        "Practice tables 11-12",
        "Take practice quiz",
        "Teach someone else",
      ],
      completedSteps: new Set(["1", "2", "3"]),
      created: new Date(),
    },
  ])
  const [showNewGoalForm, setShowNewGoalForm] = useState(false)
  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "Learning",
    targetDate: "",
    steps: [""],
  })

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

  const removeStep = (index: number) => {
    setNewGoal((prev) => ({
      ...prev,
      steps: prev.steps.filter((_, i) => i !== index),
    }))
  }

  const createGoal = () => {
    if (!newGoal.title.trim()) return

    const goal: Goal = {
      id: Date.now().toString(),
      title: newGoal.title,
      description: newGoal.description,
      category: newGoal.category,
      targetDate: newGoal.targetDate,
      progress: 0,
      steps: newGoal.steps.filter((step) => step.trim()),
      completedSteps: new Set(),
      created: new Date(),
    }

    setGoals((prev) => [...prev, goal])
    setNewGoal({
      title: "",
      description: "",
      category: "Learning",
      targetDate: "",
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

  const categories = ["Learning", "Health", "Organization", "Social", "Creative"]
  const categoryColors = {
    Learning: "bg-blue-100 text-blue-800",
    Health: "bg-green-100 text-green-800",
    Organization: "bg-purple-100 text-purple-800",
    Social: "bg-pink-100 text-pink-800",
    Creative: "bg-orange-100 text-orange-800",
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Goal Setting</h2>
          <p className="text-gray-600">Set meaningful goals and break them down into achievable steps</p>
        </div>
        <Button
          onClick={() => setShowNewGoalForm(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Goal
        </Button>
      </div>

      {/* New Goal Form */}
      {showNewGoalForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create a New Goal</CardTitle>
            <CardDescription>Let's break down your goal into manageable steps</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Goal Title</label>
              <Input
                value={newGoal.title}
                onChange={(e) => setNewGoal((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="What do you want to achieve?"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <Textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Why is this goal important to you?"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Category</label>
                <select
                  value={newGoal.category}
                  onChange={(e) => setNewGoal((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2 border rounded-md"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Target Date</label>
                <Input
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) => setNewGoal((prev) => ({ ...prev, targetDate: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Steps to Achieve This Goal</label>
              <div className="space-y-2">
                {newGoal.steps.map((step, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={step}
                      onChange={(e) => updateStep(index, e.target.value)}
                      placeholder={`Step ${index + 1}`}
                    />
                    {newGoal.steps.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => removeStep(index)}>
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" onClick={addStep} className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Step
                </Button>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button onClick={createGoal} className="flex-1">
                Create Goal
              </Button>
              <Button variant="outline" onClick={() => setShowNewGoalForm(false)}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Goals List */}
      <div className="grid gap-4">
        {goals.map((goal) => (
          <Card key={goal.id} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="flex items-center gap-2 mb-2">
                    <Target className="h-5 w-5 text-purple-500" />
                    {goal.title}
                  </CardTitle>
                  <CardDescription>{goal.description}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={categoryColors[goal.category as keyof typeof categoryColors]}>
                    {goal.category}
                  </Badge>
                  {goal.progress === 100 && <Star className="h-5 w-5 text-yellow-500" />}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Progress */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-gray-600">
                      {goal.completedSteps.size} of {goal.steps.length} steps
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                </div>

                {/* Target Date */}
                {goal.targetDate && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    Target: {new Date(goal.targetDate).toLocaleDateString()}
                  </div>
                )}

                {/* Steps */}
                <div>
                  <h4 className="font-medium mb-2">Steps:</h4>
                  <div className="space-y-2">
                    {goal.steps.map((step, index) => {
                      const stepId = index.toString()
                      const isCompleted = goal.completedSteps.has(stepId)

                      return (
                        <div
                          key={index}
                          className={`flex items-center gap-3 p-2 rounded-lg border transition-all ${
                            isCompleted ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                          }`}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleStep(goal.id, stepId)}
                            className="p-0 h-auto"
                          >
                            <CheckCircle2 className={`h-5 w-5 ${isCompleted ? "text-green-500" : "text-gray-400"}`} />
                          </Button>
                          <span className={`text-sm ${isCompleted ? "line-through text-gray-500" : ""}`}>{step}</span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {goals.length === 0 && !showNewGoalForm && (
        <Card className="text-center py-12">
          <CardContent>
            <Target className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-600 mb-2">No goals yet</h3>
            <p className="text-gray-500 mb-4">Create your first goal to start building amazing habits!</p>
            <Button
              onClick={() => setShowNewGoalForm(true)}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Goal
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
