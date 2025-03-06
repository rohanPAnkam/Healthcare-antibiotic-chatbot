"use client";

import { useState, useEffect } from "react";
import { auth } from "../../lib/firebase"; // Adjust the path to your Firebase config
import { User, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import Navbar from "../../components/navbar"; // Adjust the path
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Fetch user information
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      if (!currentUser) {
        // Redirect to login if not authenticated
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null; // Redirect will handle this
  }

  return (
    <div className="flex flex-col h-screen bg-[url('https://img.freepik.com/free-vector/network-mesh-wire-digital-technology-background_1017-27428.jpg?t=st=1740811759~exp=1740815359~hmac=d587e951c6410f56f1d15105b9db2bf4836ba397ffbed3ed6e645c5e769f1e39&w=2000')] bg-cover bg-center bg-no-repeat">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="bg-card shadow-lg border-0">
            <CardContent className="p-6">
              <h1 className="text-3xl font-bold text-center mb-6">
                User Profile
              </h1>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="text-lg">
                    {(
                      user.displayName ||
                      user.email?.split("@")[0] ||
                      "Unnamed User"
                    )
                      .charAt(0)
                      .toUpperCase() +
                      (
                        user.displayName ||
                        user.email?.split("@")[0] ||
                        "Unnamed User"
                      ).slice(1)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="text-lg">{user.email || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">User ID</p>
                  <p className="text-lg text-muted-foreground break-all">
                    {user.uid}
                  </p>
                </div>
                <Button
                  asChild
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-6"
                >
                  <Link href="/chathistory">View Chat History</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
