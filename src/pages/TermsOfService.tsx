
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";

const TermsOfService = () => {
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
            {t("termsTitle")}
          </h1>
          
          <Separator className="my-6" />
          
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("termsIntroTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("termsIntroText")}
            </p>
          </section>
          
          {/* User Accounts */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("accountTermsTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("accountTermsText")}
            </p>
          </section>
          
          {/* Bookings and Payments */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("bookingTermsTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("bookingTermsText")}
            </p>
          </section>
          
          {/* Cancellations and Refunds */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("cancellationTermsTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("cancellationTermsText")}
            </p>
          </section>
          
          {/* Limitation of Liability */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("liabilityTermsTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("liabilityTermsText")}
            </p>
          </section>
          
          {/* Intellectual Property */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("intellectualPropertyTermsTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("intellectualPropertyTermsText")}
            </p>
          </section>
          
          {/* Dispute Resolution */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("disputeTermsTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("disputeTermsText")}
            </p>
          </section>
          
          {/* Modifications to Terms */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("modificationTermsTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("modificationTermsText")}
            </p>
          </section>
          
          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("contactTermsTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("contactTermsText")}
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

export default TermsOfService;
