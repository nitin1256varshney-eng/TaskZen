import { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTask } from '@/contexts/TaskContext';

const COLORS = {
  todo: 'hsl(220, 9%, 46%)',
  'in-progress': 'hsl(234, 89%, 64%)',
  completed: 'hsl(142, 76%, 36%)',
};

export const TaskProgressChart = () => {
  const { tasks } = useTask();

  const data = useMemo(() => {
    const counts = tasks.reduce(
      (acc, task) => {
        acc[task.status]++;
        return acc;
      },
      { todo: 0, 'in-progress': 0, completed: 0 }
    );

    return [
      { name: 'To Do', value: counts.todo, color: COLORS.todo },
      { name: 'In Progress', value: counts['in-progress'], color: COLORS['in-progress'] },
      { name: 'Completed', value: counts.completed, color: COLORS.completed },
    ].filter(item => item.value > 0);
  }, [tasks]);

  if (data.length === 0) {
    return (
      <div className="bg-card rounded-xl border border-border p-6 shadow-soft animate-slide-up">
        <h3 className="font-semibold text-card-foreground mb-4">Task Progress</h3>
        <div className="h-[250px] flex items-center justify-center text-muted-foreground">
          No tasks to display
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-soft animate-slide-up">
      <h3 className="font-semibold text-card-foreground mb-4">Task Progress</h3>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                boxShadow: '0 4px 24px -4px hsl(var(--foreground) / 0.08)',
              }}
              labelStyle={{ color: 'hsl(var(--card-foreground))' }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
