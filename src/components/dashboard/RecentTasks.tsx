import { useMemo } from 'react';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTask } from '@/contexts/TaskContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const priorityStyles = {
  high: 'bg-priority-high/10 text-priority-high border-priority-high/20',
  medium: 'bg-priority-medium/10 text-priority-medium border-priority-medium/20',
  low: 'bg-priority-low/10 text-priority-low border-priority-low/20',
};

export const RecentTasks = () => {
  const { tasks, categories } = useTask();

  const recentTasks = useMemo(() => {
    return [...tasks]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 5);
  }, [tasks]);

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return null;
    return categories.find(c => c.id === categoryId);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-soft animate-slide-up">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-card-foreground">Recent Tasks</h3>
        <Button variant="ghost" size="sm" asChild className="text-primary">
          <Link to="/tasks">
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        {recentTasks.map((task) => {
          const category = getCategoryName(task.categoryId);
          return (
            <div
              key={task.id}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <div className="flex-1 min-w-0">
                <p className={cn(
                  'font-medium text-card-foreground truncate',
                  task.status === 'completed' && 'line-through text-muted-foreground'
                )}>
                  {task.title}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={cn('text-xs', priorityStyles[task.priority])}>
                    {task.priority}
                  </Badge>
                  {category && (
                    <span
                      className="text-xs px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${category.color}15`,
                        color: category.color,
                      }}
                    >
                      {category.name}
                    </span>
                  )}
                </div>
              </div>
              <div className="text-xs text-muted-foreground ml-4">
                {format(new Date(task.updatedAt), 'MMM d')}
              </div>
            </div>
          );
        })}

        {recentTasks.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            <p className="text-sm">No tasks yet. Create your first task!</p>
          </div>
        )}
      </div>
    </div>
  );
};
