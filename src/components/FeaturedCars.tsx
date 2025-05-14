
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import CarCard from "./CarCard";

// Sample car data
const cars = [
  {
    id: "1",
    name: "Tesla Model S",
    category: "Électrique",
    price: 120,
    image: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    location: "Paris",
    rating: 4.9,
    available: true,
  },
  {
    id: "2",
    name: "BMW Serie 5",
    category: "Berline",
    price: 95,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    location: "Lyon",
    rating: 4.7,
    available: true,
  },
  {
    id: "3",
    name: "Mercedes GLC",
    category: "SUV",
    price: 110,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    location: "Marseille",
    rating: 4.8,
    available: false,
  },
  {
    id: "4",
    name: "Audi A6",
    category: "Berline",
    price: 105,
    image: "https://images.unsplash.com/photo-1540066019607-e5f69323a8dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    location: "Nice",
    rating: 4.6,
    available: true,
  },
];

// Categories for filtering
const categories = ["Tous", "Berline", "SUV", "Électrique", "Sport"];

const FeaturedCars = () => {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [visibleCars, setVisibleCars] = useState(cars);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === "Tous") {
      setVisibleCars(cars);
    } else {
      setVisibleCars(cars.filter(car => car.category === category));
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold mb-4 text-rental-900 font-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nos Véhicules <span className="text-rental-600">Premium</span>
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Découvrez notre sélection de véhicules de haute qualité pour tous vos besoins et budgets.
            Nous offrons une large gamme de voitures pour répondre à toutes vos exigences.
          </motion.p>
        </div>

        <div className="mb-8 flex justify-center">
          <div className="bg-white rounded-full shadow-md p-1 flex">
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => handleCategoryChange(category)}
                variant={activeCategory === category ? "default" : "ghost"}
                className={`rounded-full px-6 ${
                  activeCategory === category ? "bg-rental-600 text-white" : "text-gray-700"
                }`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visibleCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" className="border-rental-600 text-rental-600 hover:bg-rental-600 hover:text-white">
            Voir tous les véhicules
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
