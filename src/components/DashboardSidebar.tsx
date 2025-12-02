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
    // NOTE: For mobile, this component is rendered inside a Sheet, so the 'fixed' positioning is for desktop only.
    <aside
      onMouseEnter={isMobile ? undefined : () => setIsExpanded(true)}
      onMouseLeave={isMobile ? undefined : () => setIsExpanded(false)}
      className={`fixed top-0 left-0 bottom-0 bg-teal-600 transition-all duration-300 ease-in-out z-40
        ${expanded ? "w-60" : "w-20"}`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-center h-16">
          <img 
            src={logoMaria} 
            alt="MarIA" 
            className={`rounded-3xl object-contain transition-all duration-300 ${
              expanded ? 'h-20 w-20' : 'h-16 w-16'
            }`} 
          />
        </div>

        <nav className="flex flex-col pt-4 px-2 flex-1">
          <div className="flex flex-col gap-2 w-full">
            {menuItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onLinkClick}
                className="flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 text-teal-100 hover:text-white hover:bg-teal-700/50 group"
                activeClassName="bg-teal-700 text-white font-semibold"
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
  // This wrapper is for desktop view. The mobile view is handled inside each page's Sheet component.
  return (
    <div className="hidden md:block">
      <DashboardSidebarContent />
    </div>
  );
};

export default DashboardSidebar;
