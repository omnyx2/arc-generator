// components/Sidebar/NavLink.tsx
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NavItem } from './types';

interface NavLinkProps {
  item: NavItem;
  isExpanded: boolean;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ 
  item: { path, label, icon: Icon }, 
  isExpanded,
  onClick 
}) => {
  const pathname = usePathname();
  const isActive = pathname === path;

  return (
    <Link
      href={path}
      onClick={onClick}
      className={`
        relative flex items-center w-full p-4
        group cursor-pointer
        ${isActive ? 'text-white' : 'text-white/70'}
        hover:text-white transition-colors
      `}
    >
      <div
        className={`
          absolute inset-0 
          bg-white/10 opacity-0 
          group-hover:opacity-100 
          transition-opacity
          ${isActive ? 'opacity-100' : ''}
          rounded-r-full
        `}
      />
      <div className="relative flex items-center z-10">
        <Icon className="w-6 h-6 shrink-0" />
        {isExpanded && (
          <span className="ml-4 font-medium">
            {label}
          </span>
        )}
      </div>
    </Link>
  );
};

export default NavLink