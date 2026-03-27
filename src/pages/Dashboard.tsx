import { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar, { DashboardSidebarContent } from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Bell, Cake, User, Loader2 } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import carousel1 from "@/assets/carousel-1.jpg";
import carousel2 from "@/assets/carousel-2.jpg";
import carousel3 from "@/assets/carousel-3.jpg";

const announcements = [
  { id: 1, image: carousel1, title: "Novas diretrizes de atendimento" },
  { id: 2, image: carousel2, title: "Treinamento de equipe - Próxima semana" },
  { id: 3, image: carousel3, title: "Atualização do sistema - Dia 15" },
];

const notifications = [
  { id: 1, icon: Cake, text: "Maria Silva Santos faz aniversário hoje!", type: "birthday" },
  { id: 2, icon: Bell, text: "3 pacientes aguardando na sala de espera", type: "info" },
  { id: 3, icon: Calendar, text: "Lembrete: Reunião de equipe às 16h", type: "reminder" },
];

interface Patient {
    id: string;
    name: string;
    officeIds: string[];
}

// Mock Data
const mockPatients: Patient[] = [
    { id: '1', name: 'João da Silva', officeIds: ['101'] },
    { id: '2', name: 'Maria Oliveira', officeIds: ['101', '201'] },
    { id: '3', name: 'Carlos Pereira', officeIds: ['102'] },
    { id: '4', name: 'Ana Souza', officeIds: ['201'] },
];

const Dashboard = () => {
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const fetchPatients = () => {
      setIsLoading(true);
      const officeId = localStorage.getItem("officeId");
      if (!officeId) {
        console.error("No officeId found in localStorage.");
        setIsLoading(false);
        return;
      }
      
      // Simulate API call
      setTimeout(() => {
        const officePatients = mockPatients.filter(p => p.officeIds.includes(officeId));
        setPatients(officePatients);
        setIsLoading(false);
      }, 500);
    };

    fetchPatients();
  }, []);

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-800">
      <Sheet open={isMobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-60 bg-white" aria-describedby={undefined} title={undefined}>
          <DashboardSidebarContent isMobile onLinkClick={() => setMobileMenuOpen(false)} />
        </SheetContent>
      </Sheet>

      <DashboardSidebar />
      <DashboardHeader onMenuClick={() => setMobileMenuOpen(true)} />
        
      <main className="md:pl-20 pt-16 h-full">
        <div className="p-6 animate-fade-in">
          <h1 className="text-3xl font-bold mb-6 text-slate-900">Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Bell className="w-5 h-5 text-teal-500" />Avisos</CardTitle></CardHeader>
                <CardContent className="p-0">
                  <div className="relative h-48">
                    {announcements.map((announcement, index) => (
                      <div key={announcement.id} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === currentAnnouncementIndex ? "opacity-100" : "opacity-0"}`}>
                        <img src={announcement.image} alt={announcement.title} className="w-full h-full object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4"><p className="text-white text-sm font-medium">{announcement.title}</p></div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-2 py-3">
                    {announcements.map((_, index) => (
                      <button key={index} onClick={() => setCurrentAnnouncementIndex(index)} className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentAnnouncementIndex ? "bg-teal-500 w-6" : "bg-slate-300 hover:bg-slate-400"}`} aria-label={`Ir para aviso ${index + 1}`} />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader><CardTitle className="text-lg">Notificações</CardTitle></CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div key={notification.id} className="flex items-start gap-4 p-3 rounded-lg bg-slate-100">
                        <notification.icon className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-700">{notification.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="lg:col-span-2">
              <CardHeader><CardTitle className="text-xl flex items-center gap-2"><Calendar className="w-6 h-6 text-teal-500" />Pacientes do Consultório</CardTitle></CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-[55vh] overflow-y-auto pr-2">
                  {isLoading ? (
                    <div className="flex justify-center items-center h-40">
                      <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
                    </div>
                  ) : patients.length > 0 ? (
                    patients.map((patient) => (
                      <div key={patient.id} className="flex items-center gap-4 p-3 rounded-lg border bg-slate-100/50">
                        <div className="flex-shrink-0"><div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center"><User className="w-5 h-5 text-teal-600"/></div></div>
                        <div className="flex-1"><p className="font-medium text-slate-800 text-sm">{patient.name}</p></div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-slate-500">Nenhum paciente encontrado para este consultório.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
