
import { Phone, MapPin, Clock, Mail } from "lucide-react";
import { motion } from "framer-motion";

const ContactInfo = () => {
  return (
    <motion.div 
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Nos coordonnées</h3>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="bg-rental-50 dark:bg-rental-900 p-3 rounded-full mr-4">
            <Phone className="h-5 w-5 text-rental-600 dark:text-rental-400" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Téléphone</h4>
            <p className="text-base font-medium text-gray-800 dark:text-white">+216 99 494 512</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-rental-50 dark:bg-rental-900 p-3 rounded-full mr-4">
            <MapPin className="h-5 w-5 text-rental-600 dark:text-rental-400" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Adresse</h4>
            <p className="text-base font-medium text-gray-800 dark:text-white">Route Teniour km 40, Sfax, Tunisie</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-rental-50 dark:bg-rental-900 p-3 rounded-full mr-4">
            <Mail className="h-5 w-5 text-rental-600 dark:text-rental-400" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h4>
            <p className="text-base font-medium text-gray-800 dark:text-white">contact@carrental.tn</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="bg-rental-50 dark:bg-rental-900 p-3 rounded-full mr-4">
            <Clock className="h-5 w-5 text-rental-600 dark:text-rental-400" />
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Heures d'ouverture</h4>
            <p className="text-base font-medium text-gray-800 dark:text-white">Lun - Ven: 8h00 - 18h00</p>
            <p className="text-base font-medium text-gray-800 dark:text-white">Sam: 9h00 - 16h00</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Notre emplacement</h3>
        <div className="rounded-lg overflow-hidden h-[300px] relative">
          <iframe
            title="Location map"
            className="w-full h-full border-0"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d212580.47546656184!2d10.4142837!3d34.7393802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13002cda86b200a5%3A0x937f96d86c3d9c83!2sSfax!5e0!3m2!1sfr!2stn!4v1665838112121!5m2!1sfr!2stn"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactInfo;
