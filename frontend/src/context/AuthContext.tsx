"use client";

import ClientOnly from "@/components/local/ClientOnly";
import React, { createContext, useState, useContext, useEffect } from "react";

interface AuthContextType {
  authUser: any;
  setAuthUser: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [authUser, setAuthUser] = useState<any>(null);

  useEffect(() => {
    const storedAuth = localStorage.getItem("Auth");
    if (storedAuth) {
      setAuthUser(JSON.parse(storedAuth).details);
    }
  }, []);

  return (
    <ClientOnly>
      <AuthContext.Provider value={{ authUser, setAuthUser }}>
        {children}
      </AuthContext.Provider>
    </ClientOnly>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContextProvider"
    );
  }
  return context;
};
