
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "@/hooks/use-toast";
import CarCard from "./CarCard";
import { useTranslation } from "@/hooks/use-translation";

// Updated car data with Tunisian cities
const cars = [
  {
    id: "1",
    name: "Tesla Model S",
    category: "Électrique",
    price: 120,
    image: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    location: "Tunis",
    rating: 4.9,
    available: true,
    features: ["Autopilot", "Caméra 360°", "Supercharging"],
    transmission: "Automatique",
    fuelType: "Électrique",
    year: 2023,
    brand: "Tesla"
  },
  {
    id: "2",
    name: "BMW Serie 5",
    category: "Berline",
    price: 95,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    location: "Sfax",
    rating: 4.7,
    available: true,
    features: ["GPS", "Sièges chauffants", "Bluetooth"],
    transmission: "Automatique",
    fuelType: "Essence",
    year: 2022,
    brand: "BMW"
  },
  {
    id: "3",
    name: "Mercedes GLC",
    category: "SUV",
    price: 110,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    location: "Sousse",
    rating: 4.8,
    available: false,
    features: ["Caméra 360°", "Toit panoramique", "Sièges en cuir"],
    transmission: "Automatique",
    fuelType: "Diesel",
    year: 2023,
    brand: "Mercedes"
  },
  {
    id: "4",
    name: "Audi A6",
    category: "Berline",
    price: 105,
    image: "https://images.unsplash.com/photo-1540066019607-e5f69323a8dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    location: "Hammamet",
    rating: 4.6,
    available: true,
    features: ["Toit ouvrant", "Sièges chauffants", "GPS"],
    transmission: "Automatique",
    fuelType: "Essence",
    year: 2022,
    brand: "Audi"
  },
];

// Categories for filtering
const categories = ["Tous", "Berline", "SUV", "Électrique", "Sport"];

const FeaturedCars = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [visibleCars, setVisibleCars] = useState(cars);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    // Load favorites from localStorage if available
    const storedFavorites = localStorage.getItem('carFavorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === "Tous") {
      setVisibleCars(cars);
    } else {
      setVisibleCars(cars.filter(car => car.category === category));
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id) 
        ? prev.filter(carId => carId !== id)
        : [...prev, id];
      
      // Save to localStorage
      localStorage.setItem('carFavorites', JSON.stringify(newFavorites));
      
      // Show toast notification
      toast({
        title: prev.includes(id) ? t("removedFromFavorites") : t("addedToFavorites"),
        description: prev.includes(id) 
          ? t("removedFromFavoritesDescription") 
          : t("addedToFavoritesDescription"),
        variant: prev.includes(id) ? "default" : "success",
      });
      
      return newFavorites;
    });
  };

  const toggleAvailability = (id: string) => {
    const updatedCars = cars.map(car => {
      if (car.id === id) {
        return { ...car, available: !car.available };
      }
      return car;
    });
    
    // Update the visible cars based on the current category
    if (activeCategory === "Tous") {
      setVisibleCars(updatedCars);
    } else {
      setVisibleCars(updatedCars.filter(car => car.category === activeCategory));
    }
    
    // Show toast notification
    const car = cars.find(car => car.id === id);
    if (car) {
      toast({
        title: t("availabilityUpdated"),
        description: car.available 
          ? t("vehicleNowUnavailable", { car: car.name })
          : t("vehicleNowAvailable", { car: car.name }),
        variant: "success",
      });
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold mb-4 text-rental-900 dark:text-rental-100 font-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {t("ourPremiumVehicles")} <span className="text-rental-600">{t("premium")}</span>
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("featuredCarsDescription")}
          </motion.p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="bg-white dark:bg-gray-800 rounded-full shadow-md p-1 flex overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => handleCategoryChange(category)}
                variant={activeCategory === category ? "default" : "ghost"}
                className={`rounded-full px-6 ${
                  activeCategory === category ? "bg-rental-600 text-white" : "text-gray-700 dark:text-gray-300"
                }`}
              >
                {t(category.toLowerCase())}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleCars.map((car) => (
            <div key={car.id}>
              <Link to={`/voitures/${car.id}`} className="block">
                <CarCard 
                  car={car} 
                  isFavorite={favorites.includes(car.id)}
                  onToggleFavorite={() => toggleFavorite(car.id)}
                  onToggleAvailability={() => toggleAvailability(car.id)}
                />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/voitures">
            <Button variant="outline" className="border-rental-600 text-rental-600 hover:bg-rental-600 hover:text-white">
              {t("viewAllVehicles")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
