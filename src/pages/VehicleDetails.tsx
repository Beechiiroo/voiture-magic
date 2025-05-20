
import React from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useUser } from "@/context/UserContext";
import { toast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";
import { Vehicle, vehicles } from "@/types/vehicle";
import VehicleHeader from "@/components/vehicles/VehicleHeader";
import VehicleGallery from "@/components/vehicles/VehicleGallery";
import VehicleSpecifications from "@/components/vehicles/VehicleSpecifications";
import VehicleFeatures from "@/components/vehicles/VehicleFeatures";
import VehicleReviews from "@/components/vehicles/VehicleReviews";
import SimilarVehicles from "@/components/vehicles/SimilarVehicles";
import BookingCard from "@/components/vehicles/BookingCard";
import NotFoundVehicle from "@/components/vehicles/NotFoundVehicle";

const VehicleDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { user, favorites, toggleFavorite } = useUser();
  
  const vehicle = vehicles.find(v => v.id === id);
  
  if (!vehicle) {
    return <NotFoundVehicle />;
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
        <VehicleHeader
          name={vehicle.name}
          rating={vehicle.rating}
          reviewCount={vehicle.reviewCount}
          location={vehicle.location}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
        
        <VehicleGallery gallery={vehicle.gallery} name={vehicle.name} />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Vehicle Details */}
          <div className="md:col-span-2">
            <VehicleSpecifications
              description={vehicle.description}
              year={vehicle.year}
              seats={vehicle.seats}
              acceleration={vehicle.acceleration}
              fuelType={vehicle.fuelType}
              mileage={vehicle.mileage}
              transmission={vehicle.transmission}
            />
            
            <VehicleFeatures features={vehicle.features} />
            
            <VehicleReviews reviews={vehicle.reviews} user={user} />
            
            {similarVehicles.length > 0 && (
              <SimilarVehicles vehicles={similarVehicles} />
            )}
          </div>
          
          {/* Right Column - Booking */}
          <div className="md:order-2">
            <BookingCard
              price={vehicle.price}
              available={vehicle.available}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VehicleDetails;
