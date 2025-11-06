import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ImageCarousel from "@/components/ImageCarousel";
import logoMaria from "@/assets/logo-maria.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/select-unit");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Carrossel - apenas desktop */}
      <div className="hidden lg:block lg:w-1/2">
        <ImageCarousel />
      </div>

      {/* Formulário de Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md animate-fade-in">
          <div className="flex justify-center mb-12">
            <img 
              src={logoMaria} 
              alt="MarIA - Medicina Especializada" 
              className="h-24 w-auto rounded-2xl shadow-elegant"
            />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-base font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 text-base"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-base font-medium">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 text-base"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="text-sm text-primary hover:text-primary-hover transition-colors"
              >
                Esqueci minha senha
              </button>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid}
              className="w-full h-12 text-base font-bold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              ENTRAR
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
