"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send, Bot, User } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

const aiResponses = {
  greeting: [
    "Hey there! 👋 I'm your AI companion. How are you feeling today?",
    "Hi! Ready to tackle some goals together? What's on your mind?",
    "Hello! I'm here to help you build amazing habits. What would you like to work on?",
  ],
  motivation: [
    "You're doing great! Every small step counts toward building lasting habits. 🌟",
    "I believe in you! Remember, progress isn't always perfect, and that's totally okay.",
    "You've got this! What matters most is that you're trying and learning along the way.",
  ],
  goalSetting: [
    "That's an awesome goal! Let's break it down into smaller, manageable steps. What's the first thing you could do today?",
    "I love that you want to improve! What makes this goal important to you right now?",
    "Great choice! How will you know when you've achieved this goal? What will success look like?",
  ],
  stress: [
    "It sounds like you're feeling overwhelmed. That's completely normal! Let's take a deep breath together. What's the biggest thing stressing you out?",
    "Stress happens to everyone, especially students! Would you like to try a quick 2-minute breathing exercise, or talk about what's bothering you?",
    "I hear you. Sometimes school and life feel like a lot. What's one small thing we could do right now to help you feel a bit better?",
  ],
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Hey there! 👋 I'm your AI companion. I'm here to help you build amazing habits, set goals, and navigate school life. How are you feeling today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    if (message.includes("stress") || message.includes("overwhelmed") || message.includes("anxious")) {
      return aiResponses.stress[Math.floor(Math.random() * aiResponses.stress.length)]
    }

    if (message.includes("goal") || message.includes("want to") || message.includes("improve")) {
      return aiResponses.goalSetting[Math.floor(Math.random() * aiResponses.goalSetting.length)]
    }

    if (message.includes("tired") || message.includes("unmotivated") || message.includes("give up")) {
      return aiResponses.motivation[Math.floor(Math.random() * aiResponses.motivation.length)]
    }

    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return aiResponses.greeting[Math.floor(Math.random() * aiResponses.greeting.length)]
    }

    // Default responses based on context
    const responses = [
      "That's really interesting! Tell me more about that. How does it make you feel?",
      "I understand. What do you think would help you with this situation?",
      "Thanks for sharing that with me. What's one small step you could take today?",
      "That sounds important to you. How can I help you work through this?",
      "I hear you. What would make this easier or more manageable for you?",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
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

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputValue),
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-3 ${message.sender === "user" ? "flex-row-reverse" : ""}`}
            >
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.sender === "ai" ? "bg-purple-100 text-purple-600" : "bg-blue-100 text-blue-600"
                }`}
              >
                {message.sender === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.sender === "ai" ? "bg-gray-100 text-gray-800" : "bg-blue-500 text-white"
                }`}
              >
                <p className="text-sm">{message.content}</p>
                <span className="text-xs opacity-70 mt-1 block">
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

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          I'm here to help with goals, habits, stress, and school life! 💙
        </p>
      </div>
    </div>
  )
}
