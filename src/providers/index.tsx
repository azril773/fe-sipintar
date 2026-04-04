"use client";

import { createContext, useState } from "react";
import Cookies from "universal-cookie";

import { User } from "@/types/common";

type GlobalContextType = {
  user: User | null;
  cookies: Cookies
};

export const GlobalContext = createContext<GlobalContextType>({
  user: null,
  cookies: new Cookies(),
});

export function GlobalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, _setUser] = useState<User | null>(null);

  const cookies = new Cookies()
  const contextValue: GlobalContextType = {
    user: user,
    cookies: cookies,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
}
