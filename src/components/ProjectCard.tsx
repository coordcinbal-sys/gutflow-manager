import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Briefcase, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { Project, statusLabels } from '@/types/project';
import { isProjectUrgent, isProjectUpcoming, isProjectOverdue } from '@/utils/statusCalculator';
import { formatDateForDisplay, formatDaysRemaining, getDaysUntil } from '@/utils/dateUtils';

interface ProjectCardProps {
  project: Project;
  highlighted?: boolean;
  onClick?: () => void;
}

const statusStyles = {
  'not-started': 'bg-muted text-muted-foreground',
  'in-progress': 'bg-medium text-medium-foreground',
  'evaluation': 'bg-total text-total-foreground',
  'completed': 'bg-low text-low-foreground'
};

export const ProjectCard = ({ project, highlighted = false, onClick }: ProjectCardProps) => {
  const isUrgent = isProjectUrgent(project);
  const isUpcoming = isProjectUpcoming(project);
  const isOverdue = isProjectOverdue(project);
  const daysRemaining = getDaysUntil(project.endDate);
  
  const cardClasses = highlighted 
    ? "p-4 transition-all hover:shadow-lg border-l-4 border-l-medium shadow-md ring-2 ring-medium/20 cursor-pointer" 
    : "p-4 transition-all hover:shadow-md border-l-4 border-l-primary cursor-pointer";

  return (
    <Card className={cardClasses} onClick={onClick}>
      <div className="space-y-3">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-foreground flex-1">{project.title}</h3>
            {highlighted && project.status === 'in-progress' && (
              <Badge className="bg-medium text-medium-foreground text-xs flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                EM ANDAMENTO
              </Badge>
            )}
            {highlighted && isUpcoming && (
              <Badge className="bg-total text-total-foreground text-xs flex items-center gap-1">
                <Clock className="w-3 h-3" />
                PRÓXIMO
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
            <Briefcase className="w-4 h-4" />
            <span>{project.sector}</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground text-xs">
              {formatDateForDisplay(project.startDate)} - {formatDateForDisplay(project.endDate)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <Clock className="w-3 h-3 text-muted-foreground" />
            <span className={isOverdue ? "text-destructive font-medium" : "text-muted-foreground"}>
              {formatDaysRemaining(daysRemaining)}
            </span>
            {isUrgent && !isOverdue && (
              <Badge variant="destructive" className="text-xs flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" />
                Urgente
              </Badge>
            )}
            {isOverdue && (
              <Badge variant="destructive" className="text-xs">
                ATRASADO
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge className={statusStyles[project.status]}>
            {statusLabels[project.status]}
          </Badge>
          {project.status !== 'not-started' && (
            <span className="text-sm font-medium text-foreground">
              {project.status === 'completed' ? 'Concluído (100%)' : `${project.progress}%`}
            </span>
          )}
        </div>

        {project.status !== 'not-started' && project.status !== 'completed' && (
          <Progress value={project.progress} className="h-2" />
        )}
      </div>
    </Card>
  );
};
