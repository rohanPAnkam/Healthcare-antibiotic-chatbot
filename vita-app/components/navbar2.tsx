"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// Placeholder for Firebase auth state management
const useAuth = () => {
  const [user, setUser] = useState<{
    displayName: string;
    photoURL: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
      // Uncomment this line to simulate a logged-in user
      // setUser({ displayName: "User Name", photoURL: "/placeholder.svg?height=32&width=32", email: "user@example.com" })
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  const signOut = async () => {
    setUser(null);
  };

  return { user, loading, signOut };
};

export default function Navbar2() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
  };

  return (
    <motion.header
      className="sticky top-0 z-50 w-full bg-transparent backdrop-blur-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center"
          >
            <span className="text-white font-bold text-sm">AI</span>
          </motion.div>
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-bold text-xl gradient-text"
          >
            VITACHAT
          </motion.span>
        </Link>
        <div className="flex items-center gap-3">
          {loading ? (
            <div className="h-9 w-9 rounded-full bg-muted animate-pulse" />
          ) : user ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={handleSignOut}
                className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white"
              >
                Logout
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                onClick={handleSignOut}
                className="bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 text-white"
              >
                Logout
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.header>
  );
}
