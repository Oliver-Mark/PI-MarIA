import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Printer } from "lucide-react";
import { toast } from "sonner";

const mockPatient = {
  name: "Maria Silva Santos",
  age: 39,
};

const mockDoctor = "Dr. João Silva";

const cidOptions = [
  { value: "H52.0", label: "H52.0 - Hipermetropia" },
  { value: "H52.1", label: "H52.1 - Miopia" },
  { value: "H52.2", label: "H52.2 - Astigmatismo" },
  { value: "H40.0", label: "H40.0 - Glaucoma" },
  { value: "H25.0", label: "H25.0 - Catarata" },
  { value: "H35.0", label: "H35.0 - Retinopatia" },
];

const Anamnesis = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [elapsedTime, setElapsedTime] = useState(0);
  const [cid, setCid] = useState("");
  const [patientReports, setPatientReports] = useState("");
  
  // Prescrição de óculos
  const [odSpherical, setOdSpherical] = useState("");
  const [odCylindrical, setOdCylindrical] = useState("");
  const [odAxis, setOdAxis] = useState("");
  const [oeSpherical, setOeSpherical] = useState("");
  const [oeCylindrical, setOeCylindrical] = useState("");
  const [oeAxis, setOeAxis] = useState("");
  const [glassesObservations, setGlassesObservations] = useState("");

  // Exames
  const [biomicroscopy, setBiomicroscopy] = useState("");
  const [fundoscopy, setFundoscopy] = useState("");
  const [pioOd, setPioOd] = useState("");
  const [pioOe, setPioOe] = useState("");

  // Perguntas Sim/Não
  const [generateExams, setGenerateExams] = useState("no");
  const [generateMedicine, setGenerateMedicine] = useState("no");
  const [generateSurgery, setGenerateSurgery] = useState("no");
  const [generateCertificate, setGenerateCertificate] = useState("no");

  // Retorno
  const [returnOption, setReturnOption] = useState("");
  const [returnQuantity, setReturnQuantity] = useState("");

  // Conduta
  const [conduct, setConduct] = useState("");

  // Cronômetro
  useEffect(() => {
    const timer = setInterval(() => {
      setElapsedTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleGeneratePrescription = () => {
    toast.success("Receita de óculos gerada com sucesso!");
    // Implementar lógica de geração e impressão
  };

  const handleGenerateReport = () => {
    toast.success("Laudo gerado com sucesso!");
    // Implementar lógica de geração de laudo
  };

  const handleExamsButton = () => {
    toast.info("Abrindo formulário de pedidos de exames...");
  };

  const handleMedicineButton = () => {
    toast.info("Abrindo formulário de prescrição de remédios...");
  };

  const handleSurgeryButton = () => {
    toast.info("Abrindo formulário de pedido de cirurgia...");
  };

  const handleCertificateButton = () => {
    toast.info("Abrindo formulário de atestado...");
  };

  const handleFinishConsultation = () => {
    toast.success("Consulta finalizada com sucesso!");
    navigate("/waiting-room");
  };

  const currentDate = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <DashboardSidebar />
      
      <main className="ml-20 pt-6 px-6 pb-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header com Médico, Data e Finalizar */}
          <Card className="bg-card animate-fade-in">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-lg font-semibold text-foreground">
                  {mockDoctor}
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {currentDate}
                </div>
                <Button onClick={handleFinishConsultation} variant="default">
                  Finalizar Consulta
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2 text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Tempo de consulta: {formatTime(elapsedTime)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Nome do Paciente e Idade */}
          <div className="text-center animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h2 className="text-3xl font-bold text-foreground">
              {mockPatient.name}, {mockPatient.age} anos
            </h2>
          </div>

          {/* CID */}
          <Card className="bg-card animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label htmlFor="cid">CID da Consulta</Label>
                <Select value={cid} onValueChange={setCid}>
                  <SelectTrigger id="cid">
                    <SelectValue placeholder="Selecione o CID" />
                  </SelectTrigger>
                  <SelectContent>
                    {cidOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Relatos do Paciente */}
          <Card className="bg-card animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label htmlFor="reports">Relatos do Paciente</Label>
                <Textarea
                  id="reports"
                  value={patientReports}
                  onChange={(e) => setPatientReports(e.target.value)}
                  className="min-h-[120px]"
                  placeholder="Descreva os relatos do paciente..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Prescrição de Óculos */}
          <Card className="bg-card animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Prescrição de Óculos</h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  {/* OD */}
                  <div className="space-y-2">
                    <Label>OD (Olho Direito)</Label>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          placeholder="Esférico"
                          value={odSpherical}
                          onChange={(e) => setOdSpherical(e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          placeholder="Cilíndrico"
                          value={odCylindrical}
                          onChange={(e) => setOdCylindrical(e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          placeholder="Eixo"
                          value={odAxis}
                          onChange={(e) => setOdAxis(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* OE */}
                  <div className="space-y-2">
                    <Label>OE (Olho Esquerdo)</Label>
                    <div className="flex gap-2">
                      <div className="flex-1">
                        <Input
                          placeholder="Esférico"
                          value={oeSpherical}
                          onChange={(e) => setOeSpherical(e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          placeholder="Cilíndrico"
                          value={oeCylindrical}
                          onChange={(e) => setOeCylindrical(e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <Input
                          placeholder="Eixo"
                          value={oeAxis}
                          onChange={(e) => setOeAxis(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Observações */}
                <div className="space-y-2">
                  <Label htmlFor="glasses-obs">Observações</Label>
                  <Textarea
                    id="glasses-obs"
                    value={glassesObservations}
                    onChange={(e) => setGlassesObservations(e.target.value)}
                    className="min-h-[120px]"
                    placeholder="Observações sobre a prescrição..."
                  />
                </div>
              </div>

              <div className="mt-4">
                <Button onClick={handleGeneratePrescription} className="gap-2">
                  <Printer className="w-4 h-4" />
                  Gerar & Imprimir
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Biomicroscopia e Fundoscopia */}
          <Card className="bg-card animate-fade-in" style={{ animationDelay: "0.5s" }}>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="biomicroscopy">Biomicroscopia</Label>
                  <Textarea
                    id="biomicroscopy"
                    value={biomicroscopy}
                    onChange={(e) => setBiomicroscopy(e.target.value)}
                    className="min-h-[120px]"
                    placeholder="Descreva os achados da biomicroscopia..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fundoscopy">Fundoscopia</Label>
                  <Textarea
                    id="fundoscopy"
                    value={fundoscopy}
                    onChange={(e) => setFundoscopy(e.target.value)}
                    className="min-h-[120px]"
                    placeholder="Descreva os achados da fundoscopia..."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* PIO */}
          <Card className="bg-card animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label>PIO</Label>
                <div className="flex items-center gap-2 max-w-md">
                  <Input
                    placeholder="OD"
                    value={pioOd}
                    onChange={(e) => setPioOd(e.target.value)}
                    className="w-24"
                  />
                  <span className="text-foreground">/</span>
                  <Input
                    placeholder="OE"
                    value={pioOe}
                    onChange={(e) => setPioOe(e.target.value)}
                    className="w-24"
                  />
                  <span className="text-muted-foreground">mmHg</span>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button onClick={handleGenerateReport} variant="outline">
                  Fazer Laudo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Seção de Perguntas Sim/Não */}
          <Card className="bg-card animate-fade-in" style={{ animationDelay: "0.7s" }}>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {/* Exames */}
                <div className="flex items-center justify-between gap-4">
                  <Label className="flex-1">Gerar pedidos de exames?</Label>
                  <RadioGroup
                    value={generateExams}
                    onValueChange={setGenerateExams}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="exams-yes" />
                      <Label htmlFor="exams-yes" className="cursor-pointer">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="exams-no" />
                      <Label htmlFor="exams-no" className="cursor-pointer">Não</Label>
                    </div>
                  </RadioGroup>
                  <Button
                    onClick={handleExamsButton}
                    disabled={generateExams === "no"}
                    variant="outline"
                  >
                    Exames
                  </Button>
                </div>

                {/* Remédios */}
                <div className="flex items-center justify-between gap-4">
                  <Label className="flex-1">Gerar prescrição de remédio?</Label>
                  <RadioGroup
                    value={generateMedicine}
                    onValueChange={setGenerateMedicine}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="medicine-yes" />
                      <Label htmlFor="medicine-yes" className="cursor-pointer">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="medicine-no" />
                      <Label htmlFor="medicine-no" className="cursor-pointer">Não</Label>
                    </div>
                  </RadioGroup>
                  <Button
                    onClick={handleMedicineButton}
                    disabled={generateMedicine === "no"}
                    variant="outline"
                  >
                    Remédios
                  </Button>
                </div>

                {/* Cirurgia */}
                <div className="flex items-center justify-between gap-4">
                  <Label className="flex-1">Gerar pedido de cirurgia?</Label>
                  <RadioGroup
                    value={generateSurgery}
                    onValueChange={setGenerateSurgery}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="surgery-yes" />
                      <Label htmlFor="surgery-yes" className="cursor-pointer">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="surgery-no" />
                      <Label htmlFor="surgery-no" className="cursor-pointer">Não</Label>
                    </div>
                  </RadioGroup>
                  <Button
                    onClick={handleSurgeryButton}
                    disabled={generateSurgery === "no"}
                    variant="outline"
                  >
                    Cirurgias
                  </Button>
                </div>

                {/* Atestado */}
                <div className="flex items-center justify-between gap-4">
                  <Label className="flex-1">Gerar atestado?</Label>
                  <RadioGroup
                    value={generateCertificate}
                    onValueChange={setGenerateCertificate}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="certificate-yes" />
                      <Label htmlFor="certificate-yes" className="cursor-pointer">Sim</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="certificate-no" />
                      <Label htmlFor="certificate-no" className="cursor-pointer">Não</Label>
                    </div>
                  </RadioGroup>
                  <Button
                    onClick={handleCertificateButton}
                    disabled={generateCertificate === "no"}
                    variant="outline"
                  >
                    Atestado
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Retorno */}
          <Card className="bg-card animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-4 text-foreground">Retorno</h3>
              <RadioGroup value={returnOption} onValueChange={setReturnOption}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="annual" id="return-annual" />
                    <Label htmlFor="return-annual" className="cursor-pointer">Anual</Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="months" id="return-months" />
                    <Label htmlFor="return-months" className="cursor-pointer">Mese(s)</Label>
                    <Input
                      type="number"
                      placeholder="Quantidade"
                      value={returnOption === "months" ? returnQuantity : ""}
                      onChange={(e) => setReturnQuantity(e.target.value)}
                      disabled={returnOption !== "months"}
                      className="w-32"
                      min="1"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="weeks" id="return-weeks" />
                    <Label htmlFor="return-weeks" className="cursor-pointer">Semana(s)</Label>
                    <Input
                      type="number"
                      placeholder="Quantidade"
                      value={returnOption === "weeks" ? returnQuantity : ""}
                      onChange={(e) => setReturnQuantity(e.target.value)}
                      disabled={returnOption !== "weeks"}
                      className="w-32"
                      min="1"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="days" id="return-days" />
                    <Label htmlFor="return-days" className="cursor-pointer">Dia(s)</Label>
                    <Input
                      type="number"
                      placeholder="Quantidade"
                      value={returnOption === "days" ? returnQuantity : ""}
                      onChange={(e) => setReturnQuantity(e.target.value)}
                      disabled={returnOption !== "days"}
                      className="w-32"
                      min="1"
                    />
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Conduta */}
          <Card className="bg-card animate-fade-in" style={{ animationDelay: "0.9s" }}>
            <CardContent className="pt-6">
              <div className="space-y-2">
                <Label htmlFor="conduct">Conduta</Label>
                <Textarea
                  id="conduct"
                  value={conduct}
                  onChange={(e) => setConduct(e.target.value)}
                  className="min-h-[120px]"
                  placeholder="Descreva a conduta adotada..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Anamnesis;
