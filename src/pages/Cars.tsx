
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronUp, 
  Filter, 
  Star, 
  Heart, 
  SortAsc, 
  SortDesc, 
  X, 
  Check 
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarCard from "@/components/CarCard";

// Types
type Car = {
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

// Liste étendue des voitures
const carsData: Car[] = [
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
    location: "Lyon",
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
    location: "Marseille",
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
    location: "Nice",
    rating: 4.6,
    available: true,
    features: ["Toit ouvrant", "Sièges chauffants", "GPS"],
    transmission: "Automatique",
    fuelType: "Essence",
    year: 2022,
    brand: "Audi"
  },
  {
    id: "5",
    name: "Peugeot 208",
    category: "Compacte",
    price: 45,
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    location: "Paris",
    rating: 4.5,
    available: true,
    features: ["Bluetooth", "Climatisation", "Écran tactile"],
    transmission: "Manuelle",
    fuelType: "Essence",
    year: 2021,
    brand: "Peugeot"
  },
  {
    id: "6",
    name: "Renault ZOE",
    category: "Électrique",
    price: 55,
    image: "https://images.unsplash.com/photo-1654019317327-99503cfb06f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    location: "Lyon",
    rating: 4.4,
    available: true,
    features: ["Autonomie 300km", "GPS", "Écran tactile"],
    transmission: "Automatique",
    fuelType: "Électrique",
    year: 2022,
    brand: "Renault"
  },
  {
    id: "7",
    name: "Range Rover Evoque",
    category: "SUV",
    price: 130,
    image: "https://images.unsplash.com/photo-1605500503264-27d5689af6fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    location: "Cannes",
    rating: 4.9,
    available: true,
    features: ["4x4", "Cuir", "Toit panoramique"],
    transmission: "Automatique",
    fuelType: "Diesel",
    year: 2023,
    brand: "Land Rover"
  },
  {
    id: "8",
    name: "Porsche 911",
    category: "Sport",
    price: 220,
    image: "https://images.unsplash.com/photo-1619019911237-3aadcb5d9f9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 2,
    location: "Nice",
    rating: 5.0,
    available: true,
    features: ["Toit ouvrant", "Sièges sport", "Mode Sport+"],
    transmission: "Automatique",
    fuelType: "Essence",
    year: 2023,
    brand: "Porsche"
  },
  {
    id: "9",
    name: "Volkswagen Golf",
    category: "Compacte",
    price: 50,
    image: "https://images.unsplash.com/photo-1609520505218-7421a0e84700?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    location: "Bordeaux",
    rating: 4.3,
    available: true,
    features: ["Bluetooth", "GPS", "Régulateur de vitesse"],
    transmission: "Manuelle",
    fuelType: "Diesel",
    year: 2021,
    brand: "Volkswagen"
  },
  {
    id: "10",
    name: "Mercedes Classe S",
    category: "Luxe",
    price: 180,
    image: "https://images.unsplash.com/photo-1626668893632-6f3a4466d427?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    location: "Paris",
    rating: 4.9,
    available: true,
    features: ["Massage des sièges", "Système audio premium", "Conduite semi-autonome"],
    transmission: "Automatique",
    fuelType: "Hybride",
    year: 2023,
    brand: "Mercedes"
  },
  {
    id: "11",
    name: "Fiat 500",
    category: "Citadine",
    price: 35,
    image: "https://images.unsplash.com/photo-1588636142475-a62d56692870?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 4,
    location: "Marseille",
    rating: 4.2,
    available: true,
    features: ["Bluetooth", "Toit ouvrant", "Caméra de recul"],
    transmission: "Manuelle",
    fuelType: "Essence",
    year: 2020,
    brand: "Fiat"
  },
  {
    id: "12",
    name: "Toyota RAV4",
    category: "SUV",
    price: 85,
    image: "https://images.unsplash.com/photo-1581540222194-0def2dda95b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    seats: 5,
    location: "Toulouse",
    rating: 4.5,
    available: true,
    features: ["4x4", "Caméra de recul", "GPS intégré"],
    transmission: "Automatique",
    fuelType: "Hybride",
    year: 2022,
    brand: "Toyota"
  }
];

// Catégories disponibles
const categories = ["Tous", "Berline", "SUV", "Électrique", "Sport", "Compacte", "Citadine", "Luxe"];

// Marques disponibles
const brands = ["Tous", "Audi", "BMW", "Fiat", "Land Rover", "Mercedes", "Peugeot", "Porsche", "Renault", "Tesla", "Toyota", "Volkswagen"];

// Types de carburant
const fuelTypes = ["Tous", "Essence", "Diesel", "Électrique", "Hybride"];

const Cars = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "Tous";
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState([0, 250]);
  const [minRating, setMinRating] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCars, setVisibleCars] = useState<Car[]>(carsData);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null);
  const [sortBy, setSortBy] = useState<"price" | "rating">("price");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFuelTypes, setSelectedFuelTypes] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  
  const filtersRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Appliquer les filtres
    let filtered = [...carsData];
    
    // Filtrer par catégorie
    if (activeCategory !== "Tous") {
      filtered = filtered.filter(car => car.category === activeCategory);
    }
    
    // Filtrer par prix
    filtered = filtered.filter(car => car.price >= priceRange[0] && car.price <= priceRange[1]);
    
    // Filtrer par évaluation minimale
    if (minRating > 0) {
      filtered = filtered.filter(car => car.rating >= minRating);
    }
    
    // Filtrer par recherche
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(car => 
        car.name.toLowerCase().includes(term) || 
        car.category.toLowerCase().includes(term) ||
        car.brand?.toLowerCase().includes(term)
      );
    }
    
    // Filtrer par disponibilité
    if (onlyAvailable) {
      filtered = filtered.filter(car => car.available);
    }
    
    // Filtrer par types de carburant
    if (selectedFuelTypes.length > 0) {
      filtered = filtered.filter(car => selectedFuelTypes.includes(car.fuelType || ""));
    }
    
    // Filtrer par marques
    if (selectedBrands.length > 0) {
      filtered = filtered.filter(car => selectedBrands.includes(car.brand || ""));
    }
    
    // Filtrer par favoris
    if (showFavorites) {
      filtered = filtered.filter(car => favorites.includes(car.id));
    }
    
    // Trier les résultats
    if (sortOrder) {
      filtered = [...filtered].sort((a, b) => {
        if (sortBy === "price") {
          return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
        } else {
          return sortOrder === "asc" ? a.rating - b.rating : b.rating - a.rating;
        }
      });
    }
    
    setVisibleCars(filtered);
    
    // Mettre à jour l'URL
    setSearchParams({ category: activeCategory });
  }, [
    activeCategory, 
    priceRange, 
    minRating, 
    searchTerm, 
    favorites, 
    sortOrder, 
    sortBy, 
    onlyAvailable, 
    selectedFuelTypes, 
    selectedBrands, 
    showFavorites
  ]);
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };
  
  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        toast({
          title: "Retiré des favoris",
          description: "Le véhicule a été retiré de vos favoris",
        });
        return prev.filter(carId => carId !== id);
      } else {
        toast({
          title: "Ajouté aux favoris",
          description: "Le véhicule a été ajouté à vos favoris",
        });
        return [...prev, id];
      }
    });
  };
  
  const handleSort = (by: "price" | "rating") => {
    if (sortBy !== by) {
      setSortBy(by);
      setSortOrder("asc");
    } else {
      setSortOrder(prev => {
        if (prev === null) return "asc";
        if (prev === "asc") return "desc";
        return null;
      });
    }
  };
  
  const toggleFuelType = (type: string) => {
    setSelectedFuelTypes(prev => {
      if (prev.includes(type)) {
        return prev.filter(t => t !== type);
      } else {
        return [...prev, type];
      }
    });
  };
  
  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };
  
  const clearFilters = () => {
    setActiveCategory("Tous");
    setPriceRange([0, 250]);
    setMinRating(0);
    setSearchTerm("");
    setSelectedFuelTypes([]);
    setSelectedBrands([]);
    setOnlyAvailable(false);
    setSortOrder(null);
    setSortBy("price");
    setShowFavorites(false);
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="bg-rental-600 py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.h1 
            className="text-4xl font-bold text-white mb-4 font-heading"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nos Véhicules
          </motion.h1>
          <motion.p 
            className="text-xl text-rental-100 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Découvrez notre flotte de véhicules premium pour tous vos besoins
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-wrap items-center justify-between mb-8 gap-4">
          <div className="relative w-full md:w-80">
            <Input
              type="text"
              placeholder="Rechercher une voiture..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 py-2 border rounded-lg w-full"
            />
            {searchTerm && (
              <button 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => setSearchTerm("")}
              >
                <X size={16} />
              </button>
            )}
          </div>
          
          <div className="flex space-x-2 items-center flex-wrap gap-2">
            <Button
              variant="outline"
              className={`flex items-center gap-1 ${showFavorites ? 'bg-red-50 text-red-500 border-red-200' : ''}`}
              onClick={() => setShowFavorites(!showFavorites)}
            >
              <Heart className={`h-4 w-4 ${showFavorites ? 'fill-red-500 text-red-500' : ''}`} />
              Favoris {favorites.length > 0 && `(${favorites.length})`}
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => handleSort("price")}
            >
              Prix
              {sortBy === "price" && sortOrder === "asc" && <SortAsc className="h-4 w-4" />}
              {sortBy === "price" && sortOrder === "desc" && <SortDesc className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="outline"
              className="flex items-center gap-1"
              onClick={() => handleSort("rating")}
            >
              Note
              {sortBy === "rating" && sortOrder === "asc" && <SortAsc className="h-4 w-4" />}
              {sortBy === "rating" && sortOrder === "desc" && <SortDesc className="h-4 w-4" />}
            </Button>
            
            <Button
              variant="outline"
              className={`flex items-center gap-1 md:hidden ${showFilters ? "bg-rental-50 text-rental-600" : ""}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4" />
              Filtres
              {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar de filtres (mobile) */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                ref={filtersRef}
                className="md:hidden bg-white rounded-xl shadow-lg p-6 mb-6 w-full"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Filtres</h3>
                  <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Contenu des filtres mobile */}
                <div className="space-y-6">
                  {/* ... mêmes filtres que la sidebar desktop ... */}
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Catégories</h3>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((category) => (
                        <Button
                          key={category}
                          onClick={() => handleCategoryChange(category)}
                          variant={activeCategory === category ? "default" : "outline"}
                          size="sm"
                          className={`rounded-full ${
                            activeCategory === category ? "bg-rental-600 text-white" : ""
                          }`}
                        >
                          {category}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold">Prix / jour</h3>
                      <div className="text-sm font-medium">
                        {priceRange[0]}€ - {priceRange[1]}€
                      </div>
                    </div>
                    <Slider
                      defaultValue={[0, 250]}
                      min={0}
                      max={250}
                      step={5}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-6"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold">Note minimum</h3>
                      <div className="flex items-center text-sm font-medium">
                        {minRating} <Star className="w-4 h-4 text-yellow-500 ml-1" />
                      </div>
                    </div>
                    <Slider
                      defaultValue={[0]}
                      min={0}
                      max={5}
                      step={0.1}
                      value={[minRating]}
                      onValueChange={(value) => setMinRating(value[0])}
                      className="mb-6"
                    />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Type de carburant</h3>
                    <div className="space-y-2">
                      {fuelTypes.filter(type => type !== "Tous").map((type) => (
                        <div key={type} className="flex items-center">
                          <button
                            className={`flex items-center justify-center w-5 h-5 rounded-sm mr-2 ${
                              selectedFuelTypes.includes(type) 
                                ? 'bg-rental-600 text-white' 
                                : 'border border-gray-300'
                            }`}
                            onClick={() => toggleFuelType(type)}
                          >
                            {selectedFuelTypes.includes(type) && <Check size={12} />}
                          </button>
                          <label className="text-sm">{type}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Marques</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {brands.filter(brand => brand !== "Tous").map((brand) => (
                        <div key={brand} className="flex items-center">
                          <button
                            className={`flex items-center justify-center w-5 h-5 rounded-sm mr-2 ${
                              selectedBrands.includes(brand) 
                                ? 'bg-rental-600 text-white' 
                                : 'border border-gray-300'
                            }`}
                            onClick={() => toggleBrand(brand)}
                          >
                            {selectedBrands.includes(brand) && <Check size={12} />}
                          </button>
                          <label className="text-sm">{brand}</label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center space-x-2 pt-2">
                      <Switch
                        checked={onlyAvailable}
                        onCheckedChange={setOnlyAvailable}
                        id="available-mode-mobile"
                      />
                      <label htmlFor="available-mode-mobile" className="text-sm font-medium">
                        Seulement disponibles
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button variant="outline" className="w-full" onClick={clearFilters}>
                      Réinitialiser les filtres
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sidebar de filtres (desktop) */}
          <div className="hidden md:block w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-6">Filtres</h3>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Catégories</h3>
                  <div className="flex flex-col space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleCategoryChange(category)}
                        className={`text-left px-3 py-1.5 rounded-md transition ${
                          activeCategory === category 
                            ? "bg-rental-50 text-rental-600 font-medium" 
                            : "hover:bg-gray-100"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold">Prix / jour</h3>
                    <div className="text-sm font-medium">
                      {priceRange[0]}€ - {priceRange[1]}€
                    </div>
                  </div>
                  <Slider
                    defaultValue={[0, 250]}
                    min={0}
                    max={250}
                    step={5}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-6"
                  />
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-semibold">Note minimum</h3>
                    <div className="flex items-center text-sm font-medium">
                      {minRating} <Star className="w-4 h-4 text-yellow-500 ml-1" />
                    </div>
                  </div>
                  <Slider
                    defaultValue={[0]}
                    min={0}
                    max={5}
                    step={0.1}
                    value={[minRating]}
                    onValueChange={(value) => setMinRating(value[0])}
                    className="mb-6"
                  />
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-3">Type de carburant</h3>
                  <div className="space-y-2">
                    {fuelTypes.filter(type => type !== "Tous").map((type) => (
                      <div key={type} className="flex items-center">
                        <button
                          className={`flex items-center justify-center w-5 h-5 rounded-sm mr-2 ${
                            selectedFuelTypes.includes(type) 
                              ? 'bg-rental-600 text-white' 
                              : 'border border-gray-300'
                          }`}
                          onClick={() => toggleFuelType(type)}
                        >
                          {selectedFuelTypes.includes(type) && <Check size={12} />}
                        </button>
                        <label className="text-sm">{type}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-3">Marques</h3>
                  <div className="space-y-2">
                    {brands.filter(brand => brand !== "Tous").map((brand) => (
                      <div key={brand} className="flex items-center">
                        <button
                          className={`flex items-center justify-center w-5 h-5 rounded-sm mr-2 ${
                            selectedBrands.includes(brand) 
                              ? 'bg-rental-600 text-white' 
                              : 'border border-gray-300'
                          }`}
                          onClick={() => toggleBrand(brand)}
                        >
                          {selectedBrands.includes(brand) && <Check size={12} />}
                        </button>
                        <label className="text-sm">{brand}</label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={onlyAvailable}
                      onCheckedChange={setOnlyAvailable}
                      id="available-mode"
                    />
                    <label htmlFor="available-mode" className="text-sm font-medium">
                      Seulement disponibles
                    </label>
                  </div>
                </div>
                
                <div className="border-t pt-6">
                  <Button variant="outline" className="w-full" onClick={clearFilters}>
                    Réinitialiser les filtres
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Liste des voitures */}
          <div className="flex-1">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="wait">
                {visibleCars.length > 0 ? (
                  visibleCars.map((car) => (
                    <motion.div
                      key={car.id}
                      variants={itemVariants}
                      layout
                      className="relative"
                    >
                      <button
                        className={`absolute top-4 right-4 z-10 bg-white p-1.5 rounded-full shadow-md ${
                          favorites.includes(car.id) ? 'text-red-500' : 'text-gray-400'
                        }`}
                        onClick={() => toggleFavorite(car.id)}
                      >
                        <Heart className={favorites.includes(car.id) ? 'fill-red-500' : ''} size={18} />
                      </button>
                      <CarCard car={car} />
                    </motion.div>
                  ))
                ) : (
                  <motion.div 
                    className="col-span-full text-center py-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 12h2m-12-4.5v-2a2 2 0 00-2-2h-1a2 2 0 00-2 2v2m0 4v10a2 2 0 002 2h10a2 2 0 002-2v-10M8 16.5h8" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun véhicule trouvé</h3>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto">
                      Aucun véhicule ne correspond à vos critères de recherche. Essayez d'ajuster vos filtres.
                    </p>
                    <Button 
                      variant="outline" 
                      className="border-rental-600 text-rental-600 hover:bg-rental-600 hover:text-white"
                      onClick={clearFilters}
                    >
                      Réinitialiser les filtres
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            
            {visibleCars.length > 0 && (
              <div className="mt-12 text-center">
                <Button variant="outline" className="border-rental-600 text-rental-600 hover:bg-rental-600 hover:text-white">
                  Voir plus de véhicules
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cars;
