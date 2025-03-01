"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronDown, Menu, Plus, Send, Sparkles, Moon, Sun } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function CreativeChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your creative AI assistant. How can I inspire you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark" | "cosmic">("cosmic")
  const [isTyping, setIsTyping] = useState(false)
  const [typingDots, setTypingDots] = useState(".")

  // Simulate typing animation
  useEffect(() => {
    if (isTyping) {
      const interval = setInterval(() => {
        setTypingDots((prev) => (prev.length < 3 ? prev + "." : "."))
      }, 400)
      return () => clearInterval(interval)
    }
  }, [isTyping])

  const handleSendMessage = async () => {
    if (!input.trim()) return;
  
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };
  
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);
  
    try {
      const response = await fetch("http://localhost:3005/process", {  // Changed from 5000 to 3005
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed with status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Received from backend:", data);
  
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.modifiedText,
        role: "assistant",
        timestamp: new Date(),
      };
  
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, something went wrong. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === "light") return "dark"
      if (prev === "dark") return "cosmic"
      return "light"
    })
  }

  // Apply theme class to body
  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <div className={`flex h-screen ${theme}`}>
      {/* Background elements */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-indigo-950 cosmic:from-indigo-900 cosmic:via-purple-800 cosmic:to-pink-800 transition-colors duration-500"></div>

      {/* Animated background patterns - only in cosmic theme */}
      {theme === "cosmic" && (
        <>
          <div className="fixed inset-0 opacity-10">
            <div className="absolute w-full h-full bg-[url('/placeholder.svg?height=200&width=200')] bg-repeat"></div>
          </div>
          <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
            <div className="absolute top-0 -right-20 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-40 left-20 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
          </div>
        </>
      )}

      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 left-4 md:hidden z-50 bg-white/20 backdrop-blur-lg dark:bg-gray-800/20 cosmic:bg-indigo-900/20 hover:bg-white/30 dark:hover:bg-gray-800/30 cosmic:hover:bg-indigo-900/30"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Menu className="text-gray-800 dark:text-white cosmic:text-indigo-100" />
      </Button>

      {/* Theme toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-50 bg-white/20 backdrop-blur-lg dark:bg-gray-800/20 cosmic:bg-indigo-900/20 hover:bg-white/30 dark:hover:bg-gray-800/30 cosmic:hover:bg-indigo-900/30"
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <Moon className="text-gray-800" />
        ) : theme === "dark" ? (
          <Sparkles className="text-yellow-300" />
        ) : (
          <Sun className="text-yellow-200" />
        )}
      </Button>

      {/* Sidebar */}
      <div
        className={`w-64 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 cosmic:bg-indigo-900/30 border-r border-gray-200/50 dark:border-gray-700/30 cosmic:border-indigo-500/30 flex flex-col 
        ${menuOpen ? "absolute inset-y-0 left-0 z-40" : "hidden"} md:flex transition-all duration-300`}
      >
        <div className="p-4 border-b border-gray-200/50 dark:border-gray-700/30 cosmic:border-indigo-500/30">
          <div className="flex items-center justify-center mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 dark:from-purple-600 dark:to-blue-600 cosmic:from-pink-500 cosmic:to-indigo-500 flex items-center justify-center">
              <Sparkles className="text-white" size={20} />
            </div>
            <h1 className="ml-2 font-bold text-gray-800 dark:text-white cosmic:text-indigo-100">Nebula AI</h1>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start gap-2 bg-white/50 dark:bg-gray-800/50 cosmic:bg-indigo-800/50 border-gray-200 dark:border-gray-700 cosmic:border-indigo-600"
          >
            <Plus size={16} />
            New Conversation
          </Button>
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal text-gray-700 dark:text-gray-300 cosmic:text-indigo-200 hover:bg-white/20 dark:hover:bg-gray-800/20 cosmic:hover:bg-indigo-800/20"
            >
              <span className="truncate">Creative writing ideas</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal text-gray-700 dark:text-gray-300 cosmic:text-indigo-200 hover:bg-white/20 dark:hover:bg-gray-800/20 cosmic:hover:bg-indigo-800/20"
            >
              <span className="truncate">Design inspiration</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-left font-normal text-gray-700 dark:text-gray-300 cosmic:text-indigo-200 hover:bg-white/20 dark:hover:bg-gray-800/20 cosmic:hover:bg-indigo-800/20"
            >
              <span className="truncate">Brainstorming session</span>
            </Button>
          </div>
        </ScrollArea>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 cosmic:bg-indigo-900/30 border-b border-gray-200/50 dark:border-gray-700/30 cosmic:border-indigo-500/30 p-4 flex items-center justify-center">
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className="gap-1 px-4 py-2 rounded-full bg-white/50 dark:bg-gray-800/50 cosmic:bg-indigo-800/50 text-gray-800 dark:text-white cosmic:text-indigo-100"
            >
              Creative AI
              <ChevronDown size={16} />
            </Button>
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
          </div>
        </header>

        {/* Chat area */}
        <ScrollArea className="flex-1 p-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fadeIn`}
              >
                <div
                  className={`max-w-[80%] p-4 rounded-2xl backdrop-blur-lg 
                    ${
                      message.role === "assistant"
                        ? "bg-white/70 dark:bg-gray-800/70 cosmic:bg-indigo-900/40 border border-gray-200/50 dark:border-gray-700/30 cosmic:border-indigo-500/30"
                        : "bg-gradient-to-br from-purple-500 to-blue-500 dark:from-purple-600 dark:to-blue-600 cosmic:from-pink-500 cosmic:to-indigo-500 text-white"
                    }
                    ${message.role === "assistant" ? "rounded-tl-sm" : "rounded-tr-sm"}
                  `}
                >
                  <div className="flex gap-3">
                    {message.role === "assistant" && (
                      <Avatar className="h-8 w-8 border-2 border-purple-200 dark:border-purple-900 cosmic:border-indigo-400">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 dark:from-purple-600 dark:to-blue-600 cosmic:from-pink-500 cosmic:to-indigo-500 text-white">
                          AI
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div className="space-y-1">
                      <div
                        className={`font-medium ${message.role === "assistant" ? "text-gray-800 dark:text-white cosmic:text-indigo-100" : "text-white"}`}
                      >
                        {message.role === "assistant" ? "Nebula AI" : "You"}
                      </div>
                      <div
                        className={`text-sm ${message.role === "assistant" ? "text-gray-700 dark:text-gray-300 cosmic:text-indigo-200" : "text-white"}`}
                      >
                        {message.content}
                      </div>
                    </div>
                    {message.role === "user" && (
                      <Avatar className="h-8 w-8 border-2 border-blue-200 dark:border-blue-900 cosmic:border-indigo-400">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          You
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start animate-fadeIn">
                <div className="max-w-[80%] p-4 rounded-2xl backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 cosmic:bg-indigo-900/40 border border-gray-200/50 dark:border-gray-700/30 cosmic:border-indigo-500/30 rounded-tl-sm">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8 border-2 border-purple-200 dark:border-purple-900 cosmic:border-indigo-400">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 dark:from-purple-600 dark:to-blue-600 cosmic:from-pink-500 cosmic:to-indigo-500 text-white">
                        AI
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <div className="font-medium text-gray-800 dark:text-white cosmic:text-indigo-100">Nebula AI</div>
                      <div className="text-sm text-gray-700 dark:text-gray-300 cosmic:text-indigo-200">
                        Thinking{typingDots}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input area */}
        <div className="p-4 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 cosmic:bg-indigo-900/30 border-t border-gray-200/50 dark:border-gray-700/30 cosmic:border-indigo-500/30">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <Input
                placeholder="Send a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault()
                    handleSendMessage()
                  }
                }}
                className="pr-12 bg-white/50 dark:bg-gray-800/50 cosmic:bg-indigo-800/50 backdrop-blur-lg border-gray-200/50 dark:border-gray-700/30 cosmic:border-indigo-500/30 text-gray-800 dark:text-white cosmic:text-indigo-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 cosmic:placeholder:text-indigo-300 rounded-full py-6"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!input.trim()}
                className="absolute right-1 top-1 rounded-full h-10 w-10 bg-gradient-to-br from-purple-500 to-blue-500 dark:from-purple-600 dark:to-blue-600 cosmic:from-pink-500 cosmic:to-indigo-500 hover:opacity-90 transition-opacity"
              >
                <Send size={16} className="text-white" />
                <span className="sr-only">Send</span>
              </Button>
            </div>
            <div className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400 cosmic:text-indigo-300">
              Nebula AI is here to spark your creativity. Ask anything!
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

