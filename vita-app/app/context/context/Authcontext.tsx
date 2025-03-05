import {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
  } from "react";
  import { User, onAuthStateChanged } from "firebase/auth";
  import { auth } from "@/lib/firebase"; // Import Firebase auth
  
  interface AuthContextType {
    user: User | null;
    loading: boolean;
  }
  
  const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
  });
  
  export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        setUser(user);
        setLoading(false);
      });
  
      return () => unsubscribe(); // Cleanup on unmount
    }, []);
  
    return (
      <AuthContext.Provider value={{ user, loading }}>
        {children}
      </AuthContext.Provider>
    );
  };
  
  // Hook to use authentication state
  export const useAuth = () => useContext(AuthContext);
  