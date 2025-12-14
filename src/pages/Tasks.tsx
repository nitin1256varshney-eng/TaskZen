import { useState, useMemo } from 'react';
import { format } from 'date-fns';
import { Plus, Filter, Search, LayoutGrid, List } from 'lucide-react';
import { useTask } from '@/contexts/TaskContext';
import { Status, Priority } from '@/types/task';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TaskCard } from '@/components/tasks/TaskCard';
import { TaskModal } from '@/components/tasks/TaskModal';

const Tasks = () => {
  const { tasks, categories, filterTasks } = useTask();
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    search: '',
    priority: 'all' as Priority | 'all',
    status: 'all' as Status | 'all',
    categoryId: 'all',
  });

  const filteredTasks = useMemo(() => {
    return filterTasks(filters);
  }, [filterTasks, filters]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">All Tasks</h1>
          <p className="text-muted-foreground mt-1">{filteredTasks.length} tasks</p>
        </div>
        <Button onClick={() => setIsTaskModalOpen(true)} className="gradient-primary">
          <Plus className="h-4 w-4 mr-2" />
          New Task
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className="pl-10 bg-secondary/50"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>

        <div className="flex gap-2 flex-wrap">
          <Select
            value={filters.priority}
            onValueChange={(value) => setFilters({ ...filters, priority: value as Priority | 'all' })}
          >
            <SelectTrigger className="w-32 bg-secondary/50">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.status}
            onValueChange={(value) => setFilters({ ...filters, status: value as Status | 'all' })}
          >
            <SelectTrigger className="w-32 bg-secondary/50">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={filters.categoryId}
            onValueChange={(value) => setFilters({ ...filters, categoryId: value })}
          >
            <SelectTrigger className="w-36 bg-secondary/50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex gap-1 border border-border rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('grid')}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {filteredTasks.length > 0 ? (
        <div className={cn(
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
            : 'flex flex-col gap-3'
        )}>
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center mb-4">
            <Filter className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-1">No tasks found</h3>
          <p className="text-muted-foreground mb-4">
            {filters.search || filters.priority !== 'all' || filters.status !== 'all'
              ? 'Try adjusting your filters'
              : 'Create your first task to get started'}
          </p>
          <Button onClick={() => setIsTaskModalOpen(true)} className="gradient-primary">
            <Plus className="h-4 w-4 mr-2" />
            Create Task
          </Button>
        </div>
      )}

      <TaskModal
        open={isTaskModalOpen}
        onOpenChange={setIsTaskModalOpen}
      />
    </div>
  );
};

export default Tasks;
