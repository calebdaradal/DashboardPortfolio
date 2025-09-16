import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  BarChart3, 
  Users, 
  Package,
  Eye,
  Plus,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { navigationItems } from '@/utils/navigation';
import { useUIStore } from '@/stores/uiStore';
import { cn } from '@/utils/cn';

const iconMap = {
  LayoutDashboard,
  BarChart3,
  Users,
  Package,
  Eye,
  Plus,
};

export const Sidebar: React.FC = () => {
  const { sidebarCollapsed, sidebarOpen, toggleSidebar, closeSidebar, openSidebar } = useUIStore();
  const location = useLocation();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={cn(
        'hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:flex-col',
        'bg-white border-r border-gray-200 transition-all duration-300 z-40',
        sidebarCollapsed ? 'lg:w-16' : 'lg:w-64'
      )}>
        {/* Logo and toggle */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg 
                  className="w-5 h-5 text-white" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                  />
                </svg>
              </div>
              <span className="text-lg font-semibold text-gray-900">Dashboard</span>
            </div>
          )}
          
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3 flex-1">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              const isActive = location.pathname === item.href;
              
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    className={cn(
                      'nav-link',
                      isActive ? 'nav-link-active' : 'nav-link-inactive'
                    )}
                    title={sidebarCollapsed ? item.description : undefined}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="ml-3 truncate">{item.name}</span>
                    )}
                  </NavLink>
                  
                  {/* Submenu */}
                  {!sidebarCollapsed && item.children && isActive && (
                    <ul className="mt-2 ml-8 space-y-1">
                      {item.children.map((child) => {
                        const ChildIcon = iconMap[child.icon as keyof typeof iconMap];
                        const isChildActive = location.pathname === child.href;
                        
                        return (
                          <li key={child.name}>
                            <NavLink
                              to={child.href}
                              className={cn(
                                'nav-link text-sm',
                                isChildActive ? 'nav-link-active' : 'nav-link-inactive'
                              )}
                            >
                              <ChildIcon className="w-4 h-4 flex-shrink-0" />
                              <span className="ml-2 truncate">{child.name}</span>
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Help section */}
        {!sidebarCollapsed && (
          <div className="p-4">
            <div className="bg-primary-50 rounded-lg p-4">
              <h4 className="text-sm font-medium text-primary-900 mb-1">
                Need help?
              </h4>
              <p className="text-xs text-primary-700 mb-3">
                Check our documentation for detailed guides.
              </p>
              <button className="text-xs text-primary-600 font-medium hover:text-primary-700">
                View Documentation
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sidebar */}
      <div className={cn(
        'lg:hidden fixed inset-y-0 left-0 flex flex-col w-64',
        'bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out z-40',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        {/* Logo and close button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg 
                className="w-5 h-5 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 10V3L4 14h7v7l9-11h-7z" 
                />
              </svg>
            </div>
            <span className="text-lg font-semibold text-gray-900">Dashboard</span>
          </div>
          
          <button
            onClick={closeSidebar}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6 px-3 flex-1">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = iconMap[item.icon as keyof typeof iconMap];
              const isActive = location.pathname === item.href;
              
              return (
                <li key={item.name}>
                  <NavLink
                    to={item.href}
                    onClick={closeSidebar}
                    className={cn(
                      'nav-link',
                      isActive ? 'nav-link-active' : 'nav-link-inactive'
                    )}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="ml-3 truncate">{item.name}</span>
                  </NavLink>
                  
                  {/* Submenu */}
                  {item.children && isActive && (
                    <ul className="mt-2 ml-8 space-y-1">
                      {item.children.map((child) => {
                        const ChildIcon = iconMap[child.icon as keyof typeof iconMap];
                        const isChildActive = location.pathname === child.href;
                        
                        return (
                          <li key={child.name}>
                            <NavLink
                              to={child.href}
                              onClick={closeSidebar}
                              className={cn(
                                'nav-link text-sm',
                                isChildActive ? 'nav-link-active' : 'nav-link-inactive'
                              )}
                            >
                              <ChildIcon className="w-4 h-4 flex-shrink-0" />
                              <span className="ml-2 truncate">{child.name}</span>
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Help section */}
        <div className="p-4">
          <div className="bg-primary-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-primary-900 mb-1">
              Need help?
            </h4>
            <p className="text-xs text-primary-700 mb-3">
              Check our documentation for detailed guides.
            </p>
            <button className="text-xs text-primary-600 font-medium hover:text-primary-700">
              View Documentation
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
