import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Settings, LogOut, ChevronDown } from "lucide-react";
import logoMaria from "@/assets/logo-maria.png";
import defaultAvatar from "@/assets/default-avatar.jpg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const [userName] = useState("Dr. João Silva");

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="h-16 border-b bg-header flex items-center justify-between px-6 sticky top-0 z-40 shadow-sm">
      <div className="flex items-center">
        <img 
          src={logoMaria} 
          alt="MarIA" 
          className="h-10 w-auto rounded-lg"
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-3 hover:bg-white/10 rounded-lg px-3 py-2 transition-colors">
          <img 
            src={defaultAvatar} 
            alt={userName} 
            className="w-10 h-10 rounded-full object-cover border-2 border-white/20"
          />
          <span className="font-medium hidden sm:block text-header-foreground">{userName}</span>
          <ChevronDown className="w-4 h-4 text-header-foreground" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem className="cursor-pointer">
            <Settings className="w-4 h-4 mr-2" />
            Configurações
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default DashboardHeader;
