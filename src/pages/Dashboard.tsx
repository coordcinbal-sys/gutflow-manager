import { useState } from 'react';
import { Project } from '@/types/project';
import { mockProjects } from '@/data/mockProjects';
import { ProjectFilters } from '@/components/ProjectFilters';
import { PrioritySummaryCard } from '@/components/PrioritySummaryCard';
import { HighlightedProjects } from '@/components/HighlightedProjects';
import { PrioritySection } from '@/components/PrioritySection';
import { ProjectFormDialog } from '@/components/ProjectFormDialog';
import { ProjectDetailsDialog } from '@/components/ProjectDetailsDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { filterProjects, getUniqueSectors, FilterState } from '@/utils/projectUtils';
import { toast } from 'sonner';

const Dashboard = () => {
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    searchText: '',
    priority: 'all',
    status: 'all',
    sector: 'all',
    deadline: 'all',
  });

  const filteredProjects = filterProjects(projects, filters);
  const uniqueSectors = getUniqueSectors(projects);

  const criticalProjects = filteredProjects.filter((p) => p.priority === 'critical');
  const mediumProjects = filteredProjects.filter((p) => p.priority === 'medium');
  const lowProjects = filteredProjects.filter((p) => p.priority === 'low');

  const handleProjectCreate = (newProject: Project) => {
    setProjects([...projects, newProject]);
    toast.success('Projeto criado com sucesso!');
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-6 space-y-6">
        {/* Header Actions */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard de Projetos</h2>
            <p className="text-muted-foreground">
              Gerencie seus projetos usando a Matriz GUT
            </p>
          </div>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Novo Projeto
          </Button>
        </div>

        {/* Filters */}
        <ProjectFilters
          filters={filters}
          onFilterChange={setFilters}
          sectors={uniqueSectors}
          resultsCount={filteredProjects.length}
        />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <PrioritySummaryCard
            priority="critical"
            count={criticalProjects.length}
            label="Projetos Críticos"
          />
          <PrioritySummaryCard
            priority="medium"
            count={mediumProjects.length}
            label="Projetos Médios"
          />
          <PrioritySummaryCard
            priority="low"
            count={lowProjects.length}
            label="Projetos Baixos"
          />
          <PrioritySummaryCard
            priority="total"
            count={filteredProjects.length}
            label="Total de Projetos"
          />
        </div>

        {/* Highlighted Projects */}
        <HighlightedProjects projects={filteredProjects} onProjectClick={handleProjectClick} />

        {/* Priority Sections */}
        <div className="space-y-8">
          <PrioritySection
            priority="critical"
            projects={criticalProjects}
            onProjectClick={handleProjectClick}
          />
          <PrioritySection
            priority="medium"
            projects={mediumProjects}
            onProjectClick={handleProjectClick}
          />
          <PrioritySection
            priority="low"
            projects={lowProjects}
            onProjectClick={handleProjectClick}
          />
        </div>
      </div>

      {isFormOpen && (
        <ProjectFormDialog
          onProjectCreate={handleProjectCreate}
          existingSectors={uniqueSectors}
          onClose={() => setIsFormOpen(false)}
        />
      )}

      <ProjectDetailsDialog
        project={selectedProject}
        open={selectedProject !== null}
        onOpenChange={(open) => !open && setSelectedProject(null)}
      />
    </div>
  );
};

export default Dashboard;