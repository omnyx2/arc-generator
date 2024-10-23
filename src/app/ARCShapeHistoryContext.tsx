'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { singleARCObjectOption } from '@/components/baseObject';
import { Bitmap } from '@/components/baseObject'
interface ShapeARCHistoryEntry {
  options?: singleARCObjectOption;
  bitmap: Bitmap;
  timestamp: Date;
  shapeName: string;
}

interface ShapeARCHistoryContext {
  history: ShapeARCHistoryEntry[];
  addToHistory: (entry: ShapeARCHistoryEntry) => void;
}

export const ShapeARCHistoryContext = createContext<ShapeARCHistoryContext | undefined>(undefined);

export const ShapeARCHistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<ShapeARCHistoryEntry[]>([]);

  const addToHistory = (entry: ShapeARCHistoryEntry) => {
    setHistory(prevHistory => [...prevHistory, entry]);
  };

  return (
    <ShapeARCHistoryContext.Provider value={{ history, addToHistory }}>
      {children}
    </ShapeARCHistoryContext.Provider>
  );
};

export const useShapeARCHistory = () => {
  const context = useContext(ShapeARCHistoryContext);
  if (context === undefined) {
    throw new Error('useSingleARCHistory must be used within a SingleARCHistoryProvider');
  }
  return context;
};