import { Project, Status } from '@/types/project';
import { getDaysUntil, parseProjectDate } from './dateUtils';

/**
 * Calcula o status real do projeto baseado na data atual
 * Considera as datas de início e fim para determinar automaticamente o status
 */
export const calculateProjectStatus = (project: Project): Status => {
  // Se o projeto está completo (100% progresso), mantém como completed
  if (project.progress === 100) {
    return 'completed';
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const startDate = parseProjectDate(project.startDate);
  startDate.setHours(0, 0, 0, 0);
  
  const endDate = parseProjectDate(project.endDate);
  endDate.setHours(0, 0, 0, 0);
  
  // Se ainda não começou
  if (today < startDate) {
    return 'not-started';
  }
  
  // Se passou do prazo e não está completo
  if (today > endDate && project.progress < 100) {
    // Retorna o status atual mas identifica como atrasado
    // O componente vai mostrar badge de "ATRASADO"
    return project.status;
  }
  
  // Se está entre início e fim e tem algum progresso ou foi marcado manualmente
  if (today >= startDate && today <= endDate) {
    // Se tem progresso, está em andamento
    if (project.progress > 0 && project.progress < 100) {
      return 'in-progress';
    }
    // Se não tem progresso mas o status manual é in-progress, mantém
    if (project.status === 'in-progress') {
      return 'in-progress';
    }
    // Se está em avaliação, mantém
    if (project.status === 'evaluation') {
      return 'evaluation';
    }
  }
  
  return project.status;
};

/**
 * Verifica se o projeto está atrasado
 */
export const isProjectOverdue = (project: Project): boolean => {
  if (project.progress === 100 || project.status === 'completed') {
    return false;
  }
  
  const daysUntil = getDaysUntil(project.endDate);
  return daysUntil < 0;
};

/**
 * Verifica se o projeto é urgente (menos de 7 dias para o prazo)
 */
export const isProjectUrgent = (project: Project): boolean => {
  if (project.progress === 100 || project.status === 'completed') {
    return false;
  }
  
  const daysUntil = getDaysUntil(project.endDate);
  return daysUntil >= 0 && daysUntil <= 7;
};

/**
 * Verifica se o projeto está próximo de começar (próximos 14 dias)
 */
export const isProjectUpcoming = (project: Project): boolean => {
  if (project.status !== 'not-started') {
    return false;
  }
  
  const daysUntilStart = getDaysUntil(project.startDate);
  return daysUntilStart >= 0 && daysUntilStart <= 14;
};