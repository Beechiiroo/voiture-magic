
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Car, Menu, X, User } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4 fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Car className="h-6 w-6 text-rental-600" />
              <span className="text-xl font-bold text-rental-800">CarRental<span className="text-rental-600">Pro</span></span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-700 hover:text-rental-600 transition-colors font-medium">
              Accueil
            </Link>
            <Link to="/voitures" className="text-gray-700 hover:text-rental-600 transition-colors font-medium">
              Nos Véhicules
            </Link>
            <Link to="/reservations" className="text-gray-700 hover:text-rental-600 transition-colors font-medium">
              Réservations
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-rental-600 transition-colors font-medium">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" size="sm" className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Connexion
            </Button>
            <Button className="bg-rental-600 hover:bg-rental-700">S'inscrire</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-gray-600 hover:text-rental-600 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden animate-fade-in">
            <div className="pt-4 pb-3 space-y-3">
              <Link
                to="/"
                className="block text-gray-700 hover:bg-rental-50 hover:text-rental-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                to="/voitures"
                className="block text-gray-700 hover:bg-rental-50 hover:text-rental-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Nos Véhicules
              </Link>
              <Link
                to="/reservations"
                className="block text-gray-700 hover:bg-rental-50 hover:text-rental-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Réservations
              </Link>
              <Link
                to="/contact"
                className="block text-gray-700 hover:bg-rental-50 hover:text-rental-600 px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="pt-4 flex flex-col space-y-2">
                <Button variant="outline" size="sm" className="flex items-center justify-center">
                  <User className="h-4 w-4 mr-2" />
                  Connexion
                </Button>
                <Button className="bg-rental-600 hover:bg-rental-700">S'inscrire</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
