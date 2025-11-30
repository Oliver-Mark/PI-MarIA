import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar, { DashboardSidebarContent } from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Eye, Edit, ArrowLeft } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const mockPatient = {
  id: 1,
  name: "Maria Silva Santos",
  birthDate: "15/03/1985",
  cpf: "123.456.789-00",
  age: 39,
  gender: "Feminino",
  insurance: "Unimed",
  photo: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=2070&auto=format&fit=crop",
  triage: {
    height: "1.65 m",
    bloodPressure: "120/80 mmHg",
    priority: "Normal",
    weight: "65 kg",
    temperature: "36.5°C",
    hpp: "Paciente relata dor de cabeça há 3 dias",
    observations: "Paciente em bom estado geral"
  },
  consultations: [
    { id: 1, doctor: "Dr. João Silva", specialty: "Oftalmologia", date: "15/11/2024", isCurrentDoctor: true },
    { id: 2, doctor: "Dra. Maria Santos", specialty: "Oftalmologia", date: "10/10/2024", isCurrentDoctor: false },
  ]
};

const GlassCard = ({ children, className, ...props }: { children: React.ReactNode, className?: string, [key: string]: any }) => (
  <div className={`bg-white/70 backdrop-blur-xl border border-black/5 shadow-lg rounded-3xl transition-all duration-300 ${className}`} {...props}>
    {children}
  </div>
);

const PatientRecord = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [patient] = useState(mockPatient);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNewAnamnesis = () => navigate(`/anamnesis/${id}`);
  const handleViewConsultation = (consultationId: number) => console.log("Visualizar consulta:", consultationId);
  const handleEditConsultation = (consultationId: number) => console.log("Editar consulta:", consultationId);

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
        <div className="flex items-center gap-4 mb-8">
          <Button variant="outline" size="icon" onClick={() => navigate('/waiting-room')} className="bg-white/80 rounded-full shadow-md">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-4xl font-bold text-slate-900">Ficha do Paciente</h1>
        </div>

        <div className="space-y-6">
          <GlassCard style={{ animationDelay: "0.1s" }}>
            <div className="p-6 flex flex-col md:flex-row items-start gap-6">
              <Avatar className="w-28 h-28 border-4 border-white shadow-lg">
                <AvatarImage src={patient.photo} alt={patient.name} />
                <AvatarFallback className="text-3xl">{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4 flex-1">
                <div>
                  <Label className="text-sm text-slate-500">Nome Completo</Label>
                  <p className="text-lg font-semibold text-slate-800">{patient.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-slate-500">Idade</Label>
                  <p className="text-lg font-semibold text-slate-800">{patient.age} anos</p>
                </div>
                <div>
                  <Label className="text-sm text-slate-500">Convênio</Label>
                  <p className="text-lg font-semibold text-slate-800">{patient.insurance || "Particular"}</p>
                </div>
                <div>
                  <Label className="text-sm text-slate-500">Data de Nascimento</Label>
                  <p className="text-lg font-semibold text-slate-800">{patient.birthDate}</p>
                </div>
                <div>
                  <Label className="text-sm text-slate-500">CPF</Label>
                  <p className="text-lg font-semibold text-slate-800">{patient.cpf}</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <GlassCard style={{ animationDelay: "0.2s" }}>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-slate-800 mb-4">Triagem</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div><Label>Altura</Label><Input value={patient.triage.height} disabled /></div>
                <div><Label>PA</Label><Input value={patient.triage.bloodPressure} disabled /></div>
                <div><Label>Prioridade</Label><Input value={patient.triage.priority} disabled /></div>
                <div><Label>Peso</Label><Input value={patient.triage.weight} disabled /></div>
                <div><Label>Temperatura</Label><Input value={patient.triage.temperature} disabled /></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div><Label>HPP</Label><Textarea value={patient.triage.hpp} disabled className="min-h-[80px]" /></div>
                <div><Label>Observações</Label><Textarea value={patient.triage.observations} disabled className="min-h-[80px]" /></div>
              </div>
            </div>
          </GlassCard>

          <GlassCard style={{ animationDelay: "0.3s" }}>
            <div className="p-6">
              <div className="flex flex-row items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-slate-800">Histórico de Consultas</h2>
                <Button onClick={handleNewAnamnesis} className="gap-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg shadow-md hover:shadow-lg">
                  <Edit className="w-4 h-4" /> Nova Anamnese
                </Button>
              </div>
              <div className="space-y-3">
                {patient.consultations.map((consultation) => (
                  <div key={consultation.id} className="flex items-center gap-4 p-4 rounded-xl bg-slate-500/10 border border-slate-900/10 hover:border-teal-500/50">
                    <div className="flex-1"><p className="font-semibold text-slate-800">{consultation.doctor}</p><p className="text-sm text-slate-600">{consultation.specialty} - {consultation.date}</p></div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewConsultation(consultation.id)} className="gap-2"><Eye className="w-4 h-4" /> Visualizar</Button>
                      {consultation.isCurrentDoctor && (<Button variant="outline" size="sm" onClick={() => handleEditConsultation(consultation.id)} className="gap-2"><Edit className="w-4 h-4" /> Editar</Button>)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
};

export default PatientRecord;
