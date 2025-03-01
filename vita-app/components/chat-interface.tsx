// "use client"

// import type React from "react"

// import { useState, useRef, useEffect, useCallback } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Card, CardContent } from "@/components/ui/card"
// import Navbar from "./navbar"
// import { motion, AnimatePresence } from "framer-motion"
// import ThinkingAnimation from "./thinking-animation"

// interface Message {
//   id: string
//   content: string
//   role: "user" | "assistant"
//   timestamp: Date
// }

// export default function ChatInterface() {
//   const [messages, setMessages] = useState([{ role: "bot", content: "Hello! How can I help you today?" }])
//   const [input, setInput] = useState("")
//   const [isThinking, setIsThinking] = useState(false)
//   const messagesEndRef = useRef<HTMLDivElement>(null)

//   const scrollToBottom = useCallback(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
//   }, [])

//   useEffect(() => {
//     scrollToBottom()
//   }, [scrollToBottom])

//   // const handleSend = async (e: React.FormEvent) => {
//   //   e.preventDefault()
//   //   if (!input.trim()) return

//   //   // Add user message
//   //   setMessages((prev) => [...prev, { role: "user", content: input }])
//   //   setInput("")

//   //   // Start thinking animation
//   //   setIsThinking(true)

//   //   // Simulate bot response (replace this with actual API call)
//   //   try {
//   //     await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulating API delay
//   //     setMessages((prev) => [
//   //       ...prev,
//   //       {
//   //         role: "bot",
//   //         content: "This is a simulated response. In a real application, this would come from your chatbot backend.",
//   //       },
//   //     ])
//   //   } finally {
//   //     setIsThinking(false)
//   //   }
//   // }

//   const handleSend = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     // Add user message with full Message type structure
//     const userMessage: Message = {
//       id: Date.now().toString(),
//       content: input,
//       role: "user",
//       timestamp: new Date(),
//     };
    
//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
    
//     // Start thinking animation (renamed from setIsThinking to setIsTyping for consistency)
//     setIsThinking(true);

//     try {
//       const response = await fetch("http://localhost:3005/process", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ text: input }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed with status: ${response.status}`);
//       }

//       const data = await response.json();
//       console.log("Received from backend:", data);

//       const botMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         content: data.modifiedText,
//         role: "assistant",  // Keeping "bot" instead of "assistant" to match original
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, botMessage]);
//     } catch (error) {
//       console.error("Error sending message:", error);
//       const errorMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         content: "Sorry, something went wrong. Please try again.",
//         role: "assistant",  // Matching original role
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setIsThinking(false);  // Changed from setIsThinking to setIsTyping
//     }
//   };

//   return (
//     <div className="flex flex-col h-screen bg-gradient-to-b from-background to-background/95">
//       <Navbar />
//       <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
//         <AnimatePresence initial={false}>
//           {messages.map((message, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -20 }}
//               transition={{ duration: 0.3 }}
//               className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
//             >
//               <div className={`flex ${message.role === "user" ? "flex-row-reverse" : "flex-row"} gap-2 max-w-[80%]`}>
//                 <Avatar
//                   className={`h-8 w-8 ${message.role === "user" ? "bg-gradient-to-br from-primary to-purple-600" : "bg-gradient-to-br from-gray-500 to-gray-700"}`}
//                 >
//                   {message.role === "bot" ? (
//                     <>
//                       <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
//                       <AvatarFallback className="text-white">AI</AvatarFallback>
//                     </>
//                   ) : (
//                     <AvatarFallback className="text-white">U</AvatarFallback>
//                   )}
//                 </Avatar>
//                 <Card
//                   className={`border-0 shadow-md ${
//                     message.role === "user" ? "bg-gradient-to-r from-primary to-purple-600 text-white" : "bg-card"
//                   }`}
//                 >
//                   <CardContent className="p-3">
//                     <p>{message.content}</p>
//                   </CardContent>
//                 </Card>
//               </div>
//             </motion.div>
//           ))}
//         </AnimatePresence>
//         {isThinking && (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             className="flex justify-start"
//           >
//             <div className="flex flex-row gap-2 max-w-[80%]">
//               <Avatar className="h-8 w-8 bg-gradient-to-br from-gray-500 to-gray-700">
//                 <AvatarFallback className="text-white">AI</AvatarFallback>
//               </Avatar>
//               <Card className="border-0 shadow-md">
//                 <CardContent className="p-3">
//                   <ThinkingAnimation />
//                 </CardContent>
//               </Card>
//             </div>
//           </motion.div>
//         )}
//         <div ref={messagesEndRef} />
//       </div>
//       <motion.div
//         className="p-4 border-t bg-background/80 backdrop-blur-sm"
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5 }}
//       >
//         <form onSubmit={handleSend} className="flex gap-2 max-w-3xl mx-auto">
//           <Input
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             placeholder="Type your message..."
//             className="flex-1 border-primary/20 focus-visible:ring-primary/30 shadow-sm"
//           />
//           <Button
//             type="submit"
//             className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white"
//             disabled={!input.trim() || isThinking}
//           >
//             <motion.svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="18"
//               height="18"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               className="mr-1"
//               whileHover={{ rotate: 45 }}
//               transition={{ duration: 0.2 }}
//             >
//               <path d="m22 2-7 20-4-9-9-4Z" />
//               <path d="M22 2 11 13" />
//             </motion.svg>
//             Send
//           </Button>
//         </form>
//       </motion.div>
//     </div>
//   )
// }

"use client";

import type React from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import Navbar from "./navbar";
import { motion, AnimatePresence } from "framer-motion";
import ThinkingAnimation from "./thinking-animation";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";  // Match handleSend roles
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      role: "assistant",  // Changed from "bot" to "assistant"
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);  // Added messages dependency

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

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
      console.log("Received from backend:", data);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.modifiedText,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
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
      setIsThinking(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-background to-background/95">
      <Navbar />
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}  // Changed from index to message.id
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`flex ${message.role === "user" ? "flex-row-reverse" : "flex-row"} gap-2 max-w-[80%]`}>
                <Avatar
                  className={`h-8 w-8 ${message.role === "user" ? "bg-gradient-to-br from-primary to-purple-600" : "bg-gradient-to-br from-gray-500 to-gray-700"}`}
                >
                  {message.role === "assistant" ? (
                    <>
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Assistant" />
                      <AvatarFallback className="text-white">AI</AvatarFallback>
                    </>
                  ) : (
                    <AvatarFallback className="text-white">U</AvatarFallback>
                  )}
                </Avatar>
                <Card
                  className={`border-0 shadow-md ${
                    message.role === "user" ? "bg-gradient-to-r from-primary to-purple-600 text-white" : "bg-card"
                  }`}
                >
                  <CardContent className="p-3" style={{ whiteSpace: "pre-wrap" }}>  {/* Added whiteSpace */}
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
                <AvatarFallback className="text-white">AI</AvatarFallback>
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
            className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white"
            disabled={!input.trim() || isThinking}
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