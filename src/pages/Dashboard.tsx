import { useMemo } from 'react';
import { CheckCircle2, Clock, ListTodo, AlertCircle } from 'lucide-react';
import { useTask } from '@/contexts/TaskContext';
import { StatCard } from '@/components/dashboard/StatCard';
import { TaskProgressChart } from '@/components/dashboard/TaskProgressChart';
import { RecentTasks } from '@/components/dashboard/RecentTasks';
import { UpcomingDeadlines } from '@/components/dashboard/UpcomingDeadlines';
import { isBefore, startOfDay } from 'date-fns';

const Dashboard = () => {
  const { tasks } = useTask();

  const stats = useMemo(() => {
    const today = startOfDay(new Date());
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'completed').length;
    const pending = tasks.filter(t => t.status !== 'completed').length;
    const overdue = tasks.filter(
      t => t.dueDate && isBefore(new Date(t.dueDate), today) && t.status !== 'completed'
    ).length;

    return { total, completed, pending, overdue };
  }, [tasks]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back! Here's your task overview.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Tasks"
          value={stats.total}
          icon={ListTodo}
          iconClassName="bg-primary/10 text-primary"
        />
        <StatCard
          title="Completed"
          value={stats.completed}
          icon={CheckCircle2}
          iconClassName="bg-success/10 text-success"
        />
        <StatCard
          title="In Progress"
          value={stats.pending}
          icon={Clock}
          iconClassName="bg-warning/10 text-warning"
        />
        <StatCard
          title="Overdue"
          value={stats.overdue}
          icon={AlertCircle}
          iconClassName="bg-destructive/10 text-destructive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TaskProgressChart />
        <UpcomingDeadlines />
      </div>

      <RecentTasks />
    </div>
  );
};

export default Dashboard;
