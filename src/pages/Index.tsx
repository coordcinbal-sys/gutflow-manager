import { PrioritySummaryCard } from '@/components/PrioritySummaryCard';
import { PrioritySection } from '@/components/PrioritySection';
import { mockProjects } from '@/data/mockProjects';
import { Priority } from '@/types/project';
import { LayoutDashboard } from 'lucide-react';

const Index = () => {
  const criticalProjects = mockProjects.filter(p => p.priority === 'critical');
  const mediumProjects = mockProjects.filter(p => p.priority === 'medium');
  const lowProjects = mockProjects.filter(p => p.priority === 'low');

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
            count={mockProjects.length} 
            label="Total" 
          />
        </div>

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
    </div>
  );
};

export default Index;
