"use client";

import { createContext, useState } from "react";

import { User } from "@/types/common";

type GlobalContextType = {
  user: User | null;
};

export const GlobalContext = createContext<GlobalContextType>({
  user: null,
});

export function GlobalProvider({ children }: { children: React.ReactNode }) {
  const [user, _setUser] = useState<User | null>(null);

  const contextValue: GlobalContextType = {
    user: user,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}
