'use client'
// hooks/useSidebar.ts
import { useState, useCallback } from 'react';

interface UseSidebarProps {
  initialExpanded?: boolean;
  onStateChange?: (isExpanded: boolean) => void;
}

export const useSidebar = ({ 
  initialExpanded = false, 
  onStateChange 
}: UseSidebarProps = {}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const toggle = useCallback(() => {
    setIsExpanded(prev => {
      const newState = !prev;
      onStateChange?.(newState);
      return newState;
    });
  }, [onStateChange]);

  return {
    isExpanded,
    toggle,
    setIsExpanded
  };
};