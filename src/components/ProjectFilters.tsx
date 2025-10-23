import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { FilterState } from '@/utils/projectUtils';
import { Priority, Status, priorityLabels, statusLabels } from '@/types/project';

interface ProjectFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  sectors: string[];
  resultsCount: number;
}

export const ProjectFilters = ({ filters, onFilterChange, sectors, resultsCount }: ProjectFiltersProps) => {
  const updateFilter = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFilterChange({
      searchText: '',
      priority: 'all',
      status: 'all',
      sector: 'all',
      deadline: 'all'
    });
  };

  const hasActiveFilters = 
    filters.searchText !== '' ||
    filters.priority !== 'all' ||
    filters.status !== 'all' ||
    filters.sector !== 'all' ||
    filters.deadline !== 'all';

  return (
    <div className="bg-card border rounded-lg p-4 mb-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-lg font-semibold text-foreground">Filtros</h2>
        {hasActiveFilters && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={clearFilters}
            className="gap-2"
          >
            <X className="w-4 h-4" />
            Limpar filtros
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Search */}
        <div className="relative lg:col-span-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por título ou setor..."
            value={filters.searchText}
            onChange={(e) => updateFilter('searchText', e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Priority */}
        <Select value={filters.priority} onValueChange={(value) => updateFilter('priority', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Prioridade" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas prioridades</SelectItem>
            <SelectItem value="critical">{priorityLabels.critical}</SelectItem>
            <SelectItem value="medium">{priorityLabels.medium}</SelectItem>
            <SelectItem value="low">{priorityLabels.low}</SelectItem>
          </SelectContent>
        </Select>

        {/* Status */}
        <Select value={filters.status} onValueChange={(value) => updateFilter('status', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os status</SelectItem>
            <SelectItem value="not-started">{statusLabels['not-started']}</SelectItem>
            <SelectItem value="in-progress">{statusLabels['in-progress']}</SelectItem>
            <SelectItem value="evaluation">{statusLabels.evaluation}</SelectItem>
            <SelectItem value="completed">{statusLabels.completed}</SelectItem>
          </SelectContent>
        </Select>

        {/* Sector */}
        <Select value={filters.sector} onValueChange={(value) => updateFilter('sector', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Setor" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os setores</SelectItem>
            {sectors.map((sector) => (
              <SelectItem key={sector} value={sector}>{sector}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{resultsCount} projeto{resultsCount !== 1 ? 's' : ''} encontrado{resultsCount !== 1 ? 's' : ''}</span>
      </div>
    </div>
  );
};
