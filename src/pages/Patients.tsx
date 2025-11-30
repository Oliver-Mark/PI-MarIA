import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar, { DashboardSidebarContent } from "@/components/DashboardSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, UserPlus } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const patients = [
  { id: 1, name: "Maria Silva Santos", birthDate: "15/03/1985", cpf: "123.456.789-00", phone: "(11) 98765-4321", lastVisit: "12/10/2025" },
  { id: 2, name: "João Pedro Oliveira", birthDate: "22/07/1990", cpf: "234.567.890-11", phone: "(11) 97654-3210", lastVisit: "10/10/2025" },
  { id: 3, name: "Ana Carolina Souza", birthDate: "10/11/1978", cpf: "345.678.901-22", phone: "(11) 96543-2109", lastVisit: "15/09/2025" },
  { id: 4, name: "Carlos Eduardo Lima", birthDate: "05/01/1995", cpf: "456.789.012-33", phone: "(11) 95432-1098", lastVisit: "01/10/2025" },
  { id: 5, name: "Fernanda Martins Costa", birthDate: "30/09/1982", cpf: "567.890.123-44", phone: "(11) 94321-0987", lastVisit: "28/08/2025" },
];

const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/70 backdrop-blur-xl border border-black/5 shadow-lg rounded-3xl ${className}`}>
    {children}
  </div>
);

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.cpf.replace(/\D/g, '').includes(searchTerm.replace(/\D/g, ''))
  );

  const handleViewRecord = (patientId: number) => {
    console.log("Ver ficha do paciente:", patientId);
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Pacientes</h1>
          <Button className="gap-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg">
            <UserPlus className="w-4 h-4" />
            <span className="hidden sm:inline">Novo Paciente</span>
          </Button>
        </div>
        
        <GlassCard>
          <div className="p-5 flex justify-between items-center">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Pesquisar por nome ou CPF..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-900/5 border-slate-900/10 rounded-lg text-slate-800 placeholder:text-slate-400 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-slate-900/10">
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">CPF</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Telefone</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Última Visita</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/5">
                {filteredPatients.length > 0 ? filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-black/5 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-slate-800">{patient.name}</div>
                      <div className="text-sm text-slate-500 md:hidden">{patient.cpf}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 hidden md:table-cell">{patient.cpf}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 hidden lg:table-cell">{patient.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 hidden md:table-cell">{patient.lastVisit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewRecord(patient.id)}
                        className="text-teal-600 hover:bg-teal-500/10 hover:text-teal-700"
                      >
                        <FileText className="w-4 h-4 mr-2" />
                        Ver Ficha
                      </Button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="text-center py-16 text-slate-500">
                      Nenhum paciente encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </main>
    </div>
  );
};

export default Patients;
