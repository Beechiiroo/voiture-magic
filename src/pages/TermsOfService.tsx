
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/use-translation";

export default function TermsOfService() {
  const { t } = useTranslation();
  
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-8"
        >
          <h1 className="text-3xl font-bold mb-6">{t("termsOfService")}</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4">
              {t("termsLastUpdated")} {t("date", { date: new Date() })}
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("termsIntroTitle")}</h2>
            <p>{t("termsIntroText")}</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("definitionsTitle")}</h2>
            <p>{t("definitionsText")}</p>
            <ul className="list-disc pl-5 my-4">
              <li><strong>{t("definitionService")}</strong>: {t("definitionServiceText")}</li>
              <li><strong>{t("definitionCompany")}</strong>: {t("definitionCompanyText")}</li>
              <li><strong>{t("definitionUser")}</strong>: {t("definitionUserText")}</li>
              <li><strong>{t("definitionVehicle")}</strong>: {t("definitionVehicleText")}</li>
              <li><strong>{t("definitionRental")}</strong>: {t("definitionRentalText")}</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("accountTitle")}</h2>
            <p>{t("accountText")}</p>
            <p>{t("accountResponsibility")}</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("rentalProcessTitle")}</h2>
            <p>{t("rentalProcessText")}</p>
            <h3 className="text-lg font-semibold mt-6 mb-2">{t("reservationsTitle")}</h3>
            <p>{t("reservationsText")}</p>
            <h3 className="text-lg font-semibold mt-6 mb-2">{t("paymentTitle")}</h3>
            <p>{t("paymentText")}</p>
            <h3 className="text-lg font-semibold mt-6 mb-2">{t("cancellationTitle")}</h3>
            <p>{t("cancellationText")}</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("vehicleUseTitle")}</h2>
            <p>{t("vehicleUseText")}</p>
            <h3 className="text-lg font-semibold mt-6 mb-2">{t("prohibitedUsesTitle")}</h3>
            <p>{t("prohibitedUsesText")}</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("liabilityTitle")}</h2>
            <p>{t("liabilityText")}</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("changesTitle")}</h2>
            <p>{t("changesText")}</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("contactTitle")}</h2>
            <p>{t("contactTermsText")}</p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
