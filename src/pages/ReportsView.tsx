import { FileBarChart } from "lucide-react";

const ReportsView = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <FileBarChart className="h-24 w-24 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Relatórios e Métricas</h2>
        <p className="text-muted-foreground text-center max-w-md">
          O dashboard de métricas e relatórios será implementado na Fase 2.
          Inclui gráficos, KPIs e análises detalhadas de performance dos projetos.
        </p>
      </div>
    </div>
  );
};

export default ReportsView;