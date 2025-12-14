import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  CheckSquare,
  Kanban,
  Tag,
  Settings,
  ChevronLeft,
  Plus,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useTask } from '@/contexts/TaskContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  onAddTask: () => void;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Kanban, label: 'Board', path: '/board' },
  { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
  { icon: Tag, label: 'Categories', path: '/categories' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = ({ isOpen, onClose, onToggle, onAddTask }: SidebarProps) => {
  const location = useLocation();
  const { categories, tasks } = useTask();

  const getTaskCountByCategory = (categoryId: string) => {
    return tasks.filter(t => t.categoryId === categoryId && t.status !== 'completed').length;
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:sticky top-0 left-0 z-50 h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300 ease-in-out flex flex-col',
          isOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full lg:translate-x-0 lg:w-20'
        )}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <div className={cn('flex items-center gap-3 overflow-hidden', !isOpen && 'lg:justify-center')}>
            <div className="h-9 w-9 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0">
              <CheckSquare className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className={cn(
              'font-semibold text-lg text-sidebar-foreground whitespace-nowrap transition-opacity',
              !isOpen && 'lg:opacity-0 lg:w-0'
            )}>
              TaskFlow
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              'hidden lg:flex h-8 w-8 text-muted-foreground hover:text-foreground',
              !isOpen && 'lg:hidden'
            )}
            onClick={onToggle}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Add Task Button */}
        <div className="p-4">
          <Button
            className={cn(
              'w-full gradient-primary text-primary-foreground shadow-soft hover:shadow-glow transition-all',
              !isOpen && 'lg:w-12 lg:h-12 lg:p-0'
            )}
            onClick={onAddTask}
          >
            <Plus className="h-5 w-5" />
            <span className={cn('ml-2', !isOpen && 'lg:hidden')}>Add Task</span>
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-primary font-medium'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground',
                  !isOpen && 'lg:justify-center lg:px-0'
                )}
              >
                <item.icon className={cn(
                  'h-5 w-5 flex-shrink-0',
                  isActive ? 'text-sidebar-primary' : 'text-muted-foreground group-hover:text-sidebar-foreground'
                )} />
                <span className={cn('whitespace-nowrap', !isOpen && 'lg:hidden')}>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Categories */}
        <div className={cn('px-4 py-4 border-t border-sidebar-border', !isOpen && 'lg:hidden')}>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Categories
          </h3>
          <div className="space-y-1">
            {categories.slice(0, 4).map((category) => (
              <div
                key={category.id}
                className="flex items-center justify-between py-1.5 px-2 rounded-md hover:bg-sidebar-accent transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: category.color }}
                  />
                  <span className="text-sm text-sidebar-foreground/80">{category.name}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {getTaskCountByCategory(category.id)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Collapse button for desktop */}
        {!isOpen && (
          <div className="hidden lg:flex p-4 border-t border-sidebar-border justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-muted-foreground hover:text-foreground"
              onClick={onToggle}
            >
              <ChevronLeft className="h-4 w-4 rotate-180" />
            </Button>
          </div>
        )}
      </aside>
    </>
  );
};
