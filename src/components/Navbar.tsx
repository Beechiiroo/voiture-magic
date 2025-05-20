
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Car, Menu, X, User } from "lucide-react";
import ThemeSwitcher from './ThemeSwitcher';
import LanguageSwitcher from './LanguageSwitcher';
import UserMenu from './UserMenu';
import { useUser } from '@/context/UserContext';
import { useTranslation } from '@/hooks/use-translation';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isLoggedIn } = useUser();
  const { t } = useTranslation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className={`bg-white dark:bg-gray-900 py-4 fixed w-full top-0 z-50 transition-all duration-300 ${
      scrolled ? 'shadow-md py-3' : 'shadow-sm'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <Car className="h-6 w-6 text-rental-600 group-hover:scale-110 transition-transform animate-pulse" />
              <span className="text-xl font-bold dark:text-white">
                {t("carRentalPro")}<span className="text-rental-600">Pro</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`transition-colors font-medium border-b-2 py-1 ${
                isActive('/') 
                  ? 'text-rental-600 dark:text-rental-400 border-rental-600 dark:border-rental-400' 
                  : 'text-gray-700 dark:text-gray-300 border-transparent hover:text-rental-600 dark:hover:text-rental-400'
              }`}
            >
              {t('home')}
            </Link>
            <Link 
              to="/voitures" 
              className={`transition-colors font-medium border-b-2 py-1 ${
                isActive('/voitures') 
                  ? 'text-rental-600 dark:text-rental-400 border-rental-600 dark:border-rental-400' 
                  : 'text-gray-700 dark:text-gray-300 border-transparent hover:text-rental-600 dark:hover:text-rental-400'
              }`}
            >
              {t('cars')}
            </Link>
            <Link 
              to="/reservations" 
              className={`transition-colors font-medium border-b-2 py-1 ${
                isActive('/reservations') 
                  ? 'text-rental-600 dark:text-rental-400 border-rental-600 dark:border-rental-400' 
                  : 'text-gray-700 dark:text-gray-300 border-transparent hover:text-rental-600 dark:hover:text-rental-400'
              }`}
            >
              {t('reservations')}
            </Link>
            <Link 
              to="/contact" 
              className={`transition-colors font-medium border-b-2 py-1 ${
                isActive('/contact') 
                  ? 'text-rental-600 dark:text-rental-400 border-rental-600 dark:border-rental-400' 
                  : 'text-gray-700 dark:text-gray-300 border-transparent hover:text-rental-600 dark:hover:text-rental-400'
              }`}
            >
              {t('contact')}
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <ThemeSwitcher />
            <LanguageSwitcher />
            
            {isLoggedIn ? (
              <UserMenu />
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm" className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    {t('login')}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-rental-600 hover:bg-rental-700 dark:bg-rental-500 dark:hover:bg-rental-600">{t('signup')}</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeSwitcher />
            <LanguageSwitcher />
            {isLoggedIn && <UserMenu />}
            <button
              className="text-gray-600 dark:text-gray-300 hover:text-rental-600 dark:hover:text-rental-400 focus:outline-none"
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
          <div className="md:hidden animate-fade-in mt-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700">
            <div className="py-3 space-y-0">
              <Link
                to="/"
                className={`block px-3 py-2.5 ${
                  isActive('/') 
                    ? 'bg-rental-50 dark:bg-rental-900/50 text-rental-600 dark:text-rental-400 font-medium' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('home')}
              </Link>
              <Link
                to="/voitures"
                className={`block px-3 py-2.5 ${
                  isActive('/voitures') 
                    ? 'bg-rental-50 dark:bg-rental-900/50 text-rental-600 dark:text-rental-400 font-medium' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('cars')}
              </Link>
              <Link
                to="/reservations"
                className={`block px-3 py-2.5 ${
                  isActive('/reservations') 
                    ? 'bg-rental-50 dark:bg-rental-900/50 text-rental-600 dark:text-rental-400 font-medium' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('reservations')}
              </Link>
              <Link
                to="/contact"
                className={`block px-3 py-2.5 ${
                  isActive('/contact') 
                    ? 'bg-rental-50 dark:bg-rental-900/50 text-rental-600 dark:text-rental-400 font-medium' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('contact')}
              </Link>
              {!isLoggedIn && (
                <div className="border-t dark:border-gray-700 mt-2 pt-2 flex flex-col space-y-2 p-3">
                  <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="flex items-center justify-center w-full">
                      <User className="h-4 w-4 mr-2" />
                      {t('login')}
                    </Button>
                  </Link>
                  <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-rental-600 hover:bg-rental-700 dark:bg-rental-500 dark:hover:bg-rental-600">{t('signup')}</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
