import { useState } from 'react';
import { PrioritySummaryCard } from '@/components/PrioritySummaryCard';
import { PrioritySection } from '@/components/PrioritySection';
import { ProjectFilters } from '@/components/ProjectFilters';
import { HighlightedProjects } from '@/components/HighlightedProjects';
import { ProjectFormDialog } from '@/components/ProjectFormDialog';
import { mockProjects as initialProjects } from '@/data/mockProjects';
import { Project } from '@/types/project';
import { LayoutDashboard } from 'lucide-react';
import { filterProjects, getUniqueSectors, FilterState } from '@/utils/projectUtils';
import { Toaster } from 'sonner';

const Index = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [filters, setFilters] = useState<FilterState>({
    searchText: '',
    priority: 'all',
    status: 'all',
    sector: 'all',
    deadline: 'all'
  });

  const filteredProjects = filterProjects(projects, filters);
  const criticalProjects = filteredProjects.filter(p => p.priority === 'critical');
  const mediumProjects = filteredProjects.filter(p => p.priority === 'medium');
  const lowProjects = filteredProjects.filter(p => p.priority === 'low');
  const sectors = getUniqueSectors(projects);

  const handleProjectCreate = (newProject: Project) => {
    setProjects([newProject, ...projects]);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-3">
            <LayoutDashboard className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">
              Projetos por Prioridade e Prazo
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Filters */}
        <ProjectFilters 
          filters={filters}
          onFilterChange={setFilters}
          sectors={sectors}
          resultsCount={filteredProjects.length}
        />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <PrioritySummaryCard 
            priority="critical" 
            count={criticalProjects.length} 
            label="Crítico" 
          />
          <PrioritySummaryCard 
            priority="medium" 
            count={mediumProjects.length} 
            label="Médio" 
          />
          <PrioritySummaryCard 
            priority="low" 
            count={lowProjects.length} 
            label="Baixo" 
          />
          <PrioritySummaryCard 
            priority="total" 
            count={filteredProjects.length} 
            label="Total" 
          />
        </div>

        {/* Highlighted Projects */}
        <HighlightedProjects projects={filteredProjects} />

        {/* Priority Sections */}
        <div className="space-y-8">
          <PrioritySection 
            priority="critical" 
            projects={criticalProjects} 
          />
          <PrioritySection 
            priority="medium" 
            projects={mediumProjects} 
          />
          <PrioritySection 
            priority="low" 
            projects={lowProjects} 
          />
        </div>
      </main>

      {/* Create Project FAB */}
      <ProjectFormDialog 
        onProjectCreate={handleProjectCreate}
        existingSectors={sectors}
      />

      {/* Toast notifications */}
      <Toaster position="top-right" />
    </div>
  );
};

export default Index;
