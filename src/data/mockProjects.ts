import { Project } from '@/types/project';

export const mockProjects: Project[] = [
  // Projetos Críticos
  {
    id: '1',
    title: 'Mapa de estoque - Diretoria',
    sector: 'Fin.Com/Prod',
    priority: 'critical',
    status: 'evaluation',
    startDate: '01/09/10',
    endDate: '20/24/10',
    progress: 95
  },
  {
    id: '2',
    title: 'Fluxo de caixa - Diretoria',
    sector: 'Financeiro',
    priority: 'critical',
    status: 'evaluation',
    startDate: '15/09/10',
    endDate: '20/24/10',
    progress: 100
  },
  {
    id: '3',
    title: 'Melhorias na visão de estoque',
    sector: 'PCP',
    priority: 'critical',
    status: 'not-started',
    startDate: '01/10/10',
    endDate: '27/31/10',
    progress: 0
  },
  {
    id: '4',
    title: 'Controle de OM Financeiro',
    sector: 'Financeiro',
    priority: 'critical',
    status: 'not-started',
    startDate: '05/10/10',
    endDate: '28/10-05/11',
    progress: 0
  },
  {
    id: '5',
    title: 'Conferência de NF - Fiscal',
    sector: 'Fiscal',
    priority: 'critical',
    status: 'not-started',
    startDate: '10/10/10',
    endDate: '06-21/11',
    progress: 0
  },

  // Projetos Médios
  {
    id: '6',
    title: 'PDF Nestlé (Balanço de massa)',
    sector: 'PCP',
    priority: 'medium',
    status: 'not-started',
    startDate: '15/09/10',
    endDate: '10/21/11',
    progress: 0
  },
  {
    id: '7',
    title: 'Balanço de Massa clientes - Hadolfo',
    sector: 'PCP',
    priority: 'medium',
    status: 'not-started',
    startDate: '20/09/10',
    endDate: '24/11-09/12',
    progress: 0
  },
  {
    id: '8',
    title: 'Ferramenta Inco comércio controle pedidos',
    sector: 'Comercial',
    priority: 'medium',
    status: 'not-started',
    startDate: '01/10/10',
    endDate: '08-31/12',
    progress: 0
  },
  {
    id: '9',
    title: 'Controle automático comissões Mogi - Jader',
    sector: 'Comercial',
    priority: 'medium',
    status: 'not-started',
    startDate: '10/10/10',
    endDate: '08-19/12',
    progress: 0
  },

  // Projetos Baixos
  {
    id: '10',
    title: 'Ajustar marketshare atual e colocar no BI',
    sector: 'Comercial',
    priority: 'low',
    status: 'not-started',
    startDate: '01/09/10',
    endDate: '22-31/12',
    progress: 0
  },
  {
    id: '11',
    title: 'Dashboard carga/máquina (Preactor)',
    sector: 'PCP',
    priority: 'low',
    status: 'not-started',
    startDate: '05/09/10',
    endDate: '05/09/01',
    progress: 0
  },
  {
    id: '12',
    title: 'Mapa financeiro',
    sector: 'Financeiro',
    priority: 'low',
    status: 'not-started',
    startDate: '10/09/10',
    endDate: '20-24/10',
    progress: 0
  },
  {
    id: '13',
    title: 'Banco de horas gerencial',
    sector: 'DP',
    priority: 'low',
    status: 'not-started',
    startDate: '15/09/10',
    endDate: '12-16/01',
    progress: 0
  },
  {
    id: '14',
    title: 'Automatização contabilidade',
    sector: 'Contabilidade',
    priority: 'low',
    status: 'not-started',
    startDate: '20/09/10',
    endDate: '19-30/01',
    progress: 0
  },
  {
    id: '15',
    title: 'Controle de treinamento - RH',
    sector: 'RH',
    priority: 'low',
    status: 'in-progress',
    startDate: '01/10/10',
    endDate: '17/10',
    progress: 80
  },
  {
    id: '16',
    title: 'PDP PCP APP - Hadolfo',
    sector: 'PCP',
    priority: 'low',
    status: 'not-started',
    startDate: '05/10/10',
    endDate: '12-16/01',
    progress: 0
  },
  {
    id: '17',
    title: 'Efetivo x Comparativo salário',
    sector: 'RH',
    priority: 'low',
    status: 'not-started',
    startDate: '10/10/10',
    endDate: '03-20/02',
    progress: 0
  },
  {
    id: '18',
    title: 'Janela de carregamento VR',
    sector: 'Transporte',
    priority: 'low',
    status: 'not-started',
    startDate: '15/10/10',
    endDate: '03-27/02',
    progress: 0
  },
  {
    id: '19',
    title: 'APP Leitor de NF despesas - Vieira',
    sector: 'Comercial',
    priority: 'low',
    status: 'not-started',
    startDate: '20/10/10',
    endDate: '23/02-05/03',
    progress: 0
  },
  {
    id: '20',
    title: 'Plano de ação diretoria',
    sector: 'Presidência',
    priority: 'low',
    status: 'completed',
    startDate: '01/09/10',
    endDate: '12-16/01',
    progress: 100
  },
  {
    id: '21',
    title: 'Leitor e organizador de contratos',
    sector: 'Compras',
    priority: 'low',
    status: 'not-started',
    startDate: '10/10/10',
    endDate: '19-28/01',
    progress: 0
  }
];
