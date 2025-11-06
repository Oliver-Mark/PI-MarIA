import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoadingScreen from "./components/LoadingScreen";
import Login from "./pages/Login";
import SelectUnit from "./pages/SelectUnit";
import Dashboard from "./pages/Dashboard";
import WaitingRoom from "./pages/WaitingRoom";
import Patients from "./pages/Patients";
import Signature from "./pages/Signature";
import Charts from "./pages/Charts";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const hasSeenLoading = sessionStorage.getItem("hasSeenLoading");
    if (hasSeenLoading) {
      setShowLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    sessionStorage.setItem("hasSeenLoading", "true");
    setShowLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showLoading && <LoadingScreen onComplete={handleLoadingComplete} />}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/select-unit" element={<SelectUnit />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/waiting-room" element={<WaitingRoom />} />
            <Route path="/patients" element={<Patients />} />
            <Route path="/signature" element={<Signature />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
