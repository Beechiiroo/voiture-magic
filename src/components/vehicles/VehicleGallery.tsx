
import React from "react";

interface VehicleGalleryProps {
  gallery: string[];
  name: string;
}

const VehicleGallery: React.FC<VehicleGalleryProps> = ({ gallery, name }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <div className="md:col-span-2">
        <img 
          src={gallery[0]} 
          alt={name} 
          className="w-full h-96 object-cover rounded-lg shadow-md" 
        />
      </div>
      <div className="grid grid-rows-2 gap-4">
        <img 
          src={gallery[1]} 
          alt={`${name} - Interior`} 
          className="w-full h-full object-cover rounded-lg shadow-md" 
        />
        <img 
          src={gallery[2]} 
          alt={`${name} - Detail`} 
          className="w-full h-full object-cover rounded-lg shadow-md" 
        />
      </div>
    </div>
  );
};

export default VehicleGallery;
