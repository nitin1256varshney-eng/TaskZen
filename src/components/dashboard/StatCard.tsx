import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: number;
  className?: string;
  iconClassName?: string;
}

export const StatCard = ({ title, value, icon: Icon, trend, className, iconClassName }: StatCardProps) => {
  return (
    <div className={cn(
      'bg-card rounded-xl border border-border p-6 shadow-soft hover:shadow-md transition-all animate-slide-up',
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold text-card-foreground">{value}</p>
          {trend !== undefined && (
            <p className={cn(
              'text-sm mt-2',
              trend >= 0 ? 'text-success' : 'text-destructive'
            )}>
              {trend >= 0 ? '+' : ''}{trend}% from last week
            </p>
          )}
        </div>
        <div className={cn(
          'p-3 rounded-lg',
          iconClassName || 'bg-primary/10'
        )}>
          <Icon className={cn('h-6 w-6', iconClassName ? 'text-current' : 'text-primary')} />
        </div>
      </div>
    </div>
  );
};
