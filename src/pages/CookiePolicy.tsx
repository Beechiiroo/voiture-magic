
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "@/hooks/use-translation";
import { motion } from "framer-motion";

const CookiePolicy = () => {
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
            {t("cookiePolicy")}
          </h1>
          
          <Separator className="my-6" />
          
          {/* Introduction */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("cookieIntroTitle")}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-medium text-rental-700 dark:text-rental-300 mb-2">
                  {t("whatAreCookiesTitle")}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t("whatAreCookiesText")}
                </p>
              </div>
            </div>
          </section>
          
          {/* Types of Cookies */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("cookieTypesTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("cookieTypesText")}
            </p>
          </section>
          
          {/* Cookie Control */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("cookieControlTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("cookieControlText")}
            </p>
          </section>
          
          {/* Changes to Cookie Policy */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("cookieChangesTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("cookieChangesText")}
            </p>
          </section>
          
          {/* Contact */}
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-rental-800 dark:text-rental-200 mb-4">
              {t("cookieContactTitle")}
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              {t("cookieContactText")}
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

export default CookiePolicy;
