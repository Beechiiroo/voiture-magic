
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";
import { toast } from "@/hooks/use-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate an API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: t("resetPasswordSent"),
        description: `${t("resetPasswordInstructions")} ${email}`,
        variant: "success",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: t("error"),
        description: t("resetPasswordError"),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-rental-900 dark:text-rental-100">
                {t("resetPasswordTitle")}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {t("resetPasswordSubtitle")}
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">{t("email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-rental-600 hover:bg-rental-700"
                disabled={submitting}
              >
                {submitting ? t("loading") : t("resetPasswordTitle")}
              </Button>
            </form>
            
            <div className="text-center mt-6">
              <Link 
                to="/login" 
                className="text-sm text-rental-600 hover:text-rental-700 dark:text-rental-400 dark:hover:text-rental-300"
              >
                {t("backToLogin")}
              </Link>
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ForgotPassword;
