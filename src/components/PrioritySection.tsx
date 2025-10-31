import { Priority, Project, priorityLabels } from '@/types/project';
import { ProjectCard } from './ProjectCard';
import { AlertCircle } from 'lucide-react';

interface PrioritySectionProps {
  priority: Priority;
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

const priorityStyles = {
  critical: {
    bg: 'bg-critical',
    text: 'text-critical-foreground',
    icon: AlertCircle
  },
  medium: {
    bg: 'bg-medium',
    text: 'text-medium-foreground',
    icon: AlertCircle
  },
  low: {
    bg: 'bg-low',
    text: 'text-low-foreground',
    icon: AlertCircle
  }
};

export const PrioritySection = ({ priority, projects, onProjectClick }: PrioritySectionProps) => {
  const style = priorityStyles[priority];
  const Icon = style.icon;

  return (
    <div className="space-y-4">
      <div className={`${style.bg} ${style.text} px-6 py-3 rounded-lg flex items-center gap-2`}>
        <Icon className="w-5 h-5" />
        <h2 className="text-lg font-bold uppercase">
          Projetos {priorityLabels[priority]}s ({projects.length})
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            onClick={() => onProjectClick?.(project)}
          />
        ))}
      </div>
    </div>
  );
};
