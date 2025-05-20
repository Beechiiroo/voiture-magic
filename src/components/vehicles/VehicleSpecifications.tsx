
import React from "react";
import { Car, Users } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

interface VehicleSpecificationsProps {
  description: string;
  year: number;
  seats: number;
  acceleration: string;
  fuelType: string;
  mileage: string;
  transmission: string;
}

const VehicleSpecifications: React.FC<VehicleSpecificationsProps> = ({
  description,
  year,
  seats,
  acceleration,
  fuelType,
  mileage,
  transmission
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
      <h2 className="text-2xl font-bold mb-4 text-rental-900 dark:text-rental-100">
        {t("vehicleSpecifications")}
      </h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        {description}
      </p>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="flex items-center">
          <Car className="w-5 h-5 text-rental-600 mr-3" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t("year")}</p>
            <p className="font-medium">{year}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Users className="w-5 h-5 text-rental-600 mr-3" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t("seatsAvailable")}</p>
            <p className="font-medium">{seats}</p>
          </div>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 text-rental-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t("acceleration")}</p>
            <p className="font-medium">{acceleration}</p>
          </div>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 text-rental-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t("fuelType")}</p>
            <p className="font-medium">{fuelType}</p>
          </div>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 text-rental-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t("mileage")}</p>
            <p className="font-medium">{mileage}</p>
          </div>
        </div>
        <div className="flex items-center">
          <svg className="w-5 h-5 text-rental-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{t("transmission")}</p>
            <p className="font-medium">{transmission}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecifications;
