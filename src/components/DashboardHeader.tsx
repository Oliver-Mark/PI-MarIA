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
    <header className="fixed top-0 right-0 left-0 md:left-20 h-16 bg-teal-600 z-30 flex items-center justify-between px-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-white hover:bg-teal-700/50 hover:text-white"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6" />
          <span className="sr-only">Abrir menu</span>
        </Button>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-teal-700/50 rounded-full px-2 py-1.5 transition-colors">
          <img 
            src={defaultAvatar} 
            alt={userName} 
            className="w-9 h-9 rounded-full object-cover border-2 border-teal-400"
          />
          <div className="hidden sm:flex flex-col items-start">
            <span className="font-medium text-sm text-white">{userName}</span>
            <span className="text-xs text-teal-200">Médico</span>
          </div>
          <ChevronDown className="w-4 h-4 text-teal-200 hidden sm:block" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 mt-2 bg-teal-700 border-teal-600 text-white shadow-2xl rounded-lg">
          <DropdownMenuItem className="cursor-pointer focus:bg-teal-600">
            <Settings className="w-4 h-4 mr-2" />
            Configurações da Conta
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-400 focus:text-red-400 focus:bg-red-500/20">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default DashboardHeader;
