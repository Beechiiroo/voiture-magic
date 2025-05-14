
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Car, Calendar, Clock } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-rental-800 to-rental-900 min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-car-pattern opacity-5"></div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <motion.div 
            className="lg:w-1/2 text-white"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-heading">
              Location de Voitures <span className="text-rental-300">Professionnelle</span>
            </h1>
            <p className="text-xl mb-8 text-gray-100 max-w-lg">
              Découvrez notre flotte de véhicules de qualité supérieure pour tous vos besoins de déplacement.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-rental-500 hover:bg-rental-600 text-white px-8 py-6 rounded-full text-lg shadow-lg transition-all duration-300 hover:shadow-xl">
                Réserver maintenant
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/20 px-8 py-6 rounded-full text-lg">
                Voir nos véhicules
              </Button>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-8">
              <div className="flex items-center">
                <div className="bg-rental-500/20 p-3 rounded-full">
                  <Car className="h-6 w-6 text-rental-300" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold">Grande sélection</h3>
                  <p className="text-sm text-gray-300">Plus de 100 modèles</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-rental-500/20 p-3 rounded-full">
                  <Calendar className="h-6 w-6 text-rental-300" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold">Réservation flexible</h3>
                  <p className="text-sm text-gray-300">Annulation gratuite</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="bg-rental-500/20 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-rental-300" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold">Support 24/7</h3>
                  <p className="text-sm text-gray-300">À votre service</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="lg:w-1/2 mt-10 lg:mt-0"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Luxury car rental" 
                className="rounded-xl shadow-2xl object-cover w-full h-[400px]"
              />
              <div className="absolute -bottom-6 -right-6 bg-rental-500 text-white p-4 rounded-xl shadow-lg">
                <p className="text-sm font-bold">Nouveau!</p>
                <p className="text-xl font-bold">À partir de 39€/jour</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
