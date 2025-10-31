import { Calendar } from "lucide-react";

const CalendarView = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Calendar className="h-24 w-24 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Visualização de Calendário</h2>
        <p className="text-muted-foreground text-center max-w-md">
          O calendário de projetos será implementado na Fase 2.
          Você poderá visualizar todos os projetos organizados por datas em formato mensal.
        </p>
      </div>
    </div>
  );
};

export default CalendarView;