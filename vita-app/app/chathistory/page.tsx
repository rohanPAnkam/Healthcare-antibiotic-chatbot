"use client";

import { useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";
import Navbar from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export default function ChatHistoryPage() {
  const [user, setUser] = useState<User | null>(null);
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("ChatHistoryPage: useEffect triggered");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log(
        "Auth state changed, currentUser:",
        currentUser?.uid || "null"
      );
      setUser(currentUser);
      setLoading(false);

      if (!currentUser) {
        console.log("No user, redirecting to /login");
        router.push("/login");
      } else {
        console.log("Fetching chat history for user:", currentUser.uid);
        const q = query(
          collection(db, "chatHistory"),
          where("userId", "==", currentUser.uid),
          orderBy("timestamp", "asc")
        );
        const unsubscribeSnapshot = onSnapshot(
          q,
          (snapshot) => {
            console.log(
              "Firestore snapshot received, docs:",
              snapshot.docs.length
            );
            const history = snapshot.docs.map((doc) => {
              const data = doc.data();
              console.log("Document:", doc.id, data);
              return {
                id: doc.id,
                ...data,
                timestamp: data.timestamp.toDate(),
              };
            }) as Message[];
            setChatHistory(history);
            console.log("Updated chatHistory state:", history);
          },
          (error) => {
            console.error("Error fetching chat history:", error);
          }
        );
        return () => unsubscribeSnapshot();
      }
    });

    return () => {
      console.log("ChatHistoryPage: Cleaning up subscriptions");
      unsubscribe();
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen bg-[url('https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?t=st=1740811759~exp=1740815359~hmac=d587e951c6410f56f1d15105b9db2bf4836ba397ffbed3ed6e645c5e769f1e39&w=2000')] bg-cover bg-center bg-no-repeat">
      <Navbar />
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
        <h1 className="text-2xl font-bold text-white mb-4">Chat History</h1>
        {chatHistory.length === 0 ? (
          <p className="text-white">No chat history available.</p>
        ) : (
          <AnimatePresence initial={false}>
            {chatHistory.map((message) => (
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
                        <AvatarFallback className="text-black">
                          AI
                        </AvatarFallback>
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
                      <p>{message.content}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleString()}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
