import React, { createContext, useContext, useState, useCallback } from 'react';
import { Task, Category, Status, Priority } from '@/types/task';
import { sampleTasks, sampleCategories } from '@/data/sampleData';
import { toast } from '@/hooks/use-toast';

interface TaskContextType {
  tasks: Task[];
  categories: Category[];
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  moveTask: (taskId: string, newStatus: Status) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  deleteCategory: (id: string) => void;
  getTasksByStatus: (status: Status) => Task[];
  searchTasks: (query: string) => Task[];
  filterTasks: (filters: TaskFilters) => Task[];
}

interface TaskFilters {
  priority?: Priority | 'all';
  status?: Status | 'all';
  categoryId?: string | 'all';
  search?: string;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(sampleTasks);
  const [categories, setCategories] = useState<Category[]>(sampleCategories);

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks(prev => [...prev, newTask]);
    toast({
      title: "Task created",
      description: `"${task.title}" has been added successfully.`,
    });
  }, []);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date() }
          : task
      )
    );
    toast({
      title: "Task updated",
      description: "Your changes have been saved.",
    });
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast({
      title: "Task deleted",
      description: "The task has been removed.",
    });
  }, []);

  const moveTask = useCallback((taskId: string, newStatus: Status) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId
          ? { ...task, status: newStatus, updatedAt: new Date() }
          : task
      )
    );
  }, []);

  const addCategory = useCallback((category: Omit<Category, 'id'>) => {
    const newCategory: Category = {
      ...category,
      id: Date.now().toString(),
    };
    setCategories(prev => [...prev, newCategory]);
    toast({
      title: "Category created",
      description: `"${category.name}" has been added.`,
    });
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    setTasks(prev =>
      prev.map(task =>
        task.categoryId === id ? { ...task, categoryId: null } : task
      )
    );
    toast({
      title: "Category deleted",
      description: "The category has been removed.",
    });
  }, []);

  const getTasksByStatus = useCallback((status: Status) => {
    return tasks.filter(task => task.status === status);
  }, [tasks]);

  const searchTasks = useCallback((query: string) => {
    const lowerQuery = query.toLowerCase();
    return tasks.filter(
      task =>
        task.title.toLowerCase().includes(lowerQuery) ||
        task.description.toLowerCase().includes(lowerQuery)
    );
  }, [tasks]);

  const filterTasks = useCallback((filters: TaskFilters) => {
    return tasks.filter(task => {
      if (filters.priority && filters.priority !== 'all' && task.priority !== filters.priority) {
        return false;
      }
      if (filters.status && filters.status !== 'all' && task.status !== filters.status) {
        return false;
      }
      if (filters.categoryId && filters.categoryId !== 'all' && task.categoryId !== filters.categoryId) {
        return false;
      }
      if (filters.search) {
        const lowerSearch = filters.search.toLowerCase();
        if (
          !task.title.toLowerCase().includes(lowerSearch) &&
          !task.description.toLowerCase().includes(lowerSearch)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        categories,
        addTask,
        updateTask,
        deleteTask,
        moveTask,
        addCategory,
        deleteCategory,
        getTasksByStatus,
        searchTasks,
        filterTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
