
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, MapPin, User, Star, Heart, ToggleLeft, ToggleRight } from "lucide-react";
import { Link } from "react-router-dom";

interface CarCardProps {
  car: {
    id: string;
    name: string;
    category: string;
    price: number;
    image: string;
    seats: number;
    location: string;
    rating: number;
    available: boolean;
    features?: string[];
    transmission?: string;
    fuelType?: string;
    year?: number;
    brand?: string;
  };
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  onToggleAvailability?: () => void;
}

const CarCard = ({ car, isFavorite = false, onToggleFavorite, onToggleAvailability }: CarCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isAdmin = localStorage.getItem('userRole') === 'admin'; // Simple check for admin role

  return (
    <motion.div 
      className="car-card relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={car.image}
          alt={car.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-0 right-0 bg-rental-600 text-white px-3 py-1 text-sm font-bold">
          {car.category}
        </div>
        {!car.available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <p className="text-white font-bold text-xl">Indisponible</p>
          </div>
        )}
        <button
          onClick={onToggleFavorite}
          className={`absolute top-2 left-2 p-2 rounded-full bg-white/80 backdrop-blur-sm transition-colors ${
            isFavorite ? 'text-red-500' : 'text-gray-400'
          }`}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500' : ''}`} />
        </button>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white">{car.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm font-medium dark:text-gray-300">{car.rating}</span>
          </div>
        </div>
        
        <div className="mt-2 space-y-2">
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <User className="w-4 h-4 mr-2" />
            <span>{car.seats} sièges</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{car.location}</span>
          </div>
          {car.features && car.features.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-1">
              {car.features.slice(0, 2).map((feature, index) => (
                <span 
                  key={index} 
                  className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2 py-0.5 rounded"
                >
                  {feature}
                </span>
              ))}
              {car.features.length > 2 && (
                <span className="inline-block bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs px-2 py-0.5 rounded">
                  +{car.features.length - 2}
                </span>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-rental-700 dark:text-rental-400">{car.price}€</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">/jour</span>
          </div>
          <Link to={`/reservations?carId=${car.id}`}>
            <Button 
              disabled={!car.available} 
              className={`${!car.available ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : 'bg-rental-600 hover:bg-rental-700 dark:bg-rental-500 dark:hover:bg-rental-600'}`}
            >
              {car.available ? "Réserver" : "Indisponible"}
            </Button>
          </Link>
        </div>
        
        {isAdmin && (
          <div className="mt-3 flex items-center justify-between border-t pt-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">Disponibilité:</span>
            <button
              onClick={onToggleAvailability}
              className="flex items-center text-sm font-medium"
            >
              {car.available ? (
                <>
                  <ToggleRight className="w-5 h-5 text-green-500 mr-1" />
                  <span className="text-green-600">Disponible</span>
                </>
              ) : (
                <>
                  <ToggleLeft className="w-5 h-5 text-gray-500 mr-1" />
                  <span className="text-gray-600">Indisponible</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
      
      {/* Quick action popup on hover */}
      <motion.div 
        className="absolute -bottom-10 inset-x-0 bg-white dark:bg-gray-800 shadow-lg rounded-b-xl z-20 p-3 border-t dark:border-gray-700"
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Calendar className="w-4 h-4 mr-1" /> Détails
          </Button>
          <Link to={`/reservations?carId=${car.id}`} className="flex-1">
            <Button 
              size="sm" 
              className="w-full bg-rental-600 hover:bg-rental-700 dark:bg-rental-500 dark:hover:bg-rental-600"
              disabled={!car.available}
            >
              Réserver
            </Button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CarCard;
