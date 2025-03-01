"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

// This is a placeholder for the actual auth state management
// Replace with your Firebase auth implementation
const useAuth = () => {
  const [user, setUser] = useState<{
    displayName: string
    photoURL: string
    email: string
  } | null>(null)
  const [loading, setLoading] = useState(true)

  // Simulate auth state change
  useEffect(() => {
    // This is where you would initialize Firebase Auth
    // and set up the auth state listener
    const timeout = setTimeout(() => {
      setLoading(false)
      // Comment out the next line to simulate logged out state
      // setUser({ displayName: "User Name", photoURL: "/placeholder.svg?height=32&width=32", email: "user@example.com" })
    }, 1000)

    return () => clearTimeout(timeout)
  }, [])

  const signOut = async () => {
    // This is where you would call Firebase signOut method
    setUser(null)
  }

  return { user, loading, signOut }
}

export default function Navbar() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/")
  }

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
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
            ChatBot
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full p-0 overflow-hidden border-2 border-primary/20 hover:border-primary/50 transition-colors"
                  >
                    <Avatar className="h-full w-full">
                      <AvatarImage src={user.photoURL} alt={user.displayName} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white">
                        {user.displayName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 overflow-hidden border border-primary/20 glass">
                  <div className="flex items-center gap-2 p-2 border-b">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.photoURL} alt={user.displayName} />
                      <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white">
                        {user.displayName?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-0.5">
                      <p className="text-sm font-medium">{user.displayName}</p>
                      <p className="text-xs text-muted-foreground truncate max-w-[180px]">{user.email}</p>
                    </div>
                  </div>
                  <DropdownMenuItem
                    onClick={handleSignOut}
                    className="cursor-pointer flex items-center gap-2 text-destructive focus:text-destructive"
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
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <Button variant="ghost" asChild className="text-primary hover:text-primary/80">
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
                  className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white"
                >
                  <Link href="/signup">Sign up</Link>
                </Button>
              </motion.div>
            </>
          )}
        </div>
      </div>
    </motion.header>
  )
}

