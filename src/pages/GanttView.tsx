import { Construction } from "lucide-react";

const GanttView = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Construction className="h-24 w-24 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Gráfico de Gantt</h2>
        <p className="text-muted-foreground text-center max-w-md">
          A visualização de Gantt será implementada na Fase 2 do projeto.
          Aqui você poderá ver todos os projetos em uma linha do tempo interativa.
        </p>
      </div>
    </div>
  );
};

export default GanttView;