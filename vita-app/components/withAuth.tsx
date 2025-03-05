"use client";
import { useEffect, useState, ComponentType } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";

const withAuth = <T extends object>(Component: ComponentType<T>) => {
  return function AuthenticatedComponent(props: T) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (currentUser) => {
          console.log("Auth state changed:", currentUser); // Debug log
          if (!currentUser) {
            console.log("No user, redirecting to /login"); // Debug log
            router.push("/login");
          } else {
            setUser(currentUser);
            setLoading(false);
          }
        },
        (error) => {
          console.error("Auth state error:", error); // Error handling
        }
      );

      return () => unsubscribe();
    }, [router]);

    if (loading || !user) {
      return <p>Loading...</p>;
    }

    return <Component {...props} user={user} />; // Pass user as prop if needed
  };
};

export default withAuth;
