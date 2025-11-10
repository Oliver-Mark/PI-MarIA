import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, CalendarDays, UserCheck, Users, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const appointments = [
  { id: 1, time: "08:00", patient: "Maria Silva Santos", reason: "Consulta", status: "confirmed" },
  { id: 2, time: "08:30", patient: "João Pedro Oliveira", reason: "Retorno", status: "confirmed" },
  { id: 3, time: "09:00", patient: "Ana Carolina Souza", reason: "Exame", status: "scheduled" },
  { id: 4, time: "09:30", patient: "Carlos Eduardo Lima", reason: "Consulta", status: "confirmed" },
  { id: 5, time: "10:00", patient: "Fernanda Martins Costa", reason: "Consulta", status: "confirmed" },
  { id: 6, time: "10:30", patient: "Ricardo Alves Pereira", reason: "Retorno", status: "confirmed" },
  { id: 7, time: "11:00", patient: "Juliana Ferreira Santos", reason: "Exame", status: "scheduled" },
  { id: 8, time: "11:30", patient: "Paulo Roberto Silva", reason: "Consulta", status: "confirmed" },
  { id: 9, time: "14:00", patient: "Mariana Costa Lima", reason: "Retorno", status: "confirmed" },
  { id: 10, time: "14:30", patient: "Gabriel Santos Oliveira", reason: "Consulta", status: "confirmed" },
  { id: 11, time: "15:00", patient: "Beatriz Almeida Rocha", reason: "Exame", status: "scheduled" },
  { id: 12, time: "15:30", patient: "Lucas Mendes Barbosa", reason: "Consulta", status: "confirmed" },
];

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const totalAppointments = appointments.length;
  const confirmedAppointments = appointments.filter(a => a.status === "confirmed").length;
  const scheduledAppointments = appointments.filter(a => a.status === "scheduled").length;
  const totalSlots = 16; // Total de vagas disponíveis no dia
  const availableSlots = totalSlots - totalAppointments;

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <DashboardSidebar />
      
      <main className="ml-20 pt-6 px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-foreground">Agenda</h1>
          
          {/* Filtros e Informações */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            {/* Filtro de Data */}
            <Card className="bg-muted/30">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <CalendarDays className="w-4 h-4 text-primary" />
                  Filtrar por Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : "Selecione uma data"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </CardContent>
            </Card>

            {/* Card Agendados */}
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Agendados</p>
                    <p className="text-3xl font-bold text-foreground">{scheduledAppointments}</p>
                  </div>
                  <Clock className="w-10 h-10 text-amber-500" />
                </div>
              </CardContent>
            </Card>

            {/* Card Confirmados */}
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Confirmados</p>
                    <p className="text-3xl font-bold text-foreground">{confirmedAppointments}</p>
                  </div>
                  <UserCheck className="w-10 h-10 text-primary" />
                </div>
              </CardContent>
            </Card>

            {/* Card Vagas Disponíveis */}
            <Card className="bg-muted/30">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Vagas Disponíveis</p>
                    <p className="text-3xl font-bold text-foreground">{availableSlots}</p>
                  </div>
                  <Users className="w-10 h-10 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Pacientes */}
          <Card className="bg-muted/30">
            <CardHeader>
              <CardTitle className="text-xl">Pacientes do Dia</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {appointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:border-primary/50 transition-colors"
                  >
                    <div className="flex-shrink-0 w-16">
                      <div className="text-lg font-bold text-primary">{appointment.time}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground">{appointment.patient}</p>
                      <p className="text-sm text-muted-foreground">
                        Motivo: {appointment.reason}
                      </p>
                    </div>
                    <div className="flex-shrink-0">
                      <Badge
                        variant={appointment.status === "confirmed" ? "default" : "secondary"}
                        className={
                          appointment.status === "confirmed"
                            ? "bg-primary/10 text-primary hover:bg-primary/20"
                            : "bg-amber-500/10 text-amber-600 hover:bg-amber-500/20"
                        }
                      >
                        {appointment.status === "confirmed" ? "Confirmado" : "Agendado"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
