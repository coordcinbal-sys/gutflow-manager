import { Project } from '@/types/project';
import { ProjectCard } from './ProjectCard';
import { TrendingUp, Clock } from 'lucide-react';
import { isProjectUpcoming } from '@/utils/projectUtils';

interface HighlightedProjectsProps {
  projects: Project[];
  onProjectClick?: (project: Project) => void;
}

export const HighlightedProjects = ({ projects, onProjectClick }: HighlightedProjectsProps) => {
  const inProgressProjects = projects
    .filter(p => p.status === 'in-progress')
    .slice(0, 4);

  const upcomingProjects = projects
    .filter(p => isProjectUpcoming(p))
    .sort((a, b) => {
      const dateA = new Date(a.startDate.split('/').reverse().join('-'));
      const dateB = new Date(b.startDate.split('/').reverse().join('-'));
      return dateA.getTime() - dateB.getTime();
    })
    .slice(0, 4);

  if (inProgressProjects.length === 0 && upcomingProjects.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 space-y-4">
      <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
        <TrendingUp className="w-6 h-6 text-primary" />
        Projetos em Destaque
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* In Progress */}
        {inProgressProjects.length > 0 && (
          <div className="space-y-3">
            <div className="bg-medium/10 border-l-4 border-l-medium px-4 py-2 rounded-lg">
              <h3 className="font-semibold text-medium flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Em Andamento ({inProgressProjects.length})
              </h3>
            </div>
            <div className="space-y-3">
          {inProgressProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              highlighted 
              onClick={() => onProjectClick?.(project)}
            />
          ))}
            </div>
          </div>
        )}

        {/* Upcoming */}
        {upcomingProjects.length > 0 && (
          <div className="space-y-3">
            <div className="bg-total/10 border-l-4 border-l-total px-4 py-2 rounded-lg">
              <h3 className="font-semibold text-total flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Próximos a Iniciar ({upcomingProjects.length})
              </h3>
            </div>
            <div className="space-y-3">
          {upcomingProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              highlighted 
              onClick={() => onProjectClick?.(project)}
            />
          ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
