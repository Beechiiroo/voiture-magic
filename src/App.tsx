
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { UserProvider } from "@/context/UserContext";
import SiteVerification from "@/components/SiteVerification";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cars from "./pages/Cars";
import Contact from "./pages/Contact";
import Reservations from "./pages/Reservations";
import NotFound from "./pages/NotFound";

const App = () => {
  // Create a new QueryClient instance inside the component
  const [queryClient] = useState(() => new QueryClient());
  const [isSiteVerified, setIsSiteVerified] = useState(false);

  useEffect(() => {
    // Check if the user has already verified this session
    const verified = sessionStorage.getItem('site-verified') === 'true';
    setIsSiteVerified(verified);
  }, []);

  const handleSiteVerified = () => {
    setIsSiteVerified(true);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {!isSiteVerified && <SiteVerification onVerified={handleSiteVerified} />}
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/voitures" element={<Cars />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </BrowserRouter>
        </TooltipProvider>
      </UserProvider>
    </QueryClientProvider>
  );
};

export default App;
