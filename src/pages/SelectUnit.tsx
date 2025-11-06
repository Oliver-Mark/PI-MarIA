import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageCarousel from "@/components/ImageCarousel";
import logoMaria from "@/assets/logo-maria.png";

const units = [
  { id: "1", name: "Unidade Centro" },
  { id: "2", name: "Unidade Zona Sul" },
  { id: "3", name: "Unidade Zona Norte" },
];

const offices = {
  "1": [
    { id: "101", name: "Consultório 1 - Cardiologia" },
    { id: "102", name: "Consultório 2 - Ortopedia" },
    { id: "103", name: "Consultório 3 - Pediatria" },
  ],
  "2": [
    { id: "201", name: "Consultório 1 - Dermatologia" },
    { id: "202", name: "Consultório 2 - Neurologia" },
  ],
  "3": [
    { id: "301", name: "Consultório 1 - Ginecologia" },
    { id: "302", name: "Consultório 2 - Oftalmologia" },
  ],
};

const SelectUnit = () => {
  const navigate = useNavigate();
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");

  const isFormValid = selectedUnit !== "" && selectedOffice !== "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      navigate("/dashboard");
    }
  };

  const handleUnitChange = (value: string) => {
    setSelectedUnit(value);
    setSelectedOffice("");
  };

  return (
    <div className="min-h-screen flex">
      {/* Carrossel - apenas desktop */}
      <div className="hidden lg:block lg:w-1/2">
        <ImageCarousel />
      </div>

      {/* Formulário de Seleção */}
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
              <Label htmlFor="unit" className="text-base font-medium">
                Unidade
              </Label>
              <Select value={selectedUnit} onValueChange={handleUnitChange}>
                <SelectTrigger id="unit" className="h-12 text-base">
                  <SelectValue placeholder="Selecione a unidade" />
                </SelectTrigger>
                <SelectContent>
                  {units.map((unit) => (
                    <SelectItem key={unit.id} value={unit.id}>
                      {unit.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="office" className="text-base font-medium">
                Consultório
              </Label>
              <Select 
                value={selectedOffice} 
                onValueChange={setSelectedOffice}
                disabled={!selectedUnit}
              >
                <SelectTrigger id="office" className="h-12 text-base">
                  <SelectValue placeholder="Selecione o consultório" />
                </SelectTrigger>
                <SelectContent>
                  {selectedUnit && offices[selectedUnit as keyof typeof offices]?.map((office) => (
                    <SelectItem key={office.id} value={office.id}>
                      {office.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              type="submit"
              disabled={!isFormValid}
              className="w-full h-12 text-base font-bold rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 mt-8"
            >
              ACESSAR
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SelectUnit;
