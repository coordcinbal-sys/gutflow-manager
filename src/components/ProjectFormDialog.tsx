import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plus } from 'lucide-react';
import { Project, Priority, Status, priorityLabels, statusLabels } from '@/types/project';
import { toast } from 'sonner';

const projectSchema = z.object({
  title: z.string().min(3, 'Título deve ter no mínimo 3 caracteres').max(100, 'Título deve ter no máximo 100 caracteres'),
  sector: z.string().min(2, 'Setor é obrigatório'),
  priority: z.enum(['critical', 'medium', 'low']),
  status: z.enum(['not-started', 'in-progress', 'evaluation', 'completed']),
  startDate: z.string().min(1, 'Data de início é obrigatória'),
  endDate: z.string().min(1, 'Data de entrega é obrigatória'),
  progress: z.number().min(0).max(100)
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormDialogProps {
  onProjectCreate: (project: Project) => void;
  existingSectors: string[];
}

export const ProjectFormDialog = ({ onProjectCreate, existingSectors }: ProjectFormDialogProps) => {
  const [open, setOpen] = useState(false);
  const [customSector, setCustomSector] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      priority: 'medium',
      status: 'not-started',
      progress: 0
    }
  });

  const selectedStatus = watch('status');

  const onSubmit = (data: ProjectFormData) => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: data.title,
      sector: data.sector,
      priority: data.priority,
      status: data.status,
      startDate: data.startDate,
      endDate: data.endDate,
      progress: data.status === 'completed' ? 100 : data.progress
    };

    onProjectCreate(newProject);
    toast.success('Projeto criado com sucesso!');
    reset();
    setCustomSector(false);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button 
            size="lg"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Criar Novo Projeto</DialogTitle>
            <DialogDescription>
              Adicione um novo projeto ao sistema de gestão GUT
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Título do Projeto *</Label>
              <Input
                id="title"
                placeholder="Digite o título do projeto"
                {...register('title')}
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title.message}</p>
              )}
            </div>

            {/* Sector */}
            <div className="space-y-2">
              <Label htmlFor="sector">Setor Responsável *</Label>
              {!customSector && existingSectors.length > 0 ? (
                <div className="flex gap-2">
                  <Select onValueChange={(value) => {
                    if (value === 'custom') {
                      setCustomSector(true);
                    } else {
                      setValue('sector', value);
                    }
                  }}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Selecione um setor" />
                    </SelectTrigger>
                    <SelectContent>
                      {existingSectors.map((sector) => (
                        <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                      ))}
                      <SelectItem value="custom">+ Novo setor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Input
                    id="sector"
                    placeholder="Digite o nome do setor"
                    {...register('sector')}
                    className="flex-1"
                  />
                  {existingSectors.length > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setCustomSector(false)}
                    >
                      Cancelar
                    </Button>
                  )}
                </div>
              )}
              {errors.sector && (
                <p className="text-sm text-destructive">{errors.sector.message}</p>
              )}
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label>Prioridade *</Label>
              <RadioGroup 
                defaultValue="medium" 
                onValueChange={(value) => setValue('priority', value as Priority)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="critical" id="critical" />
                  <Label htmlFor="critical" className="cursor-pointer">{priorityLabels.critical}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="cursor-pointer">{priorityLabels.medium}</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low" id="low" />
                  <Label htmlFor="low" className="cursor-pointer">{priorityLabels.low}</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status Inicial *</Label>
              <Select onValueChange={(value) => setValue('status', value as Status)} defaultValue="not-started">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="not-started">{statusLabels['not-started']}</SelectItem>
                  <SelectItem value="in-progress">{statusLabels['in-progress']}</SelectItem>
                  <SelectItem value="evaluation">{statusLabels.evaluation}</SelectItem>
                  <SelectItem value="completed">{statusLabels.completed}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startDate">Data de Início *</Label>
                <Input
                  id="startDate"
                  placeholder="DD/MM/AA"
                  {...register('startDate')}
                />
                {errors.startDate && (
                  <p className="text-sm text-destructive">{errors.startDate.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="endDate">Data de Entrega *</Label>
                <Input
                  id="endDate"
                  placeholder="DD/MM/AA"
                  {...register('endDate')}
                />
                {errors.endDate && (
                  <p className="text-sm text-destructive">{errors.endDate.message}</p>
                )}
              </div>
            </div>

            {/* Progress */}
            {selectedStatus !== 'not-started' && selectedStatus !== 'completed' && (
              <div className="space-y-2">
                <Label htmlFor="progress">Progresso Inicial (%)</Label>
                <Input
                  id="progress"
                  type="number"
                  min="0"
                  max="100"
                  {...register('progress', { valueAsNumber: true })}
                />
                {errors.progress && (
                  <p className="text-sm text-destructive">{errors.progress.message}</p>
                )}
              </div>
            )}

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button type="submit">Criar Projeto</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
