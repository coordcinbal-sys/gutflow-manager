import { Card } from '@/components/ui/card';
import { Priority } from '@/types/project';

interface PrioritySummaryCardProps {
  priority: Priority | 'total';
  count: number;
  label: string;
}

const priorityStyles = {
  critical: 'border-critical bg-critical-light',
  medium: 'border-medium bg-medium-light',
  low: 'border-low bg-low-light',
  total: 'border-total bg-total-light',
};

export const PrioritySummaryCard = ({ priority, count, label }: PrioritySummaryCardProps) => {
  return (
    <Card className={`${priorityStyles[priority]} border-t-4 p-6 text-center transition-all hover:shadow-lg`}>
      <div className="text-4xl font-bold text-foreground">{count}</div>
      <div className="mt-2 text-sm font-medium text-muted-foreground">{label}</div>
    </Card>
  );
};
