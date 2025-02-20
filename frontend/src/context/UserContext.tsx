"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { SafeUser } from "../../../shared-types";

interface UserContextType {
  user: SafeUser | null;
  setUser: React.Dispatch<React.SetStateAction<SafeUser | null>>;
}

export const UserContext = createContext<UserContextType>({ 
  user: null, 
  setUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<SafeUser | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);
  
  const handleSetUser = (userData: SafeUser | null | ((prevUser: SafeUser | null) => SafeUser | null)) => {
    setUser((prevUser) => {
      const newUser = typeof userData === "function" ? userData(prevUser) : userData;

      if (newUser) {
        localStorage.setItem("user", JSON.stringify(newUser));
      } else {
        localStorage.removeItem("user");
      }

      return newUser;
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser: handleSetUser }}>
      {children}
    </UserContext.Provider>
  );
};
