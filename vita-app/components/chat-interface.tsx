"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "./navbar";
import { motion, AnimatePresence } from "framer-motion";
import ThinkingAnimation from "./thinking-animation";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Only track user authentication state, no Firestore fetch
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsThinking(true);

    try {
      const response = await fetch("http://localhost:3005/process", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!response.ok) {
        throw new Error(`Failed with status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.modifiedText,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      // Save to Firestore
      await addDoc(collection(db, "chatHistory"), {
        userId: user.uid,
        content: userMessage.content,
        role: userMessage.role,
        timestamp: userMessage.timestamp,
      });

      await addDoc(collection(db, "chatHistory"), {
        userId: user.uid,
        content: botMessage.content,
        role: botMessage.role,
        timestamp: botMessage.timestamp,
      });

      // Optional: Save to Frappe backend
      const payload = {
        table_uwpq: [
          {
            query: userMessage.content,
            response: botMessage.content,
          },
        ],
      };
      const frappeResponse = await fetch(
        "http://localhost:8000/api/resource/ChatHistory",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "token 0f64f9bbdafaf27:a8f5e171202d44f",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!frappeResponse.ok) {
        console.error(`Failed to save to Frappe: ${frappeResponse.status}`);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[url('https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?t=st=1740811759~exp=1740815359~hmac=d587e951c6410f56f1d15105b9db2bf4836ba397ffbed3ed6e645c5e769f1e39&w=2000')] bg-cover bg-center bg-no-repeat">
      <Navbar />
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex ${
                  message.role === "user" ? "flex-row-reverse" : "flex-row"
                } gap-2 max-w-[80%]`}
              >
                <Avatar
                  className={`h-8 w-8 ${
                    message.role === "user"
                      ? "bg-blue-400"
                      : "bg-gradient-to-br from-gray-500 to-gray-700"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <>
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="Assistant"
                      />
                      <AvatarFallback className="text-black">AI</AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback className="text-black">U</AvatarFallback>
                  )}
                </Avatar>
                <Card
                  className={`border-0 shadow-md ${
                    message.role === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-card"
                  }`}
                >
                  <CardContent
                    className="p-3"
                    style={{ whiteSpace: "pre-wrap" }}
                  >
                    {message.content}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isThinking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex justify-start"
          >
            <div className="flex flex-row gap-2 max-w-[80%]">
              <Avatar className="h-8 w-8 bg-gradient-to-br from-gray-500 to-gray-700">
                <AvatarFallback className="text-black">AI</AvatarFallback>
              </Avatar>
              <Card className="border-0 shadow-md">
                <CardContent className="p-3">
                  <ThinkingAnimation />
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <motion.div
        className="p-4 border-t bg-background/80 backdrop-blur-sm"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSend} className="flex gap-2 max-w-3xl mx-auto">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border-primary/20 focus-visible:ring-primary/30 shadow-sm"
          />
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={!input.trim() || isThinking || !user}
          >
            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
              whileHover={{ rotate: 45 }}
              transition={{ duration: 0.2 }}
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </motion.svg>
            Send
          </Button>
        </form>
      </motion.div>
    </div>
  );
}
