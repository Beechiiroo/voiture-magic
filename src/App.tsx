
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { UserProvider } from "@/context/UserContext";
import { TranslationProvider } from "@/hooks/use-translation";
import SiteVerification from "@/components/SiteVerification";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cars from "./pages/Cars";
import Contact from "./pages/Contact";
import Reservations from "./pages/Reservations";
import NotFound from "./pages/NotFound";
import ForgotPassword from "./pages/ForgotPassword";
import VehicleDetails from "./pages/VehicleDetails";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import Profile from "./pages/Profile";

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
      <TranslationProvider>
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
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                  <Route path="/voitures" element={<Cars />} />
                  <Route path="/voitures/:id" element={<VehicleDetails />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/reservations" element={<Reservations />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/confidentialite" element={<PrivacyPolicy />} />
                  <Route path="/conditions" element={<TermsOfService />} />
                  <Route path="/cookies" element={<CookiePolicy />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AnimatePresence>
            </BrowserRouter>
          </TooltipProvider>
        </UserProvider>
      </TranslationProvider>
    </QueryClientProvider>
  );
};

export default App;
