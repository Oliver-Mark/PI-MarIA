import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSignature } from "lucide-react";

const Signature = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <DashboardSidebar />
      
      <main className="ml-20 pt-6 px-6 pb-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-foreground">Assinatura Eletrônica</h1>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileSignature className="w-6 h-6 text-primary" />
                Documentos para Assinatura
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Conteúdo em desenvolvimento...</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Signature;
