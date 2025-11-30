import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import logoMaria from "@/assets/logo-maria.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("dr.joao@maria.health");
  const [password, setPassword] = useState("••••••••");

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/dashboard"); // Redirect to dashboard after login
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1579684385127-6abf9df8ca88?q=80&w=2070&auto=format&fit=crop')" }}
    >
      {/* Overlay escuro para melhor contraste */}
      <div 
        className="absolute inset-0 bg-slate-900/50"></div>

      {/* Cartão de Login com Efeito Glass */}
      <div className="relative w-full max-w-md bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl p-8 animate-fade-in">
        <div className="flex justify-center mb-8">
          <img 
            src={logoMaria} 
            alt="MarIA - Medicina Especializada" 
            className="h-16 w-auto" // Estilo ajustado para proporção correta
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-white/80">
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-black/20 border-white/20 text-white placeholder:text-white/40 rounded-lg focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-white/80">
              Senha
            </label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-black/20 border-white/20 text-white placeholder:text-white/40 rounded-lg focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-teal-300 hover:text-teal-200 transition-colors"
            >
              Esqueci minha senha
            </button>
          </div>

          <Button
            type="submit"
            disabled={!isFormValid}
            className="w-full h-12 text-base font-bold text-white rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 bg-gradient-to-r from-teal-500 to-cyan-600 hover:shadow-lg hover:shadow-teal-500/30"
          >
            ENTRAR
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
