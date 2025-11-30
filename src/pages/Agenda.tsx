import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar, { DashboardSidebarContent } from "@/components/DashboardSidebar";
import { Calendar as CalendarIcon, CalendarDays, UserCheck, Users, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const appointments = [
  { id: 1, time: "08:00", patient: "Maria Silva Santos", reason: "Consulta", status: "confirmed" },
  { id: 2, time: "08:10", patient: "João Pedro Oliveira", reason: "Retorno", status: "confirmed" },
  { id: 3, time: "08:20", patient: "Ana Carolina Souza", reason: "Exame", status: "scheduled" },
  { id: 4, time: "08:30", patient: "Carlos Eduardo Lima", reason: "Consulta", status: "confirmed" },
];

const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/70 backdrop-blur-xl border border-black/5 shadow-lg rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}>
    {children}
  </div>
);

const Agenda = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  const filteredAppointments = appointments;
  const hasAppointments = filteredAppointments.length > 0;
  const confirmedAppointments = filteredAppointments.filter(a => a.status === "confirmed").length;
  const scheduledAppointments = filteredAppointments.filter(a => a.status === "scheduled").length;

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800">
      <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-60 bg-white/80 backdrop-blur-xl border-r-0" aria-describedby={undefined} title={undefined}>
          <DashboardSidebarContent isMobile onLinkClick={() => setMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      <DashboardSidebar />
      <DashboardHeader onMenuClick={() => setMobileMenuOpen(true)} />
        
      <main className="pl-8 md:pl-32 pr-8 pt-28 pb-8 h-full w-full animate-fade-in">
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Agenda</h1>
          
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <GlassCard className="p-5">
            <h3 className="text-sm font-semibold flex items-center gap-2 text-slate-600 mb-2">
              <CalendarDays className="w-4 h-4" />
              Data Selecionada
            </h3>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn("w-full justify-start text-left font-normal bg-white/50 border-slate-900/10 hover:bg-white/80 text-slate-800", !selectedDate && "text-slate-500")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP", { locale: ptBR }) : "Selecione"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-white/80 backdrop-blur-xl border-black/10 shadow-2xl rounded-lg" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  initialFocus
                  classNames={{
                    day_selected: "bg-teal-500 text-white focus:bg-teal-600 focus:text-white",
                    day_today: "text-teal-600 font-bold",
                  }}
                />
              </PopoverContent>
            </Popover>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Agendados</p>
                <p className="text-3xl font-bold text-slate-800">{scheduledAppointments}</p>
              </div>
              <Clock className="w-8 h-8 text-amber-500" />
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Confirmados</p>
                <p className="text-3xl font-bold text-slate-800">{confirmedAppointments}</p>
              </div>
              <UserCheck className="w-8 h-8 text-teal-500" />
            </div>
          </GlassCard>

          <GlassCard className="p-6 flex flex-col justify-center">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total de Pacientes</p>
                <p className="text-3xl font-bold text-slate-800">{hasAppointments ? filteredAppointments.length : 0}</p>
              </div>
              <Users className="w-8 h-8 text-green-500" />
            </div>
          </GlassCard>
        </div>

        <GlassCard>
          <div className="p-6">
            <h2 className="text-xl font-semibold text-slate-800">Pacientes do Dia</h2>
          </div>
          <div className="px-6 pb-6">
            {hasAppointments ? (
              <div className="space-y-3">
                {filteredAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl bg-slate-500/10 border border-transparent hover:border-teal-500/50 transition-all">
                    <div className="flex-shrink-0 w-full sm:w-24 flex items-center gap-2">
                        <Clock className="w-5 h-5 text-teal-600 sm:hidden"/>
                        <div className="text-base font-bold text-teal-600">{appointment.time}</div>
                    </div>
                    <div className="flex-1 min-w-0 w-full border-t border-slate-900/10 sm:border-t-0 sm:border-l pt-3 sm:pt-0 sm:pl-4">
                      <p className="font-semibold text-slate-800">{appointment.patient}</p>
                      <p className="text-sm text-slate-600">Motivo: {appointment.reason}</p>
                    </div>
                    <div className="flex-shrink-0 self-end sm:self-center">
                      <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"} className={cn("transition-colors", appointment.status === "confirmed" ? "bg-teal-500/10 text-teal-600" : "bg-amber-500/10 text-amber-600")}>
                        {appointment.status === "confirmed" ? "Confirmado" : "Agendado"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CalendarIcon className="w-16 h-16 text-slate-300 mb-4" />
                <p className="text-lg font-medium text-slate-700 mb-2">Nenhuma agenda programada</p>
                <p className="text-sm text-slate-500">Não há pacientes agendados para a data selecionada.</p>
              </div>
            )}
          </div>
        </GlassCard>
      </main>
    </div>
  );
};

export default Agenda;
