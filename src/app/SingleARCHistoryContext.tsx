'use client'

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { singleARCObjectOption } from '@/components/baseObject';
import { Bitmap } from '@/components/baseObject'
interface SingleARCHistoryEntry {
  options: singleARCObjectOption;
  bitmap: Bitmap;
  timestamp: Date;
}

interface SingleARCHistoryContextType {
  history: SingleARCHistoryEntry[];
  addToHistory: (entry: SingleARCHistoryEntry) => void;
}

export const SingleARCHistoryContext = createContext<SingleARCHistoryContextType | undefined>(undefined);

export const SingleARCHistoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<SingleARCHistoryEntry[]>([]);

  const addToHistory = (entry: SingleARCHistoryEntry) => {
    setHistory(prevHistory => [...prevHistory, entry]);
  };

  return (
    <SingleARCHistoryContext.Provider value={{ history, addToHistory }}>
      {children}
    </SingleARCHistoryContext.Provider>
  );
};

export const useSingleARCHistory = () => {
  const context = useContext(SingleARCHistoryContext);
  if (context === undefined) {
    throw new Error('useSingleARCHistory must be used within a SingleARCHistoryProvider');
  }
  return context;
};