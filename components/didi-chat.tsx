"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Mic } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "didi"
  timestamp: Date
  type?: "ritual-suggestion" | "celebration" | "motivation" | "normal"
  ritualId?: string
}

interface DIDIChatProps {
  userName: string
  completedRituals: Set<string>
  totalPoints: number
  level: number
  maxStreak: number
  onToggleRitual: (ritualId: string) => void
}

const didiPersonality = {
  greetings: [
    `Hey ${name}! 🌟 I'm DIDI and I'm SO excited to hang out with you today! What's up?`,
    `Yooo ${name}! 🎉 Ready to crush some goals together? I'm here for it!`,
    `Hey bestie! 💫 DIDI here and I'm pumped to see what awesome stuff we'll do today!`,
  ],
  celebrations: [
    "YESSS! 🎉 You're absolutely CRUSHING it! I'm so proud of you!",
    "OMG YES! 🌟 That's what I'm talking about! You're amazing!",
    "WOOHOO! 🎊 Look at you being all awesome and stuff! Keep it up!",
    "I'm literally doing a happy dance right now! 💃 You're incredible!",
  ],
  motivation: [
    "Hey, it's totally okay! 💙 Everyone has tough days. What matters is that you're here trying!",
    "You know what? You're braver than you think! 🦁 Let's take this one tiny step at a time.",
    "I believe in you SO much! 🌈 You've got this, and I'm right here cheering you on!",
    "Plot twist: You're already doing amazing just by being here! ✨ Let's keep going together!",
  ],
  encouragement: [
    "Ooh, I have an idea! 💡 Want to try something fun together?",
    "You're doing so good! 🌟 Should we tackle something else or just chill and chat?",
    "I'm having the best time hanging out with you! 😊 What should we do next?",
    "You're like, seriously awesome! 🚀 Ready for another adventure?",
  ],
}

export function DIDIChat({ userName, completedRituals, totalPoints, level, maxStreak, onToggleRitual }: DIDIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: `Hey ${userName}! 🌟 I'm DIDI and I'm SO excited to hang out with you today! I'm here to help you track your habits, set cool goals, and just be your awesome sidekick! What's up? How are you feeling today? 😊`,
      sender: "didi",
      timestamp: new Date(),
      type: "normal",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const getDIDIResponse = (userMessage: string): Message => {
    const message = userMessage.toLowerCase()

    // Celebration responses
    if (message.includes("did it") || message.includes("finished") || message.includes("completed")) {
      return {
        id: Date.now().toString(),
        content:
          didiPersonality.celebrations[Math.floor(Math.random() * didiPersonality.celebrations.length)] +
          " Tell me what you accomplished! 🎯",
        sender: "didi",
        timestamp: new Date(),
        type: "celebration",
      }
    }

    // Stress/overwhelmed responses
    if (
      message.includes("stress") ||
      message.includes("overwhelmed") ||
      message.includes("anxious") ||
      message.includes("worried")
    ) {
      return {
        id: Date.now().toString(),
        content:
          "Aww, I can hear that you're feeling stressed 💙 That's totally normal! Want to try a quick 2-minute breathing exercise with me? Or we could just chat about what's bugging you. I'm here for you! 🤗",
        sender: "didi",
        timestamp: new Date(),
        type: "motivation",
      }
    }

    // Motivation responses
    if (
      message.includes("tired") ||
      message.includes("don't want") ||
      message.includes("lazy") ||
      message.includes("unmotivated")
    ) {
      return {
        id: Date.now().toString(),
        content:
          didiPersonality.motivation[Math.floor(Math.random() * didiPersonality.motivation.length)] +
          " What's one tiny thing we could do right now? Even 2 minutes counts! 💪",
        sender: "didi",
        timestamp: new Date(),
        type: "motivation",
      }
    }

    // Goal setting responses
    if (
      message.includes("goal") ||
      message.includes("want to") ||
      message.includes("improve") ||
      message.includes("better at")
    ) {
      return {
        id: Date.now().toString(),
        content:
          "Ooh, I LOVE goal talk! 🎯 That sounds awesome! Let's break it down together - what's the first tiny step we could take? Remember, small steps lead to BIG wins! ✨",
        sender: "didi",
        timestamp: new Date(),
        type: "normal",
      }
    }

    // Homework/school responses
    if (
      message.includes("homework") ||
      message.includes("school") ||
      message.includes("test") ||
      message.includes("project")
    ) {
      return {
        id: Date.now().toString(),
        content:
          "School stuff, got it! 📚 I'm like your study buddy! Want to break that work into smaller chunks? Or maybe set a timer for 25 minutes and tackle it together? You've totally got this! 🌟",
        sender: "didi",
        timestamp: new Date(),
        type: "ritual-suggestion",
      }
    }

    // Default friendly responses
    const friendlyResponses = [
      "That's so cool! Tell me more! I love hearing about your day! 😊",
      "Ooh interesting! How did that make you feel? I'm all ears! 👂",
      "I love chatting with you! You're seriously awesome! What else is going on? ✨",
      "That sounds important to you! Want to talk more about it? I'm here! 💙",
      "You know what? You're pretty amazing! What's the best part of your day so far? 🌟",
    ]

    return {
      id: Date.now().toString(),
      content: friendlyResponses[Math.floor(Math.random() * friendlyResponses.length)],
      sender: "didi",
      timestamp: new Date(),
      type: "normal",
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // DIDI response delay
    setTimeout(() => {
      const didiResponse = getDIDIResponse(inputValue)
      setMessages((prev) => [...prev, didiResponse])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const quickActions = [
    { text: "I'm feeling stressed 😰", emoji: "💙" },
    { text: "I finished my homework! 🎉", emoji: "🎯" },
    { text: "I need motivation 💪", emoji: "⚡" },
    { text: "Help me set a goal 🎯", emoji: "✨" },
  ]

  return (
    <Card className="h-[600px] bg-white/95 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 text-white">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl animate-bounce">
            🤖
          </div>
          <div>
            <h3 className="text-xl font-black">DIDI</h3>
            <p className="text-sm text-purple-100 font-semibold">Your awesome AI bestie! ✨</p>
          </div>
          <div className="ml-auto flex gap-2">
            <Badge className="bg-white/20 text-white border-0 font-bold">Level {level} 🏆</Badge>
            <Badge className="bg-white/20 text-white border-0 font-bold">{totalPoints} pts ⭐</Badge>
          </div>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 h-[400px]" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  message.sender === "didi"
                    ? "bg-gradient-to-r from-yellow-400 to-orange-400"
                    : "bg-gradient-to-r from-blue-400 to-purple-400"
                }`}
              >
                {message.sender === "didi" ? "🤖" : "😊"}
              </div>
              <div
                className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${
                  message.sender === "didi"
                    ? "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800"
                    : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                }`}
              >
                <p className="text-sm font-medium leading-relaxed">{message.content}</p>
                <span className="text-xs opacity-70 mt-2 block font-semibold">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Quick Actions */}
      <div className="p-4 border-t bg-gray-50">
        <p className="text-xs text-gray-600 font-semibold mb-2">Quick chat starters:</p>
        <div className="flex gap-2 flex-wrap mb-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => setInputValue(action.text)}
              className="text-xs bg-white hover:bg-purple-50 border-purple-200 text-purple-700 font-semibold rounded-full"
            >
              {action.emoji} {action.text}
            </Button>
          ))}
        </div>

        {/* Input */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type something awesome..."
            className="flex-1 rounded-full border-2 border-purple-200 focus:border-purple-400 font-medium"
          />
          <Button
            onClick={handleSendMessage}
            size="icon"
            className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg"
          >
            <Send className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="rounded-full border-2 border-purple-200 hover:bg-purple-50 bg-transparent"
          >
            <Mic className="h-4 w-4 text-purple-600" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
