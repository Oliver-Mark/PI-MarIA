import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, UserCheck, Bell, CheckCircle2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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

const WaitingRoom = () => {
  const [activeTab, setActiveTab] = useState("waiting");

  const handleCall = (patientId: number) => {
    console.log("Chamar paciente:", patientId);
    // Implementar lógica de chamar paciente
  };

  const handleAttend = (patientId: number) => {
    console.log("Atender paciente:", patientId);
    // Implementar lógica de atender paciente
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <DashboardSidebar />
      
      <main className="ml-20 pt-6 px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-foreground">Sala de Espera</h1>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="waiting" className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Aguardando ({waitingPatients.length})
              </TabsTrigger>
              <TabsTrigger value="attended" className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Atendidos ({attendedPatients.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="waiting" className="mt-6">
              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-6 h-6 text-primary" />
                    Pacientes Aguardando
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {waitingPatients.map((patient) => (
                      <div
                        key={patient.id}
                        className="flex items-center gap-4 p-4 rounded-lg border bg-card"
                      >
                        <div className="flex-shrink-0 w-24">
                          <div className="text-sm text-muted-foreground">Marcado</div>
                          <div className="text-lg font-bold text-primary">{patient.scheduledTime}</div>
                          <div className="text-sm text-muted-foreground mt-1">Chegada</div>
                          <div className="text-sm font-semibold text-foreground">{patient.arrivalTime}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground text-lg">{patient.patient}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Motivo: {patient.reason}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Médico: {patient.doctor}
                          </p>
                        </div>
                        <div className="flex-shrink-0 flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleCall(patient.id)}
                            className="gap-2"
                          >
                            <Bell className="w-4 h-4" />
                            Chamar
                          </Button>
                          <Button
                            size="sm"
                            onClick={() => handleAttend(patient.id)}
                            className="gap-2"
                          >
                            <UserCheck className="w-4 h-4" />
                            Atender
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attended" className="mt-6">
              <Card className="bg-muted/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                    Pacientes Atendidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {attendedPatients.map((patient) => (
                      <div
                        key={patient.id}
                        className="flex items-center gap-4 p-4 rounded-lg border bg-card"
                      >
                        <div className="flex-shrink-0 w-24">
                          <div className="text-sm text-muted-foreground">Marcado</div>
                          <div className="text-lg font-bold text-primary">{patient.scheduledTime}</div>
                          <div className="text-sm text-muted-foreground mt-1">Chegada</div>
                          <div className="text-sm font-semibold text-foreground">{patient.arrivalTime}</div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground text-lg">{patient.patient}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Motivo: {patient.reason}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Médico: {patient.doctor}
                          </p>
                        </div>
                        <div className="flex-shrink-0">
                          <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">
                            Atendido
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default WaitingRoom;
