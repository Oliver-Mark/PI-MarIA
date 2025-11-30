import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit } from "lucide-react";

// Mock patient data
const mockPatient = {
  id: 1,
  name: "Maria Silva Santos",
  birthDate: "15/03/1985",
  cpf: "123.456.789-00",
  age: 39,
  gender: "Feminino",
  insurance: "Unimed",
  photo: "/default-avatar.jpg",
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
    {
      id: 1,
      doctor: "Dr. João Silva",
      specialty: "Oftalmologia",
      date: "15/11/2024",
      isCurrentDoctor: true
    },
    {
      id: 2,
      doctor: "Dra. Maria Santos",
      specialty: "Oftalmologia",
      date: "10/10/2024",
      isCurrentDoctor: false
    },
    {
      id: 3,
      doctor: "Dr. João Silva",
      specialty: "Oftalmologia",
      date: "05/09/2024",
      isCurrentDoctor: true
    }
  ]
};

const PatientRecord = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [patient] = useState(mockPatient);

  const handleNewAnamnesis = () => {
    navigate(`/anamnesis/${id}`);
  };

  const handleViewConsultation = (consultationId: number) => {
    console.log("Visualizar consulta:", consultationId);
  };

  const handleEditConsultation = (consultationId: number) => {
    console.log("Editar consulta:", consultationId);
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <DashboardSidebar />
      
      <main className="ml-20 pt-6 px-6 pb-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Ficha do Paciente</h1>

          {/* Container 1: Dados do Paciente */}
          <Card className="bg-card animate-fade-in">
            <CardContent className="pt-6">
              <div className="flex items-start gap-6">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={patient.photo} alt={patient.name} />
                  <AvatarFallback className="text-3xl">{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 flex-1">
                  <div>
                    <Label className="text-muted-foreground">Nome Completo</Label>
                    <p className="text-lg font-semibold text-foreground">{patient.name}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Data de Nascimento</Label>
                    <p className="text-lg font-semibold text-foreground">{patient.birthDate}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">CPF</Label>
                    <p className="text-lg font-semibold text-foreground">{patient.cpf}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Idade</Label>
                    <p className="text-lg font-semibold text-foreground">{patient.age} anos</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Sexo</Label>
                    <p className="text-lg font-semibold text-foreground">{patient.gender}</p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Convênio</Label>
                    <p className="text-lg font-semibold text-foreground">
                      {patient.insurance || "Particular"}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Container 2: Dados de Triagem */}
          <Card className="bg-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardHeader>
              <CardTitle>Triagem</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label>Altura</Label>
                  <Input value={patient.triage.height} disabled className="bg-muted" />
                </div>
                <div>
                  <Label>PA</Label>
                  <Input value={patient.triage.bloodPressure} disabled className="bg-muted" />
                </div>
                <div>
                  <Label>Prioridade</Label>
                  <Input value={patient.triage.priority} disabled className="bg-muted" />
                </div>
                <div>
                  <Label>Peso</Label>
                  <Input value={patient.triage.weight} disabled className="bg-muted" />
                </div>
                <div>
                  <Label>Temperatura</Label>
                  <Input value={patient.triage.temperature} disabled className="bg-muted" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label>HPP</Label>
                  <Textarea 
                    value={patient.triage.hpp} 
                    disabled 
                    className="bg-muted min-h-[100px]"
                  />
                </div>
                <div>
                  <Label>Observações</Label>
                  <Textarea 
                    value={patient.triage.observations} 
                    disabled 
                    className="bg-muted min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Container 3: Histórico */}
          <Card className="bg-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Histórico</CardTitle>
              <Button onClick={handleNewAnamnesis} className="gap-2">
                Nova Anamnese
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {patient.consultations.map((consultation) => (
                  <div
                    key={consultation.id}
                    className="flex items-center gap-4 p-4 rounded-lg border bg-muted/30 hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{consultation.doctor}</p>
                      <p className="text-sm text-muted-foreground">{consultation.specialty}</p>
                      <p className="text-sm text-muted-foreground">{consultation.date}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewConsultation(consultation.id)}
                        className="gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Visualizar
                      </Button>
                      {consultation.isCurrentDoctor && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditConsultation(consultation.id)}
                          className="gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Editar
                        </Button>
                      )}
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

export default PatientRecord;
