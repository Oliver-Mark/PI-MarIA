import { useEffect, useState } from "react";
import logoMaria from "@/assets/logo-maria.png";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 500);
    }, 3000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#40b5ad] transition-opacity duration-500 ${
        isComplete ? "opacity-0" : "opacity-100"
      }`}
    >
      <img 
        src={logoMaria} 
        alt="Logo MarIA" 
        className="w-72 h-auto mb-8 animate-fade-in rounded-3xl"
      />
      <div className="flex flex-col items-center gap-4">
        <p className="text-white text-2xl font-semibold animate-fade-in">
          Bem-Vindo
        </p>
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
