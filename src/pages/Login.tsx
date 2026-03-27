import { useState, useEffect, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import logoMaria from "@/assets/logo-maria.png";
import { ArrowLeft, Loader2 } from "lucide-react";
import ImageCarousel from "@/components/ImageCarousel";

// Data Structures (now simplified and local)
interface Unit {
  id: string;
  name: string;
}

interface Office {
  id: string;
  name: string;
  unitId: string;
}

// Mock Data
const mockUnits: Unit[] = [
    { id: '1', name: 'Unidade Principal' },
    { id: '2', name: 'Unidade Secundária' }
  ];
  
  const mockOffices: Office[] = [
    { id: '101', name: 'Consultório 1', unitId: '1' },
    { id: '102', name: 'Consultório 2', unitId: '1' },
    { id: '201', name: 'Consultório 3', unitId: '2' },
  ];

const Login = () => {
  const navigate = useNavigate();
  // Component State
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("teste@maria.health");
  const [password, setPassword] = useState("123456"); // Default for testing
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Step 2 State
  const [units, setUnits] = useState<Unit[]>([]);
  const [offices, setOffices] = useState<Office[]>([]);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  
  // On step 2, load mock units
  useEffect(() => {
    if (step === 2) {
      setUnits(mockUnits);
    }
  }, [step]);

  // When a unit is selected, load mock offices
  useEffect(() => {
    if (selectedUnit) {
      setOffices(mockOffices.filter(o => o.unitId === selectedUnit));
      setSelectedOffice(""); // Reset office selection
    } else {
      setOffices([]);
    }
  }, [selectedUnit]);

  // Handle Step 1: Just proceed to step 2
  const handleContinue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setError("");

    // Simulate a quick network delay
    setTimeout(() => {
        setStep(2);
        setIsLoading(false);
    }, 500);
  };

  // Handle Step 2: Unit/Office selection and final login
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedUnit && selectedOffice) {
      localStorage.setItem("unitId", selectedUnit);
      localStorage.setItem("officeId", selectedOffice);
      navigate("/dashboard");
    }
  };
  
  const handleGoBack = () => {
    setStep(1);
    setSelectedUnit("");
    setSelectedOffice("");
    setError("");
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Carousel - Left Side (Hidden on mobile) */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <ImageCarousel />
      </div>

      {/* Login Form - Right Side */}
      <div 
        className="w-full lg:w-1/2 flex items-center justify-center p-4 relative"
        style={{
          background: 'linear-gradient(135deg, #ffffff, #F0FDFC)',
        }}
      >
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-teal-500/5 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-cyan-500/5 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>

        <div className="relative w-full max-w-md bg-white/85 backdrop-blur-2xl border border-white/60 shadow-2xl rounded-3xl p-8">
        
        {step === 1 && (
          <div className="animate-fade-in">
            <div className="flex justify-center mb-8">
              <img src={logoMaria} alt="MarIA" className="h-24 w-auto rounded-3xl" />
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email</Label>
                <Input id="email" type="email" placeholder="seu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} className="h-12 bg-slate-50/80 border-slate-300 focus:border-teal-500 focus:ring-teal-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-slate-700">Senha</Label>
                <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="h-12 bg-slate-50/80 border-slate-300 focus:border-teal-500 focus:ring-teal-500" />
              </div>

              {error && (
                <p className="text-sm text-red-500 text-center pt-2">{error}</p>
              )}

              <div className="flex justify-end pt-2">
                <button type="button" className="text-sm text-teal-600 hover:text-teal-700 font-medium transition-colors">Esqueci minha senha</button>
              </div>

              <Button onClick={handleContinue} disabled={!email || !password || isLoading} className="w-full h-12 text-base font-bold text-white rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-gradient-to-r from-teal-500 to-cyan-600 hover:shadow-lg hover:shadow-teal-500/40">
                {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "CONTINUAR"}
              </Button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-8">
              <Button variant="ghost" size="icon" onClick={handleGoBack} className="text-slate-600 hover:bg-slate-200">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h2 className="text-xl font-bold text-slate-800 text-center">Selecione o Local</h2>
              <div className="w-8"></div> {/* Spacer */}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="unit" className="text-sm font-medium text-slate-700">Unidade</Label>
                <Select value={selectedUnit} onValueChange={setSelectedUnit} disabled={isLoading}>
                  <SelectTrigger id="unit" className="h-12 bg-slate-50/80 border-slate-300 focus:border-teal-500 focus:ring-teal-500">
                    <SelectValue placeholder="Selecione a unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.length === 0 && !isLoading && <p className="p-4 text-sm text-slate-500">Nenhuma unidade disponível.</p>}
                    {units.map(unit => (
                      <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="office" className="text-sm font-medium text-slate-700">Consultório</Label>
                <Select value={selectedOffice} onValueChange={setSelectedOffice} disabled={!selectedUnit || offices.length === 0}>
                  <SelectTrigger id="office" className="h-12 bg-slate-50/80 border-slate-300 focus:border-teal-500 focus:ring-teal-500">
                    <SelectValue placeholder={selectedUnit ? "Selecione o consultório" : "Selecione uma unidade primeiro"} />
                  </SelectTrigger>
                  <SelectContent>
                    {offices.map(office => (
                      <SelectItem key={office.id} value={office.id}>{office.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {error && (
                <p className="text-sm text-red-500 text-center pt-2">{error}</p>
              )}
              <div className="pt-4">
                <Button type="submit" disabled={!selectedUnit || !selectedOffice || isLoading} className="w-full h-12 text-base font-bold text-white rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-gradient-to-r from-teal-500 to-cyan-600 hover:shadow-lg hover:shadow-teal-500/40">
                  {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : "ACESSAR SISTEMA"}
                </Button>
              </div>
            </form>
          </div>
        )}
        </div>
      </div>
    </div>
  );
};

export default Login;
