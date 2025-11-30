import { useState } from "react";
import { LayoutDashboard, Calendar, Users, FileSignature, BarChart3, Clock } from "lucide-react";
import { NavLink as RouterNavLink } from "react-router-dom";
import logoMaria from "@/assets/logo-maria.png";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Calendar, label: "Agenda", path: "/agenda" },
  { icon: Clock, label: "Sala de Espera", path: "/waiting-room" },
  { icon: Users, label: "Pacientes", path: "/patients" },
  { icon: FileSignature, label: "Assinatura Eletrônica", path: "/signature" },
  { icon: BarChart3, label: "Gráficos", path: "/charts" },
];

interface DashboardSidebarProps {
  isMobile?: boolean;
  onLinkClick?: () => void;
}

const NavLink = ({ to, children, className, activeClassName, onClick }: { to: string; children: React.ReactNode; className: string; activeClassName: string; onClick?: () => void; }) => (
  <RouterNavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `${className} ${isActive ? activeClassName : ""}`
    }
  >
    {children}
  </RouterNavLink>
);

export const DashboardSidebarContent = ({ isMobile, onLinkClick }: DashboardSidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const expanded = isMobile || isExpanded;

  return (
    <aside
      onMouseEnter={isMobile ? undefined : () => setIsExpanded(true)}
      onMouseLeave={isMobile ? undefined : () => setIsExpanded(false)}
      className={`fixed left-4 top-4 bottom-4 bg-white/60 backdrop-blur-xl border border-black/5 shadow-lg transition-all duration-300 ease-in-out z-50 rounded-2xl
        ${expanded ? "w-60" : "w-20"}`}
    >
      <div className="flex flex-col h-full">
        <div className={`flex items-center gap-3 h-20 px-4 ${expanded ? 'justify-start' : 'justify-center'}`}>
          <img src={logoMaria} alt="MarIA" className="h-9 w-auto flex-shrink-0" />
          <span className={`text-xl font-bold text-slate-800 whitespace-nowrap transition-opacity duration-300 ${expanded ? "opacity-100" : "opacity-0"}`}>
            MarIA
          </span>
        </div>

        <nav className="flex flex-col pt-4 px-3 flex-1">
          <div className="flex flex-col gap-2 w-full">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onLinkClick}
                className="flex items-center gap-4 px-3 py-3 rounded-lg transition-all duration-200 text-slate-600 hover:text-slate-900 hover:bg-black/5 group"
                activeClassName="bg-teal-500/10 text-teal-600 font-semibold"
              >
                <item.icon className="w-6 h-6 flex-shrink-0 transition-transform" />
                <span
                  className={`font-medium whitespace-nowrap transition-opacity duration-300 ${
                    expanded ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.label}
                </span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </aside>
  );
}

const DashboardSidebar = () => {
  return (
    <div className="hidden md:block">
      <DashboardSidebarContent />
    </div>
  );
};

export default DashboardSidebar;
