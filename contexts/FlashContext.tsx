"use client";
import React, { createContext, useContext, ReactNode } from "react";
import { FlashContext as FlashContextType } from "@/types/Flash";

const FlashContext = createContext<FlashContextType | null>(null);

export function FlashContextProvider({
  children,
  flashContext,
}: {
  children: ReactNode;
  flashContext: FlashContextType;
}) {
  return (
    <FlashContext.Provider value={flashContext}>
      {children}
    </FlashContext.Provider>
  );
}

export function useFlash(): FlashContextType | null {
  const context = useContext(FlashContext);
  return context;
}
