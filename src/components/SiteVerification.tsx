
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Captcha } from "@/components/ui/captcha";
import { Car } from "lucide-react";
import { motion } from "framer-motion";

interface SiteVerificationProps {
  onVerified: () => void;
}

const SiteVerification = ({ onVerified }: SiteVerificationProps) => {
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [verificationAttempted, setVerificationAttempted] = useState(false);

  const handleVerify = () => {
    if (captchaVerified) {
      // Store verification in session storage so it persists only for this session
      sessionStorage.setItem('site-verified', 'true');
      onVerified();
    } else {
      setVerificationAttempted(true);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-6"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex flex-col items-center mb-6">
          <Car className="h-12 w-12 text-rental-600 mb-4" />
          <h2 className="text-xl font-bold text-center">Bienvenue sur CarRental<span className="text-rental-600">Pro</span></h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
            Veuillez confirmer que vous n'êtes pas un robot pour accéder au site.
          </p>
        </div>

        <div className="space-y-6">
          <Captcha onVerify={setCaptchaVerified} />
          
          {verificationAttempted && !captchaVerified && (
            <p className="text-sm text-red-500 text-center">
              Veuillez compléter la vérification anti-robot avant de continuer.
            </p>
          )}
          
          <Button 
            onClick={handleVerify}
            className="w-full bg-rental-600 hover:bg-rental-700"
          >
            Accéder au site
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SiteVerification;
