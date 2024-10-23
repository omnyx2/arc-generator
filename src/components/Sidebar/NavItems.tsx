// components/Sidebar/nav-items.ts
import { 
    Home,
    Users,
    ShoppingCart,
    BarChart2,
    Settings,
    HelpCircle,
    FileText,
    Calendar
  } from 'lucide-react';
  import { NavItem } from './types';
  
  export const navItems: NavItem[] = [
    {
      path: '/',
      label: 'Dashboard',
      icon: Home
    },
    {
      path: '/generator',
      label: 'Users',
      icon: Users,
      subItems: [
        {
          path: '/generator/customers',
          label: 'Customers',
          icon: Users
        },
        {
          path: '/generator/admin',
          label: 'Administrators',
          icon: Users
        }
      ]
    },
    {
      path: '/generator/base',
      label: 'Products',
      icon: ShoppingCart
    },
    {
      path: '/generator/mixture',
      label: 'Analytics',
      icon: BarChart2
    },
    {
      path: '/generator/expander',
      label: 'Calendar',
      icon: Calendar
    },
    {
      path: '/generator/shaper',
      label: 'Documents',
      icon: FileText
    },
    {
      path: '/generator/hierachy',
      label: 'Settings',
      icon: Settings
    },
    {
      path: '/generator',
      label: 'Help Center',
      icon: HelpCircle
    }
  ];