export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'completed';

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  dueDate: Date | null;
  categoryId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskColumn {
  id: Status;
  title: string;
  tasks: Task[];
}
