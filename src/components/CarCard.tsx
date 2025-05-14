
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, MapPin, User, Star } from "lucide-react";

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
  };
}

const CarCard = ({ car }: CarCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

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
      </div>
      <div className="p-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-gray-800">{car.name}</h3>
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="ml-1 text-sm font-medium">{car.rating}</span>
          </div>
        </div>
        
        <div className="mt-2 space-y-2">
          <div className="flex items-center text-gray-600 text-sm">
            <User className="w-4 h-4 mr-2" />
            <span>{car.seats} sièges</span>
          </div>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{car.location}</span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="text-xl font-bold text-rental-700">{car.price}€</span>
            <span className="text-gray-500 text-sm">/jour</span>
          </div>
          <Button 
            disabled={!car.available} 
            className={`${!car.available ? 'bg-gray-400 hover:bg-gray-400 cursor-not-allowed' : 'bg-rental-600 hover:bg-rental-700'}`}
          >
            {car.available ? "Réserver" : "Indisponible"}
          </Button>
        </div>
      </div>
      
      {/* Quick action popup on hover */}
      <motion.div 
        className="absolute -bottom-10 inset-x-0 bg-white shadow-lg rounded-b-xl z-20 p-3 border-t"
        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
        initial={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Calendar className="w-4 h-4 mr-1" /> Détails
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-rental-600 hover:bg-rental-700"
            disabled={!car.available}
          >
            Réserver
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CarCard;
