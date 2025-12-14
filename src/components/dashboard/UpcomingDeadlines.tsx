import { useMemo } from 'react';
import { format, differenceInDays, isAfter, startOfDay } from 'date-fns';
import { Clock, AlertTriangle } from 'lucide-react';
import { useTask } from '@/contexts/TaskContext';
import { cn } from '@/lib/utils';

export const UpcomingDeadlines = () => {
  const { tasks } = useTask();

  const upcomingTasks = useMemo(() => {
    const today = startOfDay(new Date());
    return tasks
      .filter(task => task.dueDate && task.status !== 'completed')
      .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
      .slice(0, 5)
      .map(task => {
        const dueDate = new Date(task.dueDate!);
        const daysUntil = differenceInDays(dueDate, today);
        const isOverdue = !isAfter(dueDate, today) && daysUntil !== 0;
        return { ...task, daysUntil, isOverdue };
      });
  }, [tasks]);

  const getDueDateText = (daysUntil: number, isOverdue: boolean) => {
    if (isOverdue) return 'Overdue';
    if (daysUntil === 0) return 'Due today';
    if (daysUntil === 1) return 'Due tomorrow';
    return `${daysUntil} days left`;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-soft animate-slide-up">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-card-foreground">Upcoming Deadlines</h3>
      </div>

      <div className="space-y-3">
        {upcomingTasks.map((task) => (
          <div
            key={task.id}
            className={cn(
              'flex items-center justify-between p-3 rounded-lg',
              task.isOverdue ? 'bg-destructive/10' : task.daysUntil <= 1 ? 'bg-warning/10' : 'bg-muted/50'
            )}
          >
            <div className="flex items-center gap-3 min-w-0">
              {(task.isOverdue || task.daysUntil <= 1) && (
                <AlertTriangle className={cn(
                  'h-4 w-4 flex-shrink-0',
                  task.isOverdue ? 'text-destructive' : 'text-warning'
                )} />
              )}
              <div className="min-w-0">
                <p className="font-medium text-card-foreground truncate">{task.title}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(task.dueDate!), 'MMM d, yyyy')}
                </p>
              </div>
            </div>
            <span className={cn(
              'text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ml-2',
              task.isOverdue
                ? 'bg-destructive/20 text-destructive'
                : task.daysUntil <= 1
                ? 'bg-warning/20 text-warning'
                : 'bg-muted text-muted-foreground'
            )}>
              {getDueDateText(task.daysUntil, task.isOverdue)}
            </span>
          </div>
        ))}

        {upcomingTasks.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            <p className="text-sm">No upcoming deadlines</p>
          </div>
        )}
      </div>
    </div>
  );
};
