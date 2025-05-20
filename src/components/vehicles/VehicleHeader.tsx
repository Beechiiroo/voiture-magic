
import React from "react";
import { Heart, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";

interface VehicleHeaderProps {
  name: string;
  rating: number;
  reviewCount: number;
  location: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const VehicleHeader: React.FC<VehicleHeaderProps> = ({
  name,
  rating,
  reviewCount,
  location,
  isFavorite,
  onToggleFavorite
}) => {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-rental-900 dark:text-rental-100">
            {name}
          </h1>
          <div className="flex items-center mt-2 space-x-4">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" />
              <span className="font-medium">{rating}</span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                ({reviewCount} {t("reviews")})
              </span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-rental-600 mr-1" />
              <span>{location}</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button
            variant="outline"
            className={`flex items-center ${
              isFavorite ? "text-pink-600 border-pink-600" : "text-gray-500 border-gray-300"
            }`}
            onClick={onToggleFavorite}
          >
            <Heart className={`mr-2 h-5 w-5 ${isFavorite ? "fill-pink-600" : ""}`} />
            {isFavorite ? t("removeFromFavorites") : t("addToFavorites")}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default VehicleHeader;
