'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { navItems } from './NavItems';
import NavLink from './NavLink';
import type { SidebarProps, NavItem } from './types';

const Sidebar: React.FC<SidebarProps> = ({
  initialExpanded = false,
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const toggleSubMenu = (path: string) => {
    setOpenSubMenu(openSubMenu === path ? null : path);
  };

  const renderNavItem = (item: NavItem) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    
    return (
      <div key={item.path} className="w-full">
        {hasSubItems ? (
          <>
            <div
              onClick={() => toggleSubMenu(item.path)}
              className="cursor-pointer"
            >
              <NavLink
                item={item}
                isExpanded={isExpanded}
              />
            </div>
            {openSubMenu === item.path && isExpanded && (
              <div className="ml-4 border-l-2 border-white/10">
                {item.subItems?.map(subItem => (
                  <NavLink
                    key={subItem.path}
                    item={subItem}
                    isExpanded={isExpanded}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <NavLink
            item={item}
            isExpanded={isExpanded}
          />
        )}
      </div>
    );
  };

  return (
    <aside 
      className={`
        fixed left-0 top-16 h-screen 
        bg-gradient-to-b from-purple-600 via-purple-500 to-indigo-600
        transition-all duration-300 ease-in-out
        ${isExpanded ? 'w-64' : 'w-14'}
       
        shadow-2xl
        flex flex-col
        overflow-hidden
        ${className}
      `}
    >
      {/* Toggle Button */}
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="p-4 hover:bg-white/10 transition-colors duration-200"
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <Menu className="w-6 h-6 text-white" />
      </button>

      {/* Navigation */}
      <nav className="flex-1 mt-8 overflow-y-auto">
        {navItems.map(renderNavItem)}
      </nav>

      {/* Decorative Effect */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="w-full h-24 bg-gradient-to-b from-transparent to-white/5" />
      </div>
    </aside>
  );
};

export default Sidebar;