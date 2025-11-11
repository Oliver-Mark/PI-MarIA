import { useState } from "react";
import { LayoutDashboard, Calendar, Users, FileSignature, BarChart3, Clock } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Calendar, label: "Agenda", path: "/agenda" },
  { icon: Clock, label: "Sala de Espera", path: "/waiting-room" },
  { icon: Users, label: "Pacientes", path: "/patients" },
  { icon: FileSignature, label: "Assinatura Eletrônica", path: "/signature" },
  { icon: BarChart3, label: "Gráficos", path: "/charts" },
];

const DashboardSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`fixed left-0 top-16 bottom-0 bg-sidebar border-r border-sidebar/20 transition-all duration-300 ease-in-out z-30 ${
        isExpanded ? "w-64" : "w-20"
      }`}
    >
      <nav className="flex flex-col items-center py-8 px-2 h-full">
        <div className="flex flex-col gap-2 w-full">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-white/10 group text-sidebar-foreground"
              activeClassName="bg-white/20 text-white font-semibold"
            >
              <item.icon className="w-6 h-6 flex-shrink-0 group-hover:scale-110 transition-transform" />
              <span
                className={`font-medium whitespace-nowrap transition-opacity duration-300 ${
                  isExpanded ? "opacity-100" : "opacity-0 w-0"
                }`}
              >
                {item.label}
              </span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
