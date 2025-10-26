import { Outlet } from 'react-router';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { useSidebarStore } from '@/store/sidebarStore';
import { cn } from '@/lib/utils';

export function DashboardLayout() {
  const { isCollapsed } = useSidebarStore();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div
        className={cn(
          'transition-all duration-300',
          isCollapsed ? 'ml-16' : 'ml-64'
        )}
      >
        <Topbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}