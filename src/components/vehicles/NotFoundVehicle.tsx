
import React from "react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/use-translation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFoundVehicle: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <div className="container mx-auto px-4 py-16 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-rental-900 dark:text-rental-100">
            {t("vehicleNotFound")}
          </h2>
          <Button onClick={() => window.history.back()} variant="outline">
            {t("back")}
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFoundVehicle;
