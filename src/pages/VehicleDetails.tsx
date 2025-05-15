
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Phone, User, Car, Lock, MapPin, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useTranslation } from "@/hooks/use-translation";
import { toast } from "@/hooks/use-toast";

// Sample data - in a real app, this would come from an API
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
    brand: "Tesla",
    description: "La Tesla Model S est une berline de luxe entièrement électrique offrant des performances exceptionnelles et une autonomie impressionnante. Elle combine technologie de pointe, confort luxueux et conduite zéro émission."
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
    brand: "BMW",
    description: "La BMW Série 5 représente l'équilibre parfait entre élégance, confort et dynamisme. Cette berline premium offre une expérience de conduite raffinée avec des technologies de pointe et un intérieur luxueux."
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
    brand: "Mercedes",
    description: "Le Mercedes GLC est un SUV de luxe qui se distingue par son confort, sa sécurité et ses finitions haut de gamme. Il offre une conduite souple et un intérieur spacieux parfait pour les longs trajets en famille."
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
    brand: "Audi",
    description: "L'Audi A6 est une berline premium qui allie design élégant et performances avancées. Son intérieur raffiné, ses technologies de pointe et sa conduite dynamique en font un choix privilégié pour les amateurs de voitures haut de gamme."
  }
];

const formSchema = z.object({
  startDate: z.string().min(1, { message: "La date de début est requise" }),
  endDate: z.string().min(1, { message: "La date de fin est requise" }),
  name: z.string().min(3, { message: "Le nom doit contenir au moins 3 caractères" }),
  email: z.string().email({ message: "Adresse email invalide" }),
  phone: z.string(),
});

export default function VehicleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const car = cars.find(car => car.id === id);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startDate: "",
      endDate: "",
      name: "",
      email: "",
      phone: "",
    },
  });
  
  if (!car) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-3xl font-bold mb-4">{t("vehicleNotFound")}</h1>
          <p className="mb-8">{t("vehicleNotFoundDescription")}</p>
          <Button onClick={() => navigate('/voitures')} className="bg-rental-600 hover:bg-rental-700">
            {t("backToCars")}
          </Button>
        </div>
        <Footer />
      </>
    );
  }
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      console.log("Reservation submitted:", values);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: t("reservationSuccess"),
        description: t("reservationSuccessDescription", { car: car.name }),
        variant: "success",
      });
      
      navigate('/reservations');
    } catch (error) {
      toast({
        title: t("reservationError"),
        description: t("reservationErrorDescription"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <AspectRatio ratio={16 / 9}>
                <img 
                  src={car.image} 
                  alt={car.name} 
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h1 className="text-2xl font-bold">{car.name}</h1>
                    <div className="flex items-center mt-1">
                      <span className="text-sm bg-rental-100 dark:bg-rental-900 text-rental-800 dark:text-rental-200 px-2 py-1 rounded-full">
                        {car.category}
                      </span>
                      <span className="mx-2 text-gray-400">•</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {car.year}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-rental-600">{car.price} €<span className="text-sm font-normal text-gray-600 dark:text-gray-400">/jour</span></div>
                    <div className="flex items-center justify-end mt-1">
                      {Array(5).fill(0).map((_, i) => (
                        <svg key={i} className={`w-4 h-4 ${i < Math.floor(car.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">{car.rating}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-700 dark:text-gray-300 mb-6">
                  {car.description}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center">
                    <Car className="w-5 h-5 text-rental-600 mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{car.brand}</span>
                  </div>
                  <div className="flex items-center">
                    <User className="w-5 h-5 text-rental-600 mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{car.seats} {t("seats")}</span>
                  </div>
                  <div className="flex items-center">
                    <Lock className="w-5 h-5 text-rental-600 mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{car.transmission}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-rental-600 mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{car.location}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                  <h3 className="font-bold mb-3">{t("features")}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {car.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="w-4 h-4 text-rental-600 mr-2" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold mb-6">{t("bookNow")}</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("pickupDate")}</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type="date"
                                className="pl-10"
                                min={new Date().toISOString().split('T')[0]}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("returnDate")}</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type="date"
                                className="pl-10"
                                min={form.watch("startDate") || new Date().toISOString().split('T')[0]}
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("fullName")}</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                            <Input
                              {...field}
                              className="pl-10"
                              placeholder={t("enterFullName")}
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("email")}</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="email@example.com"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("phoneNumber")}</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                              <Input
                                {...field}
                                type="tel"
                                className="pl-10"
                                placeholder="+1 234 567 890"
                              />
                            </div>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-700 dark:text-gray-300">{t("rentalPrice")}</span>
                      <span className="font-medium">{car.price} €/jour</span>
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-rental-600 hover:bg-rental-700" 
                      disabled={isSubmitting || !car.available}
                    >
                      {isSubmitting ? t("processing") : car.available ? t("confirmReservation") : t("vehicleUnavailable")}
                    </Button>
                    
                    {!car.available && (
                      <p className="text-center text-red-500 mt-3 text-sm">
                        {t("vehicleUnavailableMessage")}
                      </p>
                    )}
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
