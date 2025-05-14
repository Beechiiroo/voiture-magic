
import { motion } from "framer-motion";

const steps = [
  {
    id: 1,
    title: "Choisissez votre voiture",
    description: "Parcourez notre vaste sélection de véhicules et choisissez celui qui correspond à vos besoins.",
    icon: "🚗",
  },
  {
    id: 2,
    title: "Réservez aux dates souhaitées",
    description: "Sélectionnez vos dates de réservation et vérifiez la disponibilité en temps réel.",
    icon: "📅",
  },
  {
    id: 3,
    title: "Payez en toute sécurité",
    description: "Utilisez notre système de paiement sécurisé pour confirmer votre réservation.",
    icon: "💳",
  },
  {
    id: 4,
    title: "Profitez de votre voyage",
    description: "Récupérez votre véhicule et partez à l'aventure en toute confiance.",
    icon: "🏞️",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl font-bold mb-4 text-rental-900 font-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Comment <span className="text-rental-600">Ça Marche</span>
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Notre processus de location est simple et transparent. Suivez ces étapes faciles pour louer votre prochaine voiture.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute top-24 left-0 right-0 h-1 bg-rental-100 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                className="bg-white p-6 rounded-xl text-center relative z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-rental-50 rounded-full flex items-center justify-center mb-6 text-3xl mx-auto shadow-inner border border-rental-100 animate-float">
                    {step.icon}
                  </div>
                </div>
                <div className="absolute -top-3 left-0 right-0 flex justify-center">
                  <span className="bg-rental-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                    {step.id}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 text-rental-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
