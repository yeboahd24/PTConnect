import { Bell, Menu, Sun, Moon, User } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useThemeStore } from '@/store/themeStore';
import { useSidebarStore } from '@/store/sidebarStore';
import { useNotificationStore } from '@/store/notificationStore';
import { formatTimeAgo } from '@/utils/formatters';

export function Topbar() {
  const { user } = useAuthStore();
  const { darkMode, toggleDarkMode } = useThemeStore();
  const { toggleSidebar } = useSidebarStore();
  const { notifications, unreadCount, markAsRead } = useNotificationStore();

  return (
    <header className="sticky top-0 z-30 h-16 bg-card border-b border-border">
      <div className="flex items-center justify-between h-full px-4">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button className="p-2 rounded-lg hover:bg-muted transition-colors relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
              )}
            </button>
          </div>

          {/* User profile */}
          <div className="flex items-center gap-2 pl-2 ml-2 border-l border-border">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <User className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
            <div className="hidden md:block">
              <p className="body-small font-medium">{user?.name}</p>
              <p className="caption">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}