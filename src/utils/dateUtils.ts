/**
 * Formata uma data do formato DD/MM/YY para exibição
 * Lida com formatos especiais como DD/MM-DD/MM e DD-DD/MM
 */
export const formatDateForDisplay = (dateStr: string): string => {
  // Handle range formats like "28/10-05/11" or "06-21/11"
  if (dateStr.includes('-')) {
    const parts = dateStr.split('-');
    if (parts[0].includes('/')) {
      // Format: DD/MM-DD/MM (e.g., "28/10-05/11")
      return dateStr;
    } else {
      // Format: DD-DD/MM (e.g., "06-21/11")
      return dateStr;
    }
  }
  
  // Standard format DD/MM/YY
  return dateStr;
};

/**
 * Converte string de data DD/MM/YY para objeto Date
 * Suporta apenas o primeiro dia de ranges
 */
export const parseProjectDate = (dateStr: string): Date => {
  // Se for range, pega apenas a primeira data
  let cleanDate = dateStr;
  if (dateStr.includes('-')) {
    const parts = dateStr.split('-');
    cleanDate = parts[0].includes('/') ? parts[0] : `${parts[0]}/${parts[1].split('/')[1]}/${parts[1].split('/')[2] || ''}`;
  }
  
  const parts = cleanDate.split('/');
  if (parts.length === 3) {
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1; // JS months are 0-indexed
    const year = 2000 + parseInt(parts[2]); // Assuming 20XX
    return new Date(year, month, day);
  }
  
  // Fallback para DD/MM (sem ano)
  if (parts.length === 2) {
    const day = parseInt(parts[0]);
    const month = parseInt(parts[1]) - 1;
    const year = new Date().getFullYear();
    return new Date(year, month, day);
  }
  
  return new Date();
};

/**
 * Calcula dias até uma data
 */
export const getDaysUntil = (dateStr: string): number => {
  const targetDate = parseProjectDate(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);
  
  const diffTime = targetDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Formata contagem de dias para exibição
 */
export const formatDaysRemaining = (days: number): string => {
  if (days < 0) {
    return `Atrasado ${Math.abs(days)} dia${Math.abs(days) !== 1 ? 's' : ''}`;
  }
  if (days === 0) {
    return 'Vence hoje';
  }
  if (days === 1) {
    return 'Vence amanhã';
  }
  return `Falta${days !== 1 ? 'm' : ''} ${days} dia${days !== 1 ? 's' : ''}`;
};