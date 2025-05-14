
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import FeaturedCars from "@/components/FeaturedCars";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

// Import framer-motion
import { motion, useAnimation } from "framer-motion";

const Index = () => {
  const controls = useAnimation();

  useEffect(() => {
    // Animation observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            target.classList.add("animated");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Apply observer to all animate-on-scroll elements
    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Fixed navbar */}
      <Navbar />
      
      {/* Main content with padding for navbar */}
      <main className="pt-16">
        <Hero />
        
        {/* Features section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.h2 
                className="text-3xl font-bold mb-4 text-rental-900 font-heading"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Pourquoi Nous <span className="text-rental-600">Choisir</span>
              </motion.h2>
              <motion.p 
                className="text-gray-600 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Nous sommes dédiés à offrir un service de location de voitures exceptionnel, avec des véhicules de qualité et un service client inégalé.
              </motion.p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="animate-on-scroll bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-rental-50 h-14 w-14 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-rental-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-rental-900">Réservation Rapide</h3>
                <p className="text-gray-600">
                  Réservez votre véhicule en quelques clics grâce à notre interface simple et intuitive. Confirmation instantanée garantie.
                </p>
              </div>
              
              <div className="animate-on-scroll bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-rental-50 h-14 w-14 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-rental-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-rental-900">Sécurité Garantie</h3>
                <p className="text-gray-600">
                  Tous nos véhicules sont régulièrement entretenus et vérifiés pour vous assurer un voyage en toute sécurité.
                </p>
              </div>
              
              <div className="animate-on-scroll bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
                <div className="bg-rental-50 h-14 w-14 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-7 h-7 text-rental-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-rental-900">Prix Transparents</h3>
                <p className="text-gray-600">
                  Pas de frais cachés, nos tarifs incluent tout ce dont vous avez besoin pour votre location en toute sérénité.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <FeaturedCars />
        <HowItWorks />
        <Testimonials />
      </main>
      
      <Footer />
      
      {/* Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Index;
