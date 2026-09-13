"use client";
import React, { createContext, useContext, ReactNode, useState, useCallback } from "react";
import { FlashDesign } from "@/types/Flash";

interface FlashContextType {
  selectedFlash: FlashDesign | null;
  setSelectedFlash: (flash: FlashDesign | null) => void;
}

const FlashContext = createContext<FlashContextType | null>(null);

export function FlashContextProvider({ children }: { children: ReactNode }) {
  const [selectedFlash, setSelectedFlash] = useState<FlashDesign | null>(null);

  return (
    <FlashContext.Provider value={{ selectedFlash, setSelectedFlash }}>
      {children}
    </FlashContext.Provider>
  );
}

export function useFlash(): FlashContextType | null {
  const context = useContext(FlashContext);
  return context;
}
