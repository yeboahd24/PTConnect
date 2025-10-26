import { Link, useLocation } from 'react-router';
import { LayoutGrid, MessageSquareText, FileChartPie, CalendarCheck2, Contact, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useSidebarStore } from '@/store/sidebarStore';
import { UserRole } from '@/types/enums';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    icon: LayoutGrid,
    path: '/dashboard',
    roles: [UserRole.ADMIN, UserRole.TEACHER, UserRole.PARENT]
  },
  {
    label: 'Messages',
    icon: MessageSquareText,
    path: '/messages',
    roles: [UserRole.ADMIN, UserRole.TEACHER, UserRole.PARENT]
  },
  {
    label: 'Reports',
    icon: FileChartPie,
    path: '/reports',
    roles: [UserRole.ADMIN, UserRole.TEACHER, UserRole.PARENT]
  },
  {
    label: 'Attendance',
    icon: CalendarCheck2,
    path: '/attendance',
    roles: [UserRole.ADMIN, UserRole.TEACHER, UserRole.PARENT]
  },
  {
    label: 'Events',
    icon: Contact,
    path: '/events',
    roles: [UserRole.ADMIN, UserRole.TEACHER, UserRole.PARENT]
  },
  {
    label: 'Settings',
    icon: Settings,
    path: '/settings',
    roles: [UserRole.ADMIN, UserRole.TEACHER, UserRole.PARENT]
  }
];

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { isCollapsed } = useSidebarStore();

  const filteredNavItems = navItems.filter((item) =>
    user?.role ? item.roles.includes(user.role) : false
  );

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 h-screen transition-all duration-300 bg-sidebar-background border-r border-sidebar-border',
        isCollapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="flex items-center h-16 px-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">PT</span>
            </div>
            {!isCollapsed && (
              <span className="font-semibold text-sidebar-foreground">PTConnect</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {filteredNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                      isActive
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!isCollapsed && <span className="body-normal">{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-sidebar-border">
          <button
            onClick={logout}
            className="flex items-center gap-3 px-3 py-2 rounded-lg w-full text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span className="body-normal">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}