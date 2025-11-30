import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase-config";
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

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [unit, setUnit] = useState("");
  const [office, setOffice] = useState("");
  const [email, setEmail] = useState("dr.joao@maria.health");
  const [password, setPassword] = useState("••••••••");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setStep(2); // Avança para a próxima etapa em caso de sucesso
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError("Email ou senha inválidos.");
      } else {
        setError("Ocorreu um erro ao fazer login. Tente novamente.");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (unit && office) {
      navigate("/dashboard");
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
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
              <img src={logoMaria} alt="MarIA" className="h-24 w-auto" />
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
              <Button variant="ghost" size="icon" onClick={() => setStep(1)} className="text-slate-600 hover:bg-slate-200">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h2 className="text-xl font-bold text-slate-800 text-center">Selecione o Local</h2>
              <div className="w-8"></div> {/* Spacer */}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="unit" className="text-sm font-medium text-slate-700">Unidade</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger id="unit" className="h-12 bg-slate-50/80 border-slate-300 focus:border-teal-500 focus:ring-teal-500"><SelectValue placeholder="Selecione a unidade" /></SelectTrigger>
                  <SelectContent><SelectItem value="matriz">Matriz</SelectItem><SelectItem value="filial-centro">Filial Centro</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="office" className="text-sm font-medium text-slate-700">Consultório</Label>
                <Select value={office} onValueChange={setOffice}>
                  <SelectTrigger id="office" className="h-12 bg-slate-50/80 border-slate-300 focus:border-teal-500 focus:ring-teal-500"><SelectValue placeholder="Selecione o consultório" /></SelectTrigger>
                  <SelectContent><SelectItem value="consultorio-01">Consultório 01</SelectItem><SelectItem value="consultorio-02">Consultório 02</SelectItem><SelectItem value="sala-exames">Sala de Exames</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="pt-4">
                <Button type="submit" disabled={!unit || !office} className="w-full h-12 text-base font-bold text-white rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-gradient-to-r from-teal-500 to-cyan-600 hover:shadow-lg hover:shadow-teal-500/40">
                  ACESSAR SISTEMA
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;

