import { Project, statusLabels, priorityLabels } from "@/types/project";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Clock, Building2, Flag, Activity } from "lucide-react";
import { formatDateForDisplay, formatDaysRemaining, getDaysUntil } from "@/utils/dateUtils";
import { isProjectOverdue, isProjectUrgent } from "@/utils/statusCalculator";

interface ProjectDetailsDialogProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjectDetailsDialog({ project, open, onOpenChange }: ProjectDetailsDialogProps) {
  if (!project) return null;

  const daysRemaining = getDaysUntil(project.endDate);
  const isOverdue = isProjectOverdue(project);
  const isUrgent = isProjectUrgent(project);

  const priorityColors = {
    critical: "bg-critical text-critical-foreground",
    medium: "bg-medium text-medium-foreground",
    low: "bg-low text-low-foreground",
  };

  const statusColors = {
    "not-started": "bg-muted text-muted-foreground",
    "in-progress": "bg-medium text-medium-foreground",
    "evaluation": "bg-total text-total-foreground",
    "completed": "bg-low text-low-foreground",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl mb-2">{project.title}</DialogTitle>
              <DialogDescription className="flex flex-wrap gap-2">
                <Badge className={priorityColors[project.priority]}>
                  {priorityLabels[project.priority]}
                </Badge>
                <Badge className={statusColors[project.status]}>
                  {statusLabels[project.status]}
                </Badge>
                {isOverdue && (
                  <Badge variant="destructive">ATRASADO</Badge>
                )}
                {isUrgent && !isOverdue && (
                  <Badge className="bg-medium text-medium-foreground">URGENTE</Badge>
                )}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Informações Básicas */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Setor</p>
                <p className="font-medium">{project.sector}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Flag className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-muted-foreground">Prioridade</p>
                <p className="font-medium">{priorityLabels[project.priority]}</p>
              </div>
            </div>
          </div>

          {/* Datas */}
          <div className="space-y-2">
            <h3 className="font-semibold flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Cronograma
            </h3>
            <div className="grid grid-cols-2 gap-4 p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="text-sm text-muted-foreground">Data de Início</p>
                <p className="font-medium">{formatDateForDisplay(project.startDate)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Data de Término</p>
                <p className="font-medium">{formatDateForDisplay(project.endDate)}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm p-3 bg-muted/30 rounded-lg">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className={isOverdue ? "text-destructive font-medium" : ""}>
                {formatDaysRemaining(daysRemaining)}
              </span>
            </div>
          </div>

          {/* Progresso */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Progresso
              </h3>
              <span className="text-2xl font-bold">{project.progress}%</span>
            </div>
            <Progress value={project.progress} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {project.progress === 0 && "Projeto ainda não iniciado"}
              {project.progress > 0 && project.progress < 100 && "Projeto em andamento"}
              {project.progress === 100 && "Projeto concluído"}
            </p>
          </div>

          {/* Status */}
          <div className="space-y-2">
            <h3 className="font-semibold">Status Atual</h3>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center gap-2">
                <Badge className={statusColors[project.status]} variant="outline">
                  {statusLabels[project.status]}
                </Badge>
              </div>
            </div>
          </div>

          {/* Descrição (placeholder para futuro) */}
          <div className="space-y-2">
            <h3 className="font-semibold">Descrição</h3>
            <div className="p-4 bg-muted/50 rounded-lg text-sm text-muted-foreground">
              <p>Detalhes adicionais do projeto serão exibidos aqui.</p>
              <p className="mt-2 text-xs italic">
                Esta seção será expandida na próxima fase com descrição completa, 
                tarefas, comentários e anexos.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}