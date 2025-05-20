
export interface Vehicle {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  image: string;
  gallery: string[];
  seats: number;
  location: string;
  rating: number;
  reviewCount: number;
  available: boolean;
  features: string[];
  transmission: string;
  fuelType: string;
  year: number;
  brand: string;
  mileage: string;
  acceleration: string;
  range: string;
  reviews: Review[];
  similarVehicles: string[];
}

export interface Review {
  id: string;
  user: string;
  avatar: string;
  date: string;
  rating: number;
  comment: string;
}

export interface SimplifiedVehicle {
  id: string;
  name: string;
  category: string;
  image: string;
  rating: number;
}

// Mock data
export const vehicles: Vehicle[] = [
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
