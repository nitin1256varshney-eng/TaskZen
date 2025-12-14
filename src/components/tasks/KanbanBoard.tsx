import { useState } from 'react';
import { Status } from '@/types/task';
import { useTask } from '@/contexts/TaskContext';
import { KanbanColumn } from './KanbanColumn';
import { TaskModal } from './TaskModal';

const columns: { id: Status; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'completed', title: 'Completed' },
];

export const KanbanBoard = () => {
  const { moveTask } = useTask();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<Status>('todo');

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: Status) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      moveTask(taskId, status);
    }
  };

  const handleAddTask = (status: Status) => {
    setSelectedStatus(status);
    setIsTaskModalOpen(true);
  };

  return (
    <>
      <div className="flex gap-6 overflow-x-auto pb-4">
        {columns.map((column) => (
          <KanbanColumn
            key={column.id}
            status={column.id}
            title={column.title}
            onAddTask={() => handleAddTask(column.id)}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column.id)}
          />
        ))}
      </div>

      <TaskModal
        open={isTaskModalOpen}
        onOpenChange={setIsTaskModalOpen}
      />
    </>
  );
};
