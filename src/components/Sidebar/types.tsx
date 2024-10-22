import { LucideIcon } from 'lucide-react';

export interface NavItem {
  path: string;
  label: string;
  icon: LucideIcon;
  subItems?: Omit<NavItem, 'subItems'>[];
}

export interface SidebarProps {
  initialExpanded?: boolean;
  className?: string;
}