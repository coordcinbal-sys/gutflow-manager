import { Project, Priority, Status } from '@/types/project';

export interface FilterState {
  searchText: string;
  priority: Priority | 'all';
  status: Status | 'all';
  sector: string | 'all';
  deadline: 'overdue' | 'this-week' | 'this-month' | 'all';
}

// Parse date from format DD/MM/YY or DD/MM-DD/MM
export const parseDate = (dateStr: string): Date => {
  const parts = dateStr.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const year = 2000 + parseInt(parts[2]);
    return new Date(year, month, day);
  }
  return new Date();
};

export const getDaysUntilDeadline = (endDate: string): number => {
  const deadline = parseDate(endDate);
  const today = new Date();
  const diffTime = deadline.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const isProjectUpcoming = (project: Project): boolean => {
  if (project.status !== 'not-started') return false;
  const daysUntilStart = getDaysUntilDeadline(project.startDate);
  return daysUntilStart >= 0 && daysUntilStart <= 14;
};

export const isProjectOverdue = (project: Project): boolean => {
  if (project.status === 'completed') return false;
  const daysUntilDeadline = getDaysUntilDeadline(project.endDate);
  return daysUntilDeadline < 0;
};

export const isProjectUrgent = (project: Project): boolean => {
  if (project.status === 'completed') return false;
  const daysUntilDeadline = getDaysUntilDeadline(project.endDate);
  return daysUntilDeadline >= 0 && daysUntilDeadline <= 7;
};

export const filterProjects = (projects: Project[], filters: FilterState): Project[] => {
  return projects.filter((project) => {
    // Search text filter
    if (filters.searchText) {
      const searchLower = filters.searchText.toLowerCase();
      const matchTitle = project.title.toLowerCase().includes(searchLower);
      const matchSector = project.sector.toLowerCase().includes(searchLower);
      if (!matchTitle && !matchSector) return false;
    }

    // Priority filter
    if (filters.priority !== 'all' && project.priority !== filters.priority) {
      return false;
    }

    // Status filter
    if (filters.status !== 'all' && project.status !== filters.status) {
      return false;
    }

    // Sector filter
    if (filters.sector !== 'all' && project.sector !== filters.sector) {
      return false;
    }

    // Deadline filter
    if (filters.deadline !== 'all') {
      const daysUntil = getDaysUntilDeadline(project.endDate);
      
      if (filters.deadline === 'overdue' && daysUntil >= 0) return false;
      if (filters.deadline === 'this-week' && (daysUntil < 0 || daysUntil > 7)) return false;
      if (filters.deadline === 'this-month' && (daysUntil < 0 || daysUntil > 30)) return false;
    }

    return true;
  });
};

export const getUniqueSectors = (projects: Project[]): string[] => {
  const sectors = projects.map(p => p.sector);
  return Array.from(new Set(sectors)).sort();
};
