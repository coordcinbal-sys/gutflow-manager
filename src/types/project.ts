export type Priority = 'critical' | 'medium' | 'low';

export type Status = 'not-started' | 'in-progress' | 'evaluation' | 'completed';

export interface Project {
  id: string;
  title: string;
  sector: string;
  priority: Priority;
  status: Status;
  startDate: string;
  endDate: string;
  progress: number;
}

export const statusLabels: Record<Status, string> = {
  'not-started': 'A iniciar',
  'in-progress': 'Em desenvolvimento',
  'evaluation': 'Em avaliação',
  'completed': 'Concluído'
};

export const priorityLabels: Record<Priority, string> = {
  critical: 'Crítico',
  medium: 'Médio',
  low: 'Baixo'
};
