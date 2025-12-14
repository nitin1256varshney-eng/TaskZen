import { useMemo } from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import { Status, Task } from '@/types/task';
import { useTask } from '@/contexts/TaskContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { TaskCard } from './TaskCard';

interface KanbanColumnProps {
  status: Status;
  title: string;
  onAddTask: () => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
}

const statusConfig: Record<Status, { color: string; bgColor: string }> = {
  'todo': { color: 'text-status-todo', bgColor: 'bg-status-todo' },
  'in-progress': { color: 'text-status-progress', bgColor: 'bg-status-progress' },
  'completed': { color: 'text-status-done', bgColor: 'bg-status-done' },
};

export const KanbanColumn = ({ status, title, onAddTask, onDragOver, onDrop }: KanbanColumnProps) => {
  const { getTasksByStatus } = useTask();
  const tasks = useMemo(() => getTasksByStatus(status), [getTasksByStatus, status]);
  const config = statusConfig[status];

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData('taskId', task.id);
  };

  return (
    <div
      className="flex-1 min-w-[300px] max-w-[400px] bg-kanban-column rounded-xl p-4"
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className={cn('h-2.5 w-2.5 rounded-full', config.bgColor)} />
          <h3 className="font-semibold text-foreground">{title}</h3>
          <span className="ml-1 px-2 py-0.5 text-xs font-medium rounded-full bg-muted text-muted-foreground">
            {tasks.length}
          </span>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, task)}
          >
            <TaskCard task={task} />
          </div>
        ))}

        {tasks.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            <p className="text-sm">No tasks yet</p>
          </div>
        )}

        <Button
          variant="ghost"
          className="w-full justify-start text-muted-foreground hover:text-foreground"
          onClick={onAddTask}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add task
        </Button>
      </div>
    </div>
  );
};
