import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText } from "lucide-react";

const patients = [
  { id: 1, name: "Maria Silva Santos", birthDate: "15/03/1985", cpf: "123.456.789-00", phone: "(11) 98765-4321" },
  { id: 2, name: "João Pedro Oliveira", birthDate: "22/07/1990", cpf: "234.567.890-11", phone: "(11) 97654-3210" },
  { id: 3, name: "Ana Carolina Souza", birthDate: "10/11/1978", cpf: "345.678.901-22", phone: "(11) 96543-2109" },
  { id: 4, name: "Carlos Eduardo Lima", birthDate: "05/01/1995", cpf: "456.789.012-33", phone: "(11) 95432-1098" },
  { id: 5, name: "Fernanda Martins Costa", birthDate: "30/09/1982", cpf: "567.890.123-44", phone: "(11) 94321-0987" },
  { id: 6, name: "Ricardo Alves Pereira", birthDate: "18/06/1988", cpf: "678.901.234-55", phone: "(11) 93210-9876" },
];

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cpf.replace(/\D/g, '').includes(searchTerm.replace(/\D/g, ''))
  );

  const handleViewRecord = (patientId: number) => {
    console.log("Ver ficha do paciente:", patientId);
    // Implementar navegação para ficha do paciente
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <DashboardSidebar />
      
      <main className="ml-20 pt-6 px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-foreground">Pacientes</h1>
          
          <Card>
            <CardContent className="pt-6">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Pesquisar por nome ou CPF..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center gap-4 p-4 rounded-lg border bg-card hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Nome</p>
                        <p className="font-semibold text-foreground">{patient.name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Data de Nascimento</p>
                        <p className="font-medium text-foreground">{patient.birthDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">CPF</p>
                        <p className="font-medium text-foreground">{patient.cpf}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Telefone</p>
                        <p className="font-medium text-foreground">{patient.phone}</p>
                      </div>
                    </div>
                    <div className="flex-shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewRecord(patient.id)}
                        className="gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Ver Ficha
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredPatients.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  Nenhum paciente encontrado
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Patients;
