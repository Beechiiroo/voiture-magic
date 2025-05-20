
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useTranslation } from "@/hooks/use-translation";

interface SimilarVehicle {
  id: string;
  name: string;
  image: string;
  rating: number;
  category: string;
}

interface SimilarVehiclesProps {
  vehicles: SimilarVehicle[];
}

const SimilarVehicles: React.FC<SimilarVehiclesProps> = ({ vehicles }) => {
  const { t } = useTranslation();
  
  if (vehicles.length === 0) return null;
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-rental-900 dark:text-rental-100">
        {t("similarVehicles")}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vehicles.map((vehicle) => (
          <div 
            key={vehicle.id} 
            className="flex bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <img 
              src={vehicle.image} 
              alt={vehicle.name}
              className="w-32 h-24 object-cover"
            />
            <div className="p-4">
              <h3 className="font-medium mb-1">{vehicle.name}</h3>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
                <span>{vehicle.rating}</span>
                <span className="mx-2">•</span>
                <span>{vehicle.category}</span>
              </div>
              <Button asChild size="sm">
                <Link to={`/voitures/${vehicle.id}`}>
                  {t("viewDetails")}
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarVehicles;
