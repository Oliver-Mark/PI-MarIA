import { useState, useEffect } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Bell, Cake } from "lucide-react";
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
  { id: 6, time: "10:30", patient: "Ricardo Alves Pereira", status: "confirmed" },
  { id: 7, time: "11:00", patient: "Juliana Ferreira Santos", status: "waiting" },
  { id: 8, time: "11:30", patient: "Paulo Roberto Silva", status: "confirmed" },
  { id: 9, time: "14:00", patient: "Mariana Costa Lima", status: "confirmed" },
  { id: 10, time: "14:30", patient: "Gabriel Santos Oliveira", status: "confirmed" },
];

const notifications = [
  { id: 1, icon: Cake, text: "Maria Silva Santos faz aniversário hoje!", type: "birthday" },
  { id: 2, icon: Bell, text: "3 pacientes aguardando na sala de espera", type: "info" },
  { id: 3, icon: Calendar, text: "Lembrete: Reunião de equipe às 16h", type: "reminder" },
];

const Dashboard = () => {
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <DashboardSidebar />
      
      <main className="ml-20 pt-6 px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-foreground">Dashboard</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Coluna Esquerda - Avisos e Notificações */}
            <div className="space-y-6">
              {/* Carrossel de Avisos */}
              <Card className="overflow-hidden">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bell className="w-5 h-5 text-primary" />
                    Avisos
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative h-48">
                    {announcements.map((announcement, index) => (
                      <div
                        key={announcement.id}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          index === currentAnnouncementIndex ? "opacity-100" : "opacity-0"
                        }`}
                      >
                        <img
                          src={announcement.image}
                          alt={announcement.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                          <p className="text-white text-sm font-medium">{announcement.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center gap-2 p-3">
                    {announcements.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentAnnouncementIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          index === currentAnnouncementIndex
                            ? "bg-primary w-6"
                            : "bg-muted"
                        }`}
                        aria-label={`Ir para aviso ${index + 1}`}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notificações */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notificações</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="flex items-start gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                      >
                        <notification.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-foreground">{notification.text}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Coluna Direita - Agenda do Dia */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  Agenda do Dia
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-[600px] overflow-y-auto">
                  {todaySchedule.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center gap-4 p-4 rounded-lg border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <div className="text-lg font-bold text-primary">{appointment.time}</div>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{appointment.patient}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            appointment.status === "confirmed"
                              ? "bg-primary/10 text-primary"
                              : "bg-amber-500/10 text-amber-600"
                          }`}
                        >
                          {appointment.status === "confirmed" ? "Confirmado" : "Aguardando"}
                        </span>
                      </div>
                    </div>
                  ))}
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
