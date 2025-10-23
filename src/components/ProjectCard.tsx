import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Briefcase, TrendingUp, Clock, AlertTriangle } from 'lucide-react';
import { Project, statusLabels } from '@/types/project';
import { isProjectUrgent, isProjectUpcoming } from '@/utils/projectUtils';

interface ProjectCardProps {
  project: Project;
  highlighted?: boolean;
}

const statusStyles = {
  'not-started': 'bg-muted text-muted-foreground',
  'in-progress': 'bg-medium text-medium-foreground',
  'evaluation': 'bg-total text-total-foreground',
  'completed': 'bg-low text-low-foreground'
};

export const ProjectCard = ({ project, highlighted = false }: ProjectCardProps) => {
  const isUrgent = isProjectUrgent(project);
  const isUpcoming = isProjectUpcoming(project);
  
  const cardClasses = highlighted 
    ? "p-4 transition-all hover:shadow-lg border-l-4 border-l-medium shadow-md ring-2 ring-medium/20" 
    : "p-4 transition-all hover:shadow-md border-l-4 border-l-primary";

  return (
    <Card className={cardClasses}>
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

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">{project.endDate}</span>
          {isUrgent && (
            <Badge variant="destructive" className="text-xs flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Urgente
            </Badge>
          )}
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
