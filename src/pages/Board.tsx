import { KanbanBoard } from '@/components/tasks/KanbanBoard';

const Board = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Task Board</h1>
        <p className="text-muted-foreground mt-1">Drag and drop tasks between columns to update their status.</p>
      </div>

      <KanbanBoard />
    </div>
  );
};

export default Board;
