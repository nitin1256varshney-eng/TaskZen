import { useState } from 'react';
import { format, isAfter, isBefore, startOfDay } from 'date-fns';
import { Calendar, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Task, Priority } from '@/types/task';
import { useTask } from '@/contexts/TaskContext';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TaskModal } from './TaskModal';

interface TaskCardProps {
  task: Task;
  isDragging?: boolean;
}

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  high: { label: 'High', className: 'bg-priority-high/10 text-priority-high border-priority-high/20' },
  medium: { label: 'Medium', className: 'bg-priority-medium/10 text-priority-medium border-priority-medium/20' },
  low: { label: 'Low', className: 'bg-priority-low/10 text-priority-low border-priority-low/20' },
};

export const TaskCard = ({ task, isDragging }: TaskCardProps) => {
  const { categories, deleteTask } = useTask();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const category = categories.find(c => c.id === task.categoryId);
  const priority = priorityConfig[task.priority];
  
  const isOverdue = task.dueDate && isBefore(new Date(task.dueDate), startOfDay(new Date())) && task.status !== 'completed';
  const isDueToday = task.dueDate && format(new Date(task.dueDate), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  return (
    <>
      <div
        className={cn(
          'group bg-card rounded-lg border border-border p-4 shadow-soft hover:shadow-md transition-all cursor-grab active:cursor-grabbing animate-scale-in',
          isDragging && 'opacity-50 rotate-2 scale-105',
          task.status === 'completed' && 'opacity-60'
        )}
      >
        <div className="flex items-start justify-between gap-2 mb-3">
          <h4 className={cn(
            'font-medium text-card-foreground line-clamp-2 flex-1',
            task.status === 'completed' && 'line-through text-muted-foreground'
          )}>
            {task.title}
          </h4>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setIsEditModalOpen(true)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => deleteTask(task.id)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {task.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {task.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={cn('text-xs', priority.className)}>
            {priority.label}
          </Badge>
          
          {category && (
            <Badge
              variant="outline"
              className="text-xs"
              style={{
                backgroundColor: `${category.color}15`,
                borderColor: `${category.color}30`,
                color: category.color,
              }}
            >
              {category.name}
            </Badge>
          )}
        </div>

        {task.dueDate && (
          <div className={cn(
            'flex items-center gap-1.5 mt-3 text-xs',
            isOverdue ? 'text-destructive' : isDueToday ? 'text-warning' : 'text-muted-foreground'
          )}>
            <Calendar className="h-3.5 w-3.5" />
            <span>
              {isOverdue ? 'Overdue: ' : isDueToday ? 'Due today: ' : ''}
              {format(new Date(task.dueDate), 'MMM d, yyyy')}
            </span>
          </div>
        )}
      </div>

      <TaskModal
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
        task={task}
      />
    </>
  );
};
