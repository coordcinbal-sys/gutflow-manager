import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calendar, Briefcase } from 'lucide-react';
import { Project, statusLabels } from '@/types/project';

interface ProjectCardProps {
  project: Project;
}

const statusStyles = {
  'not-started': 'bg-muted text-muted-foreground',
  'in-progress': 'bg-medium text-medium-foreground',
  'evaluation': 'bg-total text-total-foreground',
  'completed': 'bg-low text-low-foreground'
};

export const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <Card className="p-4 transition-all hover:shadow-md border-l-4 border-l-primary">
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-foreground">{project.title}</h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
            <Briefcase className="w-4 h-4" />
            <span>{project.sector}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">{project.endDate}</span>
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
