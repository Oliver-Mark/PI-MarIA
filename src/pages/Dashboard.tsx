import { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar, { DashboardSidebarContent } from "@/components/DashboardSidebar";
import { Calendar, Bell, Cake } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import carousel1 from "@/assets/carousel-1.jpg";
import carousel2 from "@/assets/carousel-2.jpg";
import carousel3 from "@/assets/carousel-3.jpg";

const announcements = [
  { id: 1, image: carousel1, title: "Novas diretrizes de atendimento" },
  { id: 2, image: carousel2, title: "Treinamento de equipe - Próxima semana" },
  { id: 3, image: carousel3, title: "Atualização do sistema - Dia 15" },
];

const todaySchedule = [
  { id: 1, time: "08:00", patient: "Maria Silva Santos", status: "confirmed" },
  { id: 2, time: "08:30", patient: "João Pedro Oliveira", status: "confirmed" },
  { id: 3, time: "09:00", patient: "Ana Carolina Souza", status: "waiting" },
  { id: 4, time: "09:30", patient: "Carlos Eduardo Lima", status: "confirmed" },
  { id: 5, time: "10:00", patient: "Fernanda Martins Costa", status: "confirmed" },
];

const notifications = [
  { id: 1, icon: Cake, text: "Maria Silva Santos faz aniversário hoje!", type: "birthday" },
  { id: 2, icon: Bell, text: "3 pacientes aguardando na sala de espera", type: "info" },
  { id: 3, icon: Calendar, text: "Lembrete: Reunião de equipe às 16h", type: "reminder" },
];

// Reusable Light Glass Card component
const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/70 backdrop-blur-xl border border-black/5 shadow-lg rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}>
    {children}
  </div>
);

const Dashboard = () => {
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Dashboard</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Esquerda - Avisos e Notificações */}
          <div className="space-y-8">
            <GlassCard className="overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-800">
                  <Bell className="w-6 h-6 text-teal-500" />
                  Avisos
                </h2>
              </div>
              <div className="px-2">
                <div className="relative h-48 rounded-2xl overflow-hidden mx-4">
                  {announcements.map((announcement, index) => (
                    <div
                      key={announcement.id}
                      className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                        index === currentAnnouncementIndex ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <img src={announcement.image} alt={announcement.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-white text-sm font-medium">{announcement.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center gap-2 py-4">
                  {announcements.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentAnnouncementIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentAnnouncementIndex ? "bg-teal-500 w-6" : "bg-slate-300 hover:bg-slate-400"
                      }`}
                      aria-label={`Ir para aviso ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-slate-800">Notificações</h2>
              </div>
              <div className="px-6 pb-6">
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start gap-4 p-4 rounded-xl bg-slate-500/10 hover:bg-slate-500/20 transition-colors">
                      <notification.icon className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-700">{notification.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Coluna Direita - Agenda do Dia */}
          <GlassCard className="lg:col-span-2">
            <div className="p-6">
              <h2 className="text-xl font-semibold flex items-center gap-2 text-slate-800">
                <Calendar className="w-6 h-6 text-teal-500" />
                Agenda do Dia
              </h2>
            </div>
            <div className="px-6 pb-6">
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {todaySchedule.map((appointment) => (
                  <div key={appointment.id} className="flex items-center gap-4 p-4 rounded-xl border border-transparent bg-slate-500/10 hover:border-teal-500/50 transition-all">
                    <div className="flex-shrink-0">
                      <div className="text-base font-bold text-teal-600 w-16 text-center">{appointment.time}</div>
                    </div>
                    <div className="flex-1 border-l border-slate-500/20 pl-4">
                      <p className="font-medium text-slate-800 text-sm">{appointment.patient}</p>
                    </div>
                    <div className="flex-shrink-0">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        appointment.status === "confirmed"
                          ? "bg-teal-500/10 text-teal-600"
                          : "bg-amber-500/10 text-amber-600"
                      }`}>
                        {appointment.status === "confirmed" ? "Confirmado" : "Aguardando"}
                      </span>
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

export default Dashboard;
