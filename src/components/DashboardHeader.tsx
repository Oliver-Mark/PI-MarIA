import { useNavigate } from "react-router-dom";
import { Settings, LogOut, ChevronDown, Menu } from "lucide-react";
import defaultAvatar from "@/assets/default-avatar.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DashboardHeaderProps {
  onMenuClick: () => void;
  userName?: string;
}

const DashboardHeader = ({ onMenuClick, userName = "Dr. João Silva" }: DashboardHeaderProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="fixed top-4 right-4 left-4 md:left-28 h-16 bg-white/60 backdrop-blur-xl border border-black/5 shadow-lg rounded-2xl z-40 flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-slate-800 hover:bg-black/5 hover:text-slate-900"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-black/5 rounded-full px-2 py-1.5 transition-colors">
          <img 
            src={defaultAvatar} 
            alt={userName} 
            className="w-9 h-9 rounded-full object-cover border-2 border-teal-500/50"
          />
          <div className="hidden sm:flex flex-col items-start">
            <span className="font-medium text-sm text-slate-800">{userName}</span>
            <span className="text-xs text-slate-500">Médico</span>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-500 hidden sm:block" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 mt-2 bg-white/80 backdrop-blur-xl border-black/10 shadow-2xl rounded-lg">
          <DropdownMenuItem className="cursor-pointer text-slate-700 focus:bg-black/10 focus:text-slate-900">
            <Settings className="w-4 h-4 mr-2" />
            Configurações da Conta
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-700 focus:bg-red-500/10">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default DashboardHeader;
