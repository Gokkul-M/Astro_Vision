
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  BarChart2,
  Search,
  Shield,
  AlertTriangle,
  Settings,
  Menu,
  ChevronRight
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const routes = [
  {
    title: 'Dashboard',
    icon: BarChart2,
    href: '/',
    color: 'text-astral-purple'
  },
  {
    title: 'Scan Product',
    icon: Search,
    href: '/scanner',
    color: 'text-astral-purple'
  },
  {
    title: 'Trust Scores',
    icon: Shield,
    href: '/trust-scores',
    color: 'text-astral-purple'
  },
  {
    title: 'Admin Alerts',
    icon: AlertTriangle,
    href: '/alerts',
    color: 'text-astral-purple'
  },
  {
    title: 'Settings',
    icon: Settings,
    href: '/settings',
    color: 'text-astral-purple'
  }
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div 
      className={cn(
        'relative h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300',
        isCollapsed ? 'w-[70px]' : 'w-[240px]',
        className
      )}
    >
      <div className={cn(
        'flex items-center p-4',
        isCollapsed ? 'justify-center' : 'justify-between'
      )}>
        {!isCollapsed && (
          <div className="flex items-center gap-x-2">
            <div className="h-8 w-8 rounded-full bg-astral-purple/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-astral-purple" />
            </div>
            <h1 className="text-xl font-bold text-white">AstralTrust</h1>
          </div>
        )}
        
        {isCollapsed && (
          <div className="h-8 w-8 rounded-full bg-astral-purple/20 flex items-center justify-center">
            <Shield className="h-5 w-5 text-astral-purple" />
          </div>
        )}
        
        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          variant="ghost"
          className={cn(
            "h-8 w-8 p-0 text-sidebar-foreground",
            isCollapsed && "absolute -right-4 top-6 rounded-full bg-sidebar border border-sidebar-border"
          )}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <Menu size={16} />}
        </Button>
      </div>
      
      <div className="mt-8 px-3">
        <div className="space-y-2">
          {routes.map((route) => (
            <Link
              key={route.href}
              to={route.href}
              className={cn(
                'group flex items-center p-3 w-full rounded-lg transition-colors hover:bg-sidebar-accent',
                pathname === route.href ? 'bg-sidebar-accent' : 'transparent',
              )}
            >
              <route.icon
                className={cn(
                  "h-5 w-5 mr-3",
                  pathname === route.href
                    ? route.color
                    : "text-sidebar-foreground group-hover:text-astral-purple transition-colors"
                )}
              />
              {!isCollapsed && (
                <span className={cn(
                  "font-medium text-sm transition-colors",
                  pathname === route.href
                    ? "text-white"
                    : "text-sidebar-foreground"
                )}>
                  {route.title}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
