import { useState } from "react";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar, { DashboardSidebarContent } from "@/components/DashboardSidebar";
import { FileSignature } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";

const GlassCard = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/70 backdrop-blur-xl border border-black/5 shadow-lg rounded-3xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}>
    {children}
  </div>
);

const Signature = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <h1 className="text-4xl font-bold mb-8 text-slate-900">Assinatura Eletrônica</h1>
        
        <GlassCard>
          <div className="p-8">
            <h2 className="text-xl font-semibold flex items-center gap-3 mb-4 text-slate-800">
              <FileSignature className="w-6 h-6 text-teal-500" />
              Documentos para Assinatura
            </h2>
            <div className="flex items-center justify-center h-60 border-2 border-dashed border-slate-300 rounded-2xl">
              <p className="text-slate-500">Conteúdo em desenvolvimento...</p>
            </div>
          </div>
        </GlassCard>
      </main>
    </div>
  );
};

export default Signature;
