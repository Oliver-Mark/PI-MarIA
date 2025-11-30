import { useState, useEffect } from "react";
import { db } from "@/firebase-config";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar, { DashboardSidebarContent } from "@/components/DashboardSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, FileText, UserPlus, Upload, Loader2 } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/70 backdrop-blur-xl border border-black/5 shadow-lg rounded-3xl ${className}`}>
    {children}
  </div>
);

const InitialPatientState = {
  name: "",
  birthDate: "",
  cpf: "",
  phone: "",
  lastVisit: new Date().toLocaleDateString('pt-BR'),
};

const Patients = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [patients, setPatients] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newPatient, setNewPatient] = useState(InitialPatientState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const patientsCollectionRef = collection(db, "patients");

  const fetchPatients = async () => {
    setIsLoading(true);
    const officeId = localStorage.getItem("officeId");
    if (!officeId) {
      console.error("No officeId found in localStorage.");
      setIsLoading(false);
      return;
    }

    try {
      const q = query(patientsCollectionRef, where("officeIds", "array-contains", officeId));
      const data = await getDocs(q);
      setPatients(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Erro ao buscar pacientes: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setNewPatient((prev) => ({ ...prev, [id]: value }));
  };

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    const officeId = localStorage.getItem("officeId");

    if (!newPatient.name || !newPatient.cpf) {
      alert("Nome e CPF são obrigatórios.");
      return;
    }
    if (!officeId) {
      alert("Erro: Consultório não selecionado. Faça o login novamente.");
      return;
    }

    setIsSubmitting(true);
    try {
      const patientData = {
        ...newPatient,
        officeIds: [officeId], // Save it as an array
      };
      await addDoc(patientsCollectionRef, patientData);
      setIsAddDialogOpen(false);
      setNewPatient(InitialPatientState);
      fetchPatients(); // Refresh the list
    } catch (error) {
      console.error("Erro ao adicionar paciente: ", error);
      alert("Erro ao adicionar novo paciente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredPatients = patients.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (patient.cpf && patient.cpf.replace(/\D/g, '').includes(searchTerm.replace(/\D/g, '')))
  );

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800">
      {/* Mobile Menu */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}><SheetContent side="left" className="p-0 w-60 bg-white/80 backdrop-blur-xl border-r-0" aria-describedby={undefined} title={undefined}><DashboardSidebarContent isMobile onLinkClick={() => setMobileMenuOpen(false)} /></SheetContent></Sheet>

      <DashboardSidebar />
      <DashboardHeader onMenuClick={() => setMobileMenuOpen(true)} />
      
      <main className="pl-8 md:pl-32 pr-8 pt-28 pb-8 h-full w-full animate-fade-in">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-slate-900">Pacientes</h1>
          <div className="flex gap-2">
            <Button onClick={() => setIsAddDialogOpen(true)} className="gap-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg"><UserPlus className="w-4 h-4" /> <span className="hidden sm:inline">Novo Paciente</span></Button>
          </div>
        </div>
        
        <GlassCard>
          <div className="p-5 border-b border-black/5"><div className="relative w-full max-w-sm"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" /><Input type="text" placeholder="Pesquisar por nome ou CPF..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 bg-slate-900/5 border-slate-900/10 rounded-lg"/></div></div>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead><tr className="border-b border-slate-900/10"><th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Nome</th><th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">CPF</th><th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden lg:table-cell">Telefone</th><th className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider hidden md:table-cell">Última Visita</th><th className="px-6 py-3 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Ações</th></tr></thead>
              <tbody className="divide-y divide-slate-900/5">
                {isLoading ? (<tr><td colSpan={5} className="text-center py-16"><Loader2 className="w-8 h-8 animate-spin mx-auto text-teal-500" /></td></tr>)
                : filteredPatients.length > 0 ? filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-black/5 transition-colors duration-200">
                    <td className="px-6 py-4 whitespace-nowrap"><div className="font-medium text-slate-800">{patient.name}</div><div className="text-sm text-slate-500 md:hidden">{patient.cpf}</div></td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 hidden md:table-cell">{patient.cpf}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 hidden lg:table-cell">{patient.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-slate-600 hidden md:table-cell">{patient.lastVisit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right"><Button variant="ghost" size="sm" className="text-teal-600 hover:bg-teal-500/10 hover:text-teal-700"><FileText className="w-4 h-4 mr-2" />Ver Ficha</Button></td>
                  </tr>
                )) : (<tr><td colSpan={5} className="text-center py-16 text-slate-500">Nenhum paciente encontrado para este consultório.</td></tr>)}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </main>

      {/* Add Patient Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white/80 backdrop-blur-xl">
          <DialogHeader><DialogTitle>Adicionar Novo Paciente</DialogTitle><DialogDescription>Preencha os dados abaixo para cadastrar um novo paciente no sistema.</DialogDescription></DialogHeader>
          <form onSubmit={handleAddPatient} className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
            <div className="space-y-2"><Label htmlFor="name">Nome Completo</Label><Input id="name" value={newPatient.name} onChange={handleInputChange} className="col-span-3" /></div>
            <div className="space-y-2"><Label htmlFor="cpf">CPF</Label><Input id="cpf" value={newPatient.cpf} onChange={handleInputChange} className="col-span-3" /></div>
            <div className="space-y-2"><Label htmlFor="birthDate">Data de Nascimento</Label><Input id="birthDate" placeholder="DD/MM/AAAA" value={newPatient.birthDate} onChange={handleInputChange} className="col-span-3" /></div>
            <div className="space-y-2"><Label htmlFor="phone">Telefone</Label><Input id="phone" placeholder="(XX) XXXXX-XXXX" value={newPatient.phone} onChange={handleInputChange} className="col-span-3" /></div>
            <DialogFooter className="col-span-1 md:col-span-2 mt-4">
              <DialogClose asChild><Button type="button" variant="outline" disabled={isSubmitting}>Cancelar</Button></DialogClose>
              <Button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar Paciente"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Patients;
