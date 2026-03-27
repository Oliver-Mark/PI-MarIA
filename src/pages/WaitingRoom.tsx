import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar, { DashboardSidebarContent } from "@/components/DashboardSidebar";
import { Clock, UserCheck, Bell, CheckCircle2, Loader2, Users } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent } from "@/components/ui/sheet";

interface Patient {
  id: string;
  name: string;
  status: 'waiting' | 'attended' | 'scheduled';
  scheduledTime: string;
  arrivalTime: string;
  reason: string;
  doctor: string;
  officeIds: string[];
}

const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/70 backdrop-blur-xl border border-black/5 shadow-lg rounded-3xl ${className}`}>
    {children}
  </div>
);

// Mock Data
const mockPatients: Patient[] = [
    { id: '1', name: 'João da Silva', status: 'waiting', scheduledTime: '09:00', arrivalTime: '08:55', reason: 'Consulta de rotina', doctor: 'Dr. House', officeIds: ['101'] },
    { id: '2', name: 'Maria Oliveira', status: 'scheduled', scheduledTime: '09:30', arrivalTime: '09:28', reason: 'Retorno', doctor: 'Dr. House', officeIds: ['101', '201'] },
    { id: '3', name: 'Carlos Pereira', status: 'attended', scheduledTime: '10:00', arrivalTime: '09:58', reason: 'Exames', doctor: 'Dr. Wilson', officeIds: ['102'] },
    { id: '4', name: 'Ana Souza', status: 'waiting', scheduledTime: '10:30', arrivalTime: '10:32', reason: 'Primeira consulta', doctor: 'Dr. Wilson', officeIds: ['201'] },
];

const WaitingRoom = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPatients = () => {
      setIsLoading(true);
      const selectedOfficeId = localStorage.getItem("officeId");
      console.log('Consultório Selecionado:', selectedOfficeId);

      if (!selectedOfficeId) {
        console.error("ID do consultório não encontrado no LocalStorage. A lista de pacientes não será carregada.");
        setIsLoading(false);
        setPatients([]);
        return;
      }
      
      // Simulate API call
      setTimeout(() => {
        const officePatients = mockPatients.filter(p => p.officeIds.includes(selectedOfficeId) && ['waiting', 'attended', 'scheduled'].includes(p.status));
        setPatients(officePatients);
        setIsLoading(false);
      }, 500);
    };

    fetchPatients();
  }, []);

  const handleCall = (patientId: string) => console.log("Chamar paciente:", patientId);
  
  const handleAttend = (patientId: string) => {
    navigate(`/patient-record/${patientId}`);
  };

  const waitingPatients = patients.filter(p => p.status === 'waiting' || p.status === 'scheduled');
  const attendedPatients = patients.filter(p => p.status === 'attended');

  const renderPatientList = (patientList: Patient[], isAttendedList = false) => {
    if (isLoading) {
      return <div className="flex justify-center items-center py-16"><Loader2 className="w-8 h-8 animate-spin text-teal-500" /></div>;
    }
    if (patientList.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <Users className="w-16 h-16 text-slate-300 mb-4" />
          <p className="text-lg font-medium text-slate-700 mb-2">
            {isAttendedList ? "Nenhum paciente atendido" : "Nenhum paciente aguardando"}
          </p>
          <p className="text-sm text-slate-500">
            {isAttendedList ? "A lista de pacientes atendidos está vazia." : "Não há pacientes na sala de espera para este consultório."}
          </p>
        </div>
      );
    }
    return (
      <div className="space-y-4">
        {patientList.map((patient) => (
          <div key={patient.id} className="flex flex-col md:flex-row items-start md:items-center gap-4 p-4 rounded-xl bg-slate-500/10 border border-slate-900/10">
            <div className="flex-shrink-0 w-full md:w-28 grid grid-cols-2 md:grid-cols-1 gap-2">
              <div>
                <div className="text-xs text-slate-500">Marcado</div>
                <div className={`text-lg font-bold ${isAttendedList ? 'text-slate-600' : 'text-teal-600'}`}>{patient.scheduledTime}</div>
              </div>
              <div>
                <div className="text-xs text-slate-500">Chegada</div>
                <div className="text-sm font-semibold text-slate-700">{patient.arrivalTime}</div>
              </div>
            </div>
            <div className="flex-1 min-w-0 w-full border-t border-slate-900/10 pt-4 md:border-t-0 md:pt-0 md:border-l md:pl-4">
              <p className="font-semibold text-slate-800 text-lg">{patient.name}</p>
              <p className="text-sm text-slate-600 mt-1">Motivo: {patient.reason}</p>
              {!isAttendedList && <p className="text-sm text-slate-600">Médico: {patient.doctor}</p>}
            </div>
            <div className="flex-shrink-0 flex w-full md:w-auto gap-2 pt-4 md:pt-0 border-t border-slate-900/10 md:border-none">
              {isAttendedList ? (
                <Badge className="bg-green-500/10 text-green-700 border border-green-500/20 font-medium">Atendido</Badge>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={() => handleCall(patient.id)} className="w-full md:w-auto gap-2 bg-transparent border-slate-500/50 hover:bg-slate-900/10">
                    <Bell className="w-4 h-4" /> Chamar
                  </Button>
                  <Button size="sm" onClick={() => handleAttend(patient.id)} className="w-full md:w-auto gap-2 bg-teal-500 hover:bg-teal-600 text-white shadow-md hover:shadow-lg">
                    <UserCheck className="w-4 h-4" /> Atender
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

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
              {renderPatientList(waitingPatients)}
            </GlassCard>
          </TabsContent>

          <TabsContent value="attended" className="mt-6">
            <GlassCard className="p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                {renderPatientList(attendedPatients, true)}
            </GlassCard>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default WaitingRoom;