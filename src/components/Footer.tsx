
import { Link } from "react-router-dom";
import { Car, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-rental-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Car className="h-8 w-8 text-rental-400 mr-2" />
              <span className="text-2xl font-bold">CarRental<span className="text-rental-400">Pro</span></span>
            </div>
            <p className="text-gray-400 mb-6">
              Votre partenaire de confiance pour la location de véhicules de qualité supérieure. Notre mission est de vous offrir la meilleure expérience de location possible.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-rental-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rental-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rental-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-rental-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-rental-400 transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/voitures" className="text-gray-400 hover:text-rental-400 transition-colors">Nos Véhicules</Link>
              </li>
              <li>
                <Link to="/reservations" className="text-gray-400 hover:text-rental-400 transition-colors">Réservations</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-rental-400 transition-colors">Contact</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-rental-400 transition-colors">FAQ</Link>
              </li>
              <li>
                <Link to="/conditions" className="text-gray-400 hover:text-rental-400 transition-colors">Conditions Générales</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/voitures?category=berline" className="text-gray-400 hover:text-rental-400 transition-colors">Berlines</Link>
              </li>
              <li>
                <Link to="/voitures?category=suv" className="text-gray-400 hover:text-rental-400 transition-colors">SUVs</Link>
              </li>
              <li>
                <Link to="/voitures?category=electrique" className="text-gray-400 hover:text-rental-400 transition-colors">Électriques</Link>
              </li>
              <li>
                <Link to="/voitures?category=luxe" className="text-gray-400 hover:text-rental-400 transition-colors">Voitures de Luxe</Link>
              </li>
              <li>
                <Link to="/voitures?category=economique" className="text-gray-400 hover:text-rental-400 transition-colors">Économiques</Link>
              </li>
              <li>
                <Link to="/voitures?category=utilitaire" className="text-gray-400 hover:text-rental-400 transition-colors">Utilitaires</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-rental-400 mr-2 mt-1" />
                <span className="text-gray-400">123 Avenue de la République<br />75011 Paris, France</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-rental-400 mr-2" />
                <span className="text-gray-400">+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-rental-400 mr-2" />
                <a href="mailto:contact@carrentalpro.fr" className="text-gray-400 hover:text-rental-400 transition-colors">contact@carrentalpro.fr</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} CarRentalPro. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <Link to="/confidentialite" className="text-gray-500 hover:text-rental-400 transition-colors">Politique de confidentialité</Link>
              <Link to="/conditions" className="text-gray-500 hover:text-rental-400 transition-colors">Conditions d'utilisation</Link>
              <Link to="/cookies" className="text-gray-500 hover:text-rental-400 transition-colors">Gestion des cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
