
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Heart, Check, X, Star, MapPin, Car, Users, Calendar as CalendarIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslation } from "@/hooks/use-translation";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";

// Mock vehicle data
const vehicles = [
  {
    id: "1",
    name: "Tesla Model S",
    category: "Électrique",
    description: "La Tesla Model S est une berline de luxe 100% électrique offrant des performances exceptionnelles et une autonomie impressionnante. Avec son design élégant et ses technologies avancées, elle représente le futur de l'automobile.",
    price: 120,
    image: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590362891991-f776e747a588?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    seats: 5,
    location: "Tunis",
    rating: 4.9,
    reviewCount: 127,
    available: true,
    features: ["Autopilot", "Caméra 360°", "Supercharging", "Wi-Fi", "Bluetooth", "Sièges chauffants", "Toit panoramique"],
    transmission: "Automatique",
    fuelType: "Électrique",
    year: 2023,
    brand: "Tesla",
    mileage: "Illimité",
    acceleration: "3.2s (0-100 km/h)",
    range: "650 km",
    reviews: [
      {
        id: "r1",
        user: "Sophie M.",
        avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Snickers",
        date: "15/03/2024",
        rating: 5,
        comment: "Une expérience de conduite incroyable ! La voiture est puissante, silencieuse et très confortable. L'autopilot est impressionnant sur autoroute."
      },
      {
        id: "r2",
        user: "Thomas L.",
        avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Shadow",
        date: "02/03/2024",
        rating: 4,
        comment: "Très bonne voiture, autonomie légèrement inférieure à ce qui est annoncé mais reste excellente. Service de location parfait."
      }
    ],
    similarVehicles: ["2", "3"]
  },
  {
    id: "2",
    name: "BMW Serie 5",
    category: "Berline",
    description: "La BMW Série 5 incarne l'équilibre parfait entre dynamisme sportif et confort premium. Cette berline élégante offre une expérience de conduite exceptionnelle grâce à ses technologies avancées et son design sophistiqué.",
    price: 95,
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    seats: 5,
    location: "Sfax",
    rating: 4.7,
    reviewCount: 95,
    available: true,
    features: ["GPS", "Sièges chauffants", "Bluetooth", "Caméra de recul", "Régulateur de vitesse adaptatif", "Parking automatique"],
    transmission: "Automatique",
    fuelType: "Essence",
    year: 2022,
    brand: "BMW",
    mileage: "Illimité",
    acceleration: "6.3s (0-100 km/h)",
    range: "700 km",
    reviews: [
      {
        id: "r3",
        user: "Marc D.",
        avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Milo",
        date: "20/03/2024",
        rating: 5,
        comment: "Conduite exceptionnelle, confort remarquable et finitions de haute qualité. Une vraie berline premium qui ne déçoit pas."
      }
    ],
    similarVehicles: ["1", "4"]
  },
  {
    id: "3",
    name: "Mercedes GLC",
    category: "SUV",
    description: "Le Mercedes GLC combine élégance, performance et polyvalence dans un SUV de luxe. Avec son intérieur raffiné et ses technologies de pointe, il offre une expérience de conduite premium sur tous les terrains.",
    price: 110,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1605515298946-d062f2e9f647?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1580059500942-87f0b3b0ae68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    seats: 5,
    location: "Sousse",
    rating: 4.8,
    reviewCount: 112,
    available: false,
    features: ["Caméra 360°", "Toit panoramique", "Sièges en cuir", "Système de son premium", "Navigation", "Assistance au stationnement"],
    transmission: "Automatique",
    fuelType: "Diesel",
    year: 2023,
    brand: "Mercedes",
    mileage: "Illimité",
    acceleration: "7.1s (0-100 km/h)",
    range: "800 km",
    reviews: [
      {
        id: "r4",
        user: "Julien P.",
        avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Willow",
        date: "10/03/2024",
        rating: 5,
        comment: "Un SUV exceptionnel, très confortable et luxueux. Parfait pour les longs trajets comme pour la ville."
      },
      {
        id: "r5",
        user: "Aurélie F.",
        avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Sooty",
        date: "05/02/2024",
        rating: 4,
        comment: "Superbe véhicule, très agréable à conduire. L'intérieur est magnifique et les équipements nombreux."
      }
    ],
    similarVehicles: ["1", "4"]
  },
  {
    id: "4",
    name: "Audi A6",
    category: "Berline",
    description: "L'Audi A6 est une berline premium qui allie design élégant, technologies innovantes et performances dynamiques. Son habitacle spacieux et raffiné ainsi que sa conduite précise en font un choix idéal pour les trajets professionnels comme personnels.",
    price: 105,
    image: "https://images.unsplash.com/photo-1540066019607-e5f69323a8dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540066019607-e5f69323a8dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1606664742716-5241d5554248?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    ],
    seats: 5,
    location: "Hammamet",
    rating: 4.6,
    reviewCount: 89,
    available: true,
    features: ["Toit ouvrant", "Sièges chauffants", "GPS", "Système audio Bang & Olufsen", "Aide au stationnement", "Cockpit virtuel"],
    transmission: "Automatique",
    fuelType: "Essence",
    year: 2022,
    brand: "Audi",
    mileage: "Illimité",
    acceleration: "6.8s (0-100 km/h)",
    range: "750 km",
    reviews: [
      {
        id: "r6",
        user: "Philippe T.",
        avatar: "https://api.dicebear.com/7.x/lorelei/svg?seed=Tigger",
        date: "25/02/2024",
        rating: 4,
        comment: "Excellente berline, confortable et technologique. Parfaite pour les longs trajets en famille."
      }
    ],
    similarVehicles: ["2", "3"]
  }
];

const VehicleDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { user, favorites, toggleFavorite } = useUser();
  
  const vehicle = vehicles.find(v => v.id === id);
  
  if (!vehicle) {
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
  }
  
  const similarVehicles = vehicles.filter(v => vehicle.similarVehicles.includes(v.id));
  const isFavorite = favorites.includes(vehicle.id);
  
  const handleToggleFavorite = () => {
    toggleFavorite(vehicle.id);
    toast({
      title: isFavorite ? t("removedFromFavorites") : t("addedToFavorites"),
      description: isFavorite ? t("removedFromFavoritesDescription") : t("addedToFavoritesDescription"),
      variant: isFavorite ? "default" : "success",
    });
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold text-rental-900 dark:text-rental-100">
                {vehicle.name}
              </h1>
              <div className="flex items-center mt-2 space-x-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" />
                  <span className="font-medium">{vehicle.rating}</span>
                  <span className="text-gray-500 dark:text-gray-400 ml-1">
                    ({vehicle.reviewCount} {t("reviews")})
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 text-rental-600 mr-1" />
                  <span>{vehicle.location}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-3">
              <Button
                variant="outline"
                className={`flex items-center ${
                  isFavorite ? "text-pink-600 border-pink-600" : "text-gray-500 border-gray-300"
                }`}
                onClick={handleToggleFavorite}
              >
                <Heart className={`mr-2 h-5 w-5 ${isFavorite ? "fill-pink-600" : ""}`} />
                {isFavorite ? t("removeFromFavorites") : t("addToFavorites")}
              </Button>
            </div>
          </div>
          
          {/* Vehicle Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="md:col-span-2">
              <img 
                src={vehicle.gallery[0]} 
                alt={vehicle.name} 
                className="w-full h-96 object-cover rounded-lg shadow-md" 
              />
            </div>
            <div className="grid grid-rows-2 gap-4">
              <img 
                src={vehicle.gallery[1]} 
                alt={`${vehicle.name} - Interior`} 
                className="w-full h-full object-cover rounded-lg shadow-md" 
              />
              <img 
                src={vehicle.gallery[2]} 
                alt={`${vehicle.name} - Detail`} 
                className="w-full h-full object-cover rounded-lg shadow-md" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left Column - Vehicle Details */}
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-rental-900 dark:text-rental-100">
                  {t("vehicleSpecifications")}
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {vehicle.description}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Car className="w-5 h-5 text-rental-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t("year")}</p>
                      <p className="font-medium">{vehicle.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-rental-600 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t("seatsAvailable")}</p>
                      <p className="font-medium">{vehicle.seats}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-rental-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t("acceleration")}</p>
                      <p className="font-medium">{vehicle.acceleration}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-rental-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t("fuelType")}</p>
                      <p className="font-medium">{vehicle.fuelType}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-rental-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t("mileage")}</p>
                      <p className="font-medium">{vehicle.mileage}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-rental-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{t("transmission")}</p>
                      <p className="font-medium">{vehicle.transmission}</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Features */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-2xl font-bold mb-4 text-rental-900 dark:text-rental-100">
                  {t("vehicleFeatures")}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3">
                  {vehicle.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Reviews */}
              <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-rental-900 dark:text-rental-100">
                    {t("reviews")} ({vehicle.reviews.length})
                  </h2>
                  
                  {user && (
                    <Button className="bg-rental-600 hover:bg-rental-700">
                      {t("leaveAReview")}
                    </Button>
                  )}
                </div>
                
                {!user && (
                  <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-center">
                    {t("loginToReview")}
                  </div>
                )}
                
                {vehicle.reviews.map((review) => (
                  <div key={review.id} className="mb-6 last:mb-0">
                    <div className="flex items-start">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={review.avatar} alt={review.user} />
                        <AvatarFallback>{review.user.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4 flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{review.user}</p>
                            <div className="flex items-center mt-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${
                                    i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                        </div>
                        <p className="mt-3 text-gray-700 dark:text-gray-300">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Similar Vehicles */}
              {similarVehicles.length > 0 && (
                <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4 text-rental-900 dark:text-rental-100">
                    {t("similarVehicles")}
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {similarVehicles.map((similarVehicle) => (
                      <div 
                        key={similarVehicle.id} 
                        className="flex bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <img 
                          src={similarVehicle.image} 
                          alt={similarVehicle.name}
                          className="w-32 h-24 object-cover"
                        />
                        <div className="p-4">
                          <h3 className="font-medium mb-1">{similarVehicle.name}</h3>
                          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                            <Star className="w-4 h-4 text-yellow-500 mr-1 fill-yellow-500" />
                            <span>{similarVehicle.rating}</span>
                            <span className="mx-2">•</span>
                            <span>{similarVehicle.category}</span>
                          </div>
                          <Button asChild size="sm">
                            <Link to={`/voitures/${similarVehicle.id}`}>
                              {t("viewDetails")}
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Right Column - Booking */}
            <div className="md:order-2">
              <div className="sticky top-24 bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
                <div className="mb-6">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-rental-900 dark:text-rental-100">
                      {vehicle.price}€ <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{t("pricePerDay")}</span>
                    </div>
                    
                    {vehicle.available ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                        {t("available")}
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-1.5"></span>
                        {t("unavailable")}
                      </span>
                    )}
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <h3 className="text-lg font-medium mb-4">{t("selectDates")}</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-1 gap-4">
                    <Calendar
                      mode="range"
                      numberOfMonths={1}
                      className="rounded border dark:border-gray-700"
                      selected={{
                        from: new Date(),
                        to: new Date(new Date().setDate(new Date().getDate() + 3))
                      }}
                      disabled={{ before: new Date() }}
                      classNames={{
                        day_selected: "bg-rental-600 text-white hover:bg-rental-600 hover:text-white",
                        day_today: "bg-rental-50 text-rental-900",
                        day_range_middle: "bg-rental-100 text-rental-900 dark:bg-rental-900 dark:text-rental-100",
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-700 dark:text-gray-300">{t("totalPrice")}</span>
                    <span className="font-bold">360€</span>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h4 className="font-medium mb-3">{t("included")}</h4>
                    <ul className="space-y-2">
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-2" />
                        <span>{t("insurance")}</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-2" />
                        <span>{t("unlimitedMileage")}</span>
                      </li>
                      <li className="flex items-center">
                        <X className="w-5 h-5 text-red-500 mr-2" />
                        <span className="text-gray-500 dark:text-gray-400">{t("additionalDriver")}</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <Button className="w-full bg-rental-600 hover:bg-rental-700" disabled={!vehicle.available}>
                  {vehicle.available ? t("bookThisVehicle") : t("unavailable")}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VehicleDetails;
