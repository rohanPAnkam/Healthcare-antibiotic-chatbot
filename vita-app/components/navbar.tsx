"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { auth } from "../lib/firebase"; // Adjust the import path to your Firebase config
import { onAuthStateChanged, signOut, User } from "firebase/auth"; // Import User type from Firebase

// Custom hook to manage auth state with Firebase
const useAuth = () => {
  const [user, setUser] = useState<User | null>(null); // Use Firebase User type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up Firebase auth state listener
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set user if logged in, null if logged out
      setLoading(false); // Loading is done once auth state is determined
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Firebase signOut method
      setUser(null); // Clear user state (optional, onAuthStateChanged will handle it)
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return { user, loading, signOut: handleSignOut };
};

export default function Navbar() {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/"); // Redirect to home page after logout
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
            className="relative w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center"
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
            // Show Logout button when user is signed in
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="text-destructive hover:text-destructive/80 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-log-out"
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Logout
              </Button>
            </motion.div>
          ) : (
            // Show Login and Sign Up buttons when user is not signed in
            <>
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Button
                  variant="ghost"
                  asChild
                  className="text-primary hover:text-primary/80"
                >
                  <Link href="/login">Login</Link>
                </Button>
              </motion.div>
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Button
                  asChild
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <Link href="/signup">Sign up</Link>
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}
