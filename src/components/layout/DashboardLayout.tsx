import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useUIStore } from '@/stores/uiStore';
import { cn } from '@/utils/cn';

export const DashboardLayout: React.FC = () => {
  const { sidebarCollapsed, sidebarOpen, closeSidebar } = useUIStore();

  // Close sidebar on mobile when route changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        closeSidebar();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [closeSidebar]);

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity z-30 lg:hidden"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main content */}
      <div className={cn(
        'flex-1 flex flex-col overflow-hidden transition-all duration-300',
        'lg:ml-16', // Always collapsed margin on large screens when collapsed
        !sidebarCollapsed && 'lg:ml-64' // Full width margin on large screens when expanded
      )}>
        <Header />
        
        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-4 sm:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
