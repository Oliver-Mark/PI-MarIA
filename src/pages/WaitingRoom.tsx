import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar, { DashboardSidebarContent } from "@/components/DashboardSidebar";
import { Clock, UserCheck, Bell, CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const waitingPatients = [
  { id: 1, scheduledTime: "08:00", arrivalTime: "07:55", patient: "Maria Silva Santos", reason: "Consulta", doctor: "Dr. João Silva" },
  { id: 2, scheduledTime: "08:30", arrivalTime: "08:25", patient: "João Pedro Oliveira", reason: "Retorno", doctor: "Dr. João Silva" },
  { id: 3, scheduledTime: "09:00", arrivalTime: "08:50", patient: "Ana Carolina Souza", reason: "Exame", doctor: "Dr. João Silva" },
  { id: 4, scheduledTime: "09:30", arrivalTime: "09:20", patient: "Carlos Eduardo Lima", reason: "Consulta", doctor: "Dr. João Silva" },
];

const attendedPatients = [
  { id: 5, scheduledTime: "07:30", arrivalTime: "07:25", patient: "Fernanda Martins Costa", reason: "Consulta", doctor: "Dr. João Silva" },
  { id: 6, scheduledTime: "07:00", arrivalTime: "06:55", patient: "Ricardo Alves Pereira", reason: "Retorno", doctor: "Dr. João Silva" },
];

const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/70 backdrop-blur-xl border border-black/5 shadow-lg rounded-3xl ${className}`}>
    {children}
  </div>
);

const WaitingRoom = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCall = (patientId: number) => console.log("Chamar paciente:", patientId);
  const handleAttend = (patientId: number) => console.log("Atender paciente:", patientId);

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
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Sala de Espera</h1>
        
        <Tabs defaultValue="waiting" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-slate-900/5 rounded-lg p-1">
            <TabsTrigger value="waiting" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md text-slate-600 data-[state=active]:text-slate-800">
              <Clock className="w-4 h-4 mr-2" />
              Aguardando ({waitingPatients.length})
            </TabsTrigger>
            <TabsTrigger value="attended" className="data-[state=active]:bg-white data-[state=active]:shadow-md rounded-md text-slate-600 data-[state=active]:text-slate-800">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Atendidos ({attendedPatients.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="waiting" className="mt-6">
            <GlassCard className="p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
              <div className="space-y-4">
                {waitingPatients.map((patient) => (
                  <div key={patient.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-xl bg-slate-500/10 border border-slate-900/10">
                    <div className="flex-shrink-0 w-full md:w-28 grid grid-cols-2 md:grid-cols-1 gap-2">
                      <div>
                        <div className="text-xs text-slate-500">Marcado</div>
                        <div className="text-lg font-bold text-teal-600">{patient.scheduledTime}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-500">Chegada</div>
                        <div className="text-sm font-semibold text-slate-700">{patient.arrivalTime}</div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 w-full border-t border-slate-900/10 pt-4 md:border-t-0 md:pt-0 md:border-l md:pl-4">
                      <p className="font-semibold text-slate-800 text-lg">{patient.patient}</p>
                      <p className="text-sm text-slate-600 mt-1">Motivo: {patient.reason}</p>
                      <p className="text-sm text-slate-600">Médico: {patient.doctor}</p>
                    </div>
                    <div className="flex-shrink-0 flex w-full md:w-auto gap-2 pt-4 md:pt-0 border-t border-slate-900/10 md:border-none">
                      <Button variant="outline" size="sm" onClick={() => handleCall(patient.id)} className="w-full md:w-auto gap-2 bg-transparent border-slate-500/50 hover:bg-slate-900/10">
                        <Bell className="w-4 h-4" /> Chamar
                      </Button>
                      <Button size="sm" onClick={() => handleAttend(patient.id)} className="w-full md:w-auto gap-2 bg-teal-500 hover:bg-teal-600 text-white shadow-md hover:shadow-lg">
                        <UserCheck className="w-4 h-4" /> Atender
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </TabsContent>

          <TabsContent value="attended" className="mt-6">
            <GlassCard className="p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                <div className="space-y-4">
                  {attendedPatients.map((patient) => (
                    <div key={patient.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-xl bg-slate-500/10 border border-slate-900/10">
                      <div className="flex-shrink-0 w-full md:w-28 grid grid-cols-2 md:grid-cols-1 gap-2">
                        <div>
                          <div className="text-xs text-slate-500">Marcado</div>
                          <div className="text-lg font-bold text-slate-600">{patient.scheduledTime}</div>
                        </div>
                        <div>
                          <div className="text-xs text-slate-500">Chegada</div>
                          <div className="text-sm font-semibold text-slate-700">{patient.arrivalTime}</div>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 w-full border-t border-slate-900/10 pt-4 md:border-t-0 md:pt-0 md:border-l md:pl-4">
                        <p className="font-semibold text-slate-800 text-lg">{patient.patient}</p>
                        <p className="text-sm text-slate-600 mt-1">Motivo: {patient.reason}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <Badge className="bg-green-500/10 text-green-700 border border-green-500/20 font-medium">
                          Atendido
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
            </GlassCard>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default WaitingRoom;
