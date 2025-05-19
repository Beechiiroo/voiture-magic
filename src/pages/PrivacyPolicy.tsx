
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-rental-900 dark:text-rental-100 mb-6">
            {t("privacyPolicyTitle")}
          </h1>
          
          <Separator className="my-6" />
          
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("privacyIntroTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("privacyIntroText")}
            </p>
          </section>
          
          {/* Data Collection */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("dataCollectionTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("dataCollectionText")}
            </p>
          </section>
          
          {/* Data Use */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("dataUseTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("dataUseText")}
            </p>
          </section>
          
          {/* Data Sharing */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("dataSharingTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("dataSharingText")}
            </p>
          </section>
          
          {/* Data Protection */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("dataProtectionTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("dataProtectionText")}
            </p>
          </section>
          
          {/* Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("cookiesTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("cookiesText")}
            </p>
          </section>
          
          {/* Third Party Services */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("thirdPartyTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("thirdPartyText")}
            </p>
          </section>
          
          {/* User Rights */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("userRightsTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("userRightsText")}
            </p>
          </section>
          
          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("contactPrivacyTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("contactPrivacyText")}
            </p>
          </section>
          
          <Separator className="my-6" />
          
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {t("lastUpdated")}: 01/04/2024
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
