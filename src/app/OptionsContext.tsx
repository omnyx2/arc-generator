'use client'

import React, { createContext, useState, ReactNode } from 'react';
import { singleARCObjectOption } from '@/components/baseObject';

// Define the shape of the context value
export interface OptionsContextType {
  options: singleARCObjectOption;
  setOptions: React.Dispatch<React.SetStateAction<singleARCObjectOption>>;
}

// Create the context with a default value
export const OptionsContext = createContext<OptionsContextType | undefined>(undefined);

// Define props for the OptionsProvider component
interface OptionsProviderProps {
  children: ReactNode;
}
const initOptions: singleARCObjectOption = {
    arcId: "arc1",
    colorType: ["red", "green", "blue", "yellow", "purple"],
    size: [10, 10], // Bitmap size
    shape: "circle"
};

export const OptionsProvider: React.FC<OptionsProviderProps> = ({ children }) => {

  const [options, setGeneratedOptions] = useState<singleARCObjectOption>(initOptions);
  const value: OptionsContextType  = { options, setOptions: setGeneratedOptions};

  return (
    <OptionsContext.Provider value={value}>
      {children}
    </OptionsContext.Provider>
  );
};

// Utility hook for using this context
export const useOptions = (): OptionsContextType => {
  const context = React.useContext(OptionsContext);
  if (context === undefined) {
    throw new Error('useOptions must be used within an OptionsProvider');
  }
  return context;
};