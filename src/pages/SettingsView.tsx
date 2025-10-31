import { Settings } from "lucide-react";

const SettingsView = () => {
  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <Settings className="h-24 w-24 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Configurações</h2>
        <p className="text-muted-foreground text-center max-w-md">
          As configurações do sistema serão implementadas nas próximas fases.
          Inclui preferências de usuário, tema, notificações e mais.
        </p>
      </div>
    </div>
  );
};

export default SettingsView;