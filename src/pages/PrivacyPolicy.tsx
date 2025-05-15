
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useTranslation } from "@/hooks/use-translation";

export default function PrivacyPolicy() {
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
          <h1 className="text-3xl font-bold mb-6">{t("privacyPolicy")}</h1>
          
          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4">
              {t("privacyPolicyLastUpdated")} {t("date", { date: new Date() })}
            </p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("privacyIntroTitle")}</h2>
            <p>{t("privacyIntroText")}</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("dataCollectionTitle")}</h2>
            <p>{t("dataCollectionText")}</p>
            
            <h3 className="text-lg font-semibold mt-6 mb-2">{t("personalDataTitle")}</h3>
            <p>{t("personalDataText")}</p>
            <ul className="list-disc pl-5 my-4">
              <li>{t("personalDataName")}</li>
              <li>{t("personalDataEmail")}</li>
              <li>{t("personalDataPhone")}</li>
              <li>{t("personalDataAddress")}</li>
              <li>{t("personalDataPayment")}</li>
            </ul>
            
            <h3 className="text-lg font-semibold mt-6 mb-2">{t("usageDataTitle")}</h3>
            <p>{t("usageDataText")}</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("dataUseTitle")}</h2>
            <p>{t("dataUseText")}</p>
            <ul className="list-disc pl-5 my-4">
              <li>{t("dataUseProvideService")}</li>
              <li>{t("dataUseImproveService")}</li>
              <li>{t("dataUseCommunicate")}</li>
              <li>{t("dataUseLegal")}</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("dataSharingTitle")}</h2>
            <p>{t("dataSharingText")}</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("dataSecurityTitle")}</h2>
            <p>{t("dataSecurityText")}</p>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("yourRightsTitle")}</h2>
            <p>{t("yourRightsText")}</p>
            <ul className="list-disc pl-5 my-4">
              <li>{t("rightsAccess")}</li>
              <li>{t("rightsRectification")}</li>
              <li>{t("rightsDeletion")}</li>
              <li>{t("rightsRestriction")}</li>
              <li>{t("rightsPortability")}</li>
              <li>{t("rightsObjection")}</li>
            </ul>
            
            <h2 className="text-xl font-bold mt-8 mb-4">{t("contactTitle")}</h2>
            <p>{t("contactText")}</p>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}
