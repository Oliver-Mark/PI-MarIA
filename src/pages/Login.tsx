import { seedDatabase } from "@/seedDatabase";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/firebase-config";
import { collection, getDocs, query, where, doc, getDoc, DocumentData } from "firebase/firestore";
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

// Data Structures
interface Unit extends DocumentData {
  id: string;
  name: string;
}

interface Office extends DocumentData {
  id: string;
  name: string;
  unitId: string;
}

interface UserProfile {
  acesso_total: boolean;
  unidades_ids: string[];
}

const Login = () => {
  const navigate = useNavigate();
  // Component State
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("teste@maria.health");
  const [password, setPassword] = useState("123456"); // Default for testing
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);

  // Step 2 State
  const [units, setUnits] = useState<Unit[]>([]);
  const [offices, setOffices] = useState<Office[]>([]);
  const [selectedUnit, setSelectedUnit] = useState("");
  const [selectedOffice, setSelectedOffice] = useState("");
  
  // User Permission State
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Fetch Units based on User Permissions
  useEffect(() => {
    const fetchUnits = async () => {
      if (step === 2 && userProfile) {
        setIsLoading(true);
        try {
          const unitsCollection = collection(db, 'units');
          const unitsSnapshot = await getDocs(unitsCollection);
          let unitsList = unitsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Unit));

          // Filter units based on user permissions
          if (!userProfile.acesso_total) {
            unitsList = unitsList.filter(unit => userProfile.unidades_ids.includes(unit.id));
          }
          
          setUnits(unitsList);
        } catch (err) {
          console.error("Error fetching units: ", err);
          setError("Falha ao carregar as unidades.");
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchUnits();
  }, [step, userProfile]);

  // Fetch Offices for the selected Unit
  useEffect(() => {
    const fetchOffices = async () => {
      if (selectedUnit) {
        try {
          setOffices([]); 
          setSelectedOffice("");
          const officesCollection = collection(db, 'offices');
          const q = query(officesCollection, where('unitId', '==', selectedUnit));
          const officesSnapshot = await getDocs(q);
          const officesList = officesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Office));
          setOffices(officesList);
        } catch (err) {
          console.error("Error fetching offices: ", err);
          setError("Falha ao carregar os consultórios.");
        }
      }
    };
    fetchOffices();
  }, [selectedUnit]);

  // Handle DB Seeding
  const handleSeed = async () => {
    setIsSeeding(true);
    setError("");
    try {
      await seedDatabase();
      alert('Banco de dados populado com sucesso!');
    } catch (err) {
      console.error(err);
      setError("Ocorreu um erro ao popular o banco de dados.");
    } finally {
      setIsSeeding(false);
    }
  };

  // Handle Step 1: Email/Password Login and Profile Fetch
  const handleContinue = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoading(true);
    setError("");

    try {
      // 1. Sign in with Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user && user.email) {
        // 2. Fetch user profile from Firestore
        const userDocRef = doc(db, 'users', user.email);
        const userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          setError("Usuário sem perfil de acesso configurado.");
          await auth.signOut(); // Sign out to prevent inconsistent state
          return;
        }

        const userData = userDocSnap.data();
        const profile: UserProfile = {
          acesso_total: userData.permissoes.acesso_total,
          unidades_ids: userData.permissoes.unidades_ids,
        };
        
        setUserProfile(profile);
        setStep(2); // Proceed to step 2 on success
      }
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

  // Handle Step 2: Unit/Office selection and final login
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedUnit && selectedOffice) {
      localStorage.setItem("unitId", selectedUnit);
      localStorage.setItem("officeId", selectedOffice);
      navigate("/dashboard");
    }
  };
  
  const handleGoBack = () => {
    setStep(1);
    setUserProfile(null);
    setUnits([]);
    setOffices([]);
    setSelectedUnit("");
    setSelectedOffice("");
    setError("");
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

            <div className="mt-4">
              <Button onClick={handleSeed} disabled={isSeeding} className="w-full h-12 text-base font-bold bg-red-500 hover:bg-red-600 text-white rounded-xl">
                {isSeeding ? <Loader2 className="w-6 h-6 animate-spin" /> : "Resetar e Popular Banco"}
              </Button>
            </div>
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
                    {units.length === 0 && !isLoading && <p className="p-4 text-sm text-slate-500">Nenhuma unidade disponível para seu usuário.</p>}
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
  );
};

export default Login;