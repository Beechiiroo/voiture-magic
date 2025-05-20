
import React from "react";
import { Check } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

interface VehicleFeaturesProps {
  features: string[];
}

const VehicleFeatures: React.FC<VehicleFeaturesProps> = ({ features }) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-rental-900 dark:text-rental-100">
        {t("vehicleFeatures")}
      </h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center">
            <Check className="w-5 h-5 text-green-500 mr-2" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleFeatures;
